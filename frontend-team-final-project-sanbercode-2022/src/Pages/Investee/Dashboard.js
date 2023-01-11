import NavbarInvestee from "../../Components/Navbar/NavbarInvestee"
import SidebarInvestee from "./Sidebar"
import { Button, Col, Image } from "react-bootstrap"
import { apiURL } from "../../Helpers/API"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import formatter from "../../Helpers/Formatter"
import banner from "../../Images/banner1.png"
import Disbursement from "../../Components/Modal/Disbursement"
import ErrorBank from "../../Components/Modal/errorFillBankAccount"
import { useNavigate } from "react-router-dom"

const DashboardInvestee = () => {
    const [user,] = useContext(UserContext)
    const [arr, setArr] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [errModalShow, setErrModalShow] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(true)

    const [bank, setBank] = useState({})
    const [countProjects, setCountProjects] = useState([])

    let navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            // get transaction history
            const transaction = await axios.get(`${apiURL}/transaction`, { headers: { Authorization: "Bearer " + user.token } })
            let filteredTransaction = transaction.data.data.filter((val) => {
                if (val.status !== "Failure") {
                    return val
                }
            })
            setArr(filteredTransaction)

            // get user profile
            const profiles = await axios.get(`${apiURL}/userProfile`, { headers: { Authorization: "Bearer " + user.token } }
            )
            const result = profiles.data.data
            setBank({ bank_name: result.bank_name, bank_account_number: result.bank_account_number })

            // get project count
            const jumlah = await axios.get(`${apiURL}/projects/count`, { headers: { Authorization: "Bearer " + user.token } })
            if (jumlah.data.data !== null) {
                setCountProjects(jumlah.data.data)
            }

        }
        if (fetchTrigger) {
            fetchData()
            setFetchTrigger(false)
        }
    }, [user.token, fetchTrigger])

    let credits = 0
    let debits = 0

    for (let i = 0; i <= arr.length - 1; i++) {
        credits += arr[i].credit
        debits += arr[i].debit
    }

    const handleClick = async () => {
        // hit api to get bank information
        if (bank.bank_name === '' || bank.bank_account_number === null) {
            setErrModalShow(true)
        } else {
            setModalShow(true)
        }
    }

    let done = 0
    let running = 0
    let posted = 0
    let pending = 0
    if (countProjects.length !== 0) {
        for (let j = 0; j <= countProjects.length - 1; j++) {
            let status = countProjects[j].Status
            let count = countProjects[j].Count
            if (status === 'done') {
                done = count
            } else if (status === 'running') {
                running = count
            } else if (status === 'posted') {
                posted = count
            } else if (status === 'pending') {
                pending = count
            }
        }
    }

    return (
        <>
            <div>
                <NavbarInvestee />
                <div className="dashboard-investee d-flex">
                    <Col md={3} className=" d-none d-md-block">
                        <SidebarInvestee />
                    </Col>
                    <Col className="container p-5">
                        {/* edit isi main dashboard disini */}
                        <h3><i className="bi bi-wallet2"></i> Informasi Saldo</h3>
                        <br />
                        <div className="border-color p-5 flex-evenly">

                            <div className="border-color border-light shadow p-4 text-center">
                                <h5>Saldo  </h5>
                                <h5>{formatter.format(credits - debits)}</h5>
                            </div>
                            <div className="border-color border-light shadow p-4 text-center">
                                <h5>Pemasukan</h5>
                                <h5>{formatter.format(credits)} </h5>
                            </div>
                            <div className="border-color border-light shadow p-4 text-center">
                                <h5>Pengeluaran</h5>
                                <h5>{formatter.format(debits)}</h5>
                            </div>
                            <Button onClick={handleClick} variant="success">Ajukan Pencairan Dana</Button>

                        </div>
                        <br />
                        <h3><i className="bi bi-shop"></i> Informasi Proyek :</h3>
                        <br />

                        <div className="border-color flex-evenly p-5">
                            <div className="border-color border-light shadow p-4 text-center">
                                <h1><i className="bi bi-briefcase-fill text-color"></i></h1>
                                <h5>Jumlah Proyek :  </h5>
                                <h5>{done + running + pending + posted} Proyek</h5>
                            </div>
                            <div className="border-color border-light shadow p-4 text-center">
                                <h1><i className="bi bi-hourglass-split text-color"></i></h1>
                                <h5>Dalam Persetujuan :  </h5>
                                <h5>{pending} Proyek</h5>
                            </div>
                            <div className="border-color border-light shadow p-4 text-center">
                                <h1><i className="bi bi-play-circle text-color"></i></h1>
                                <h5>Sedang Berjalan :  </h5>
                                <h5>{running} Proyek</h5>
                            </div>
                            <div className="border-color border-light shadow p-4 text-center">
                                <h1><i className="bi bi-check-circle-fill text-color"></i></h1>
                                <h5>Sudah Selesai : </h5>
                                <h5>{done} Proyek</h5>
                            </div>
                        </div>

                        <h3 className="my-4"><i className="bi bi-shop"></i> Pusat Bantuan :</h3>

                        <div className="border-color flex-evenly p-5">
                            <div className="hovereffect">

                                <div className="border-color border-light shadow p-4 text-center" onClick={() => { navigate("/help") }} >
                                    <h5>Hubungi Pusat Bantuan</h5>
                                </div>
                            </div>

                        </div>

                        <div className="container shadow my-4" style={{ overflow: 'hidden', objectFit: 'contain' }} >
                            <Image src={banner} style={{ width: '100%', objectFit: 'contain' }} />
                        </div>
                    </Col>
                </div>
            </div>

            <ErrorBank show={errModalShow} navi="/investee/dashboard/profile/form" onHide={() => setErrModalShow(false)} />

            <Disbursement show={modalShow} navi="/investee/dashboard/profile/form" onHide={() => setModalShow(false)} bank={bank} trigger={() => setFetchTrigger(true)} />

        </>
    )
}

export default DashboardInvestee