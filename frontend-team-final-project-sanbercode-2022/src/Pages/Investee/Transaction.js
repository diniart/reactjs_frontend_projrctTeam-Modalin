import NavbarInvestee from "../../Components/Navbar/NavbarInvestee"
import SidebarInvestee from "./Sidebar"
import { Button, Col, Table } from "react-bootstrap"
import { apiURL } from "../../Helpers/API"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import formatter from "../../Helpers/Formatter"
import Disbursement from "../../Components/Modal/Disbursement"

const TransactionInvestee = () => {
    const [user,] = useContext(UserContext)
    const [allTransaction, setAllTransaction] = useState([])
    const [arr, setArr] = useState([])
    const [fetchTrigger, setFetchTrigger] = useState(true)
    // modal disbursement
    const [modalShow, setModalShow] = useState(false);
    const [errModalShow, setErrModalShow] = useState(false);
    const [bank, setBank] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const transaction = await axios.get(`${apiURL}/transaction`, { headers: { Authorization: "Bearer " + user.token } })
            setAllTransaction(transaction.data.data)
            let filteredTransaction = transaction.data.data.filter((val) => {
                if (val.status !== "Failure") {
                    return val
                }
            })
            setArr(filteredTransaction)
            const profiles = await axios.get(`${apiURL}/userProfile`, { headers: { Authorization: "Bearer " + user.token } }
            )
            const result = profiles.data.data
            setBank({ bank_name: result.bank_name, bank_account_number: result.bank_account_number })
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

    return (
        <>
            <div>
                <NavbarInvestee />
                <div className="dashboard-investee d-flex">
                    <Col md={3} className=" d-none d-md-block">
                        <SidebarInvestee />
                    </Col>
                    <Col className="p-5">
                        {/* edit isi main dashboard disini */}
                        <h3><i className="bi bi-wallet2"></i> Informasi Saldo</h3>
                        <br />
                        <div className="p-3 flex-evenly">

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
                        <h3><i className="bi bi-cash-coin"></i> Riwayat Transaksi :</h3>
                        <br />

                        <div className="style-table">
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Debit</th>
                                        <th>Credit</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allTransaction.map((val, ind) => {
                                        return (
                                            <tr>
                                                <td>{ind + 1}</td>
                                                <td>{formatter.format(val.debit)}</td>
                                                <td>{formatter.format(val.credit)}</td>
                                                <td>{val.status}</td>
                                                <td>{new Date(val.updated_at).toLocaleDateString()}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </div>
            </div>
            <Disbursement show={modalShow} onHide={() => setModalShow(false)} bank={bank} trigger={() => setFetchTrigger(true)} />

        </>
    )
}

export default TransactionInvestee