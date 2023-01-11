import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Accordion, Alert, Button, Col, Row, Table } from "react-bootstrap"
import NavbarInvestee from "../../Components/Navbar/NavbarInvestee"
import { UserContext } from "../../Context/UserContext"
import { apiURL } from "../../Helpers/API"
import formatter from "../../Helpers/Formatter"
import SidebarInvestee from "./Sidebar"

const Installment = () => {
    const [user,] = useContext(UserContext)
    const [projects, setProjects] = useState([])
    const [error, setError] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const project = await axios.get(`${apiURL}/investee/projects`, { headers: { Authorization: "Bearer " + user.token } }
            )
            const result = project.data.data
            setProjects(result)
        }
        fetchData()
    }, [user.token])

    const handleClick = (id, total) => {
        axios.post(`${apiURL}/payments`, { order_id: id, gross_amt: total }, { headers: { Authorization: "Bearer " + user.token } })
            .then((res) => {
                window.open(res.data.redirect_url, "_blank")
            })
            .catch((err) => {
                setError(err.response.data.error)
            })
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
                        {error !== undefined && (
                            <Alert key="danger" variant="danger">{error}</Alert>
                        )}
                        <h3><span className="font-weight-bold align-middle"> <i className="bi bi-cash-coin"></i></span> Tagihan Proyek</h3>
                        <div className="style-table">

                            <Table striped bordered hover>
                                <thead>
                                    <Row className="text-center">
                                        <Col>No</Col>
                                        <Col>Nama Proyek</Col>
                                        <Col>Duration</Col>
                                        <Col>Periode</Col>
                                        <Col>Margin</Col>
                                        <Col>Total Nilai Proyek</Col>
                                        <Col>Lihat Cicilan</Col>
                                    </Row>
                                </thead>
                                <tbody>
                                    <Row>
                                        <Accordion flush defaultActiveKey={"0"}>
                                            {projects.map((val, ind) => {
                                                return (
                                                    <>
                                                        <Accordion.Item eventKey={ind}>
                                                            <Row className="text-center d-flex align-items-center">
                                                                <Col className="p-0">{ind + 1}</Col>
                                                                <Col className="p-0">{val.name}</Col>
                                                                <Col className="text-center p-0 " >{val.duration} bulan</Col>
                                                                <Col className="text-center p-0">{val.periode} bulan</Col>
                                                                <Col className="text-center p-0 ">{val.margin} %</Col>
                                                                <Col className="text-center p-0">{formatter.format(val.quantity * val.price)} </Col>
                                                                <Col className="p-0">
                                                                    <Accordion.Header>
                                                                    </Accordion.Header>
                                                                </Col>
                                                            </Row>
                                                            <Accordion.Body className="border-color mx-4 mb-4 background-color">
                                                                <Table striped bordered hover className="text-white">
                                                                    <thead>
                                                                        <Row className="text-center">
                                                                            <Col>Project ID</Col>
                                                                            <Col>Amount</Col>
                                                                            <Col>Status</Col>
                                                                            <Col>Tindakan</Col>
                                                                        </Row>
                                                                    </thead>
                                                                    <tbody>
                                                                        {projects[ind].installment.map((value, index) => {
                                                                            return (
                                                                                <>
                                                                                    <Row className="text-center d-flex align-items-center">

                                                                                        <Col>Cicilan</Col>
                                                                                        <Col>{formatter.format(value.amount)}</Col>
                                                                                        <Col>{value.status}</Col>
                                                                                        <Col>
                                                                                            {value.status === "Not-Paid" && (
                                                                                                <Button onClick={() => { handleClick(value.id, value.amount) }} variant="warning">
                                                                                                    Bayar
                                                                                                </Button>
                                                                                            )}
                                                                                        </Col>
                                                                                    </Row>
                                                                                </>
                                                                            )
                                                                        })}
                                                                    </tbody>
                                                                </Table>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </>
                                                )
                                            })}
                                        </Accordion>
                                    </Row>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </div>
            </div>
        </>
    )
}

export default Installment