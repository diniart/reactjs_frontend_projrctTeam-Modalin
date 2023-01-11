import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Alert, Button, Col, Modal, Row, Table } from "react-bootstrap";
import { UserContext } from "../../Context/UserContext";
import { apiURL } from "../../Helpers/API";
import formatter from "../../Helpers/Formatter";

const InstallmentData = (props) => {
    const [user] = useContext(UserContext)
    const [error, setError] = useState()
    let id = props.projectID

    let newInstallment = props.installment.filter((val) => {
        if (val.status !== 'done') {
            return val
        }
    })

    console.log(props.projectStatus)

    const handleDisbursement = (installment) => {
        props.investor.map((val) => {
            if (installment.type === "Main") {
                let newprofit = installment.amount * (val.Quantity / val.TotalQuantity)
                let profit = Math.round(newprofit)
                // create transaction debit from admin with status "TransferInvestor"
                axios.post(`${apiURL}/transaction`, { debit: profit, credit: 0, Sender: "502aae43-40f4-4367-a973-1e47a5d18957", status: "TransferInvestor", project_id: installment.projects_id }, { headers: { Authorization: "Bearer " + user.token } })
                    .then(() => {
                        // create transaction data pencairan dana ke investor
                        axios.post(`${apiURL}/transaction`, { debit: 0, credit: profit, Sender: val.UserID, status: "TransferInvestor", project_id: installment.projects_id }, { headers: { Authorization: "Bearer " + user.token } })
                            .then(() => {
                                // change installment status to "Done"
                                axios.patch(`${apiURL}/installment/status/${installment.id}`, { status: "done" }, { headers: { Authorization: "Bearer " + user.token } }
                                )
                                    .then(() => {
                                        props.onHide()
                                    })
                                    .catch((err) => {
                                        setError(err.response.data.error)
                                        alert(Error)
                                    })

                            })
                            .catch((err) => {
                                setError(err.response.data.error)
                                alert(Error)
                            })

                    })
                    .catch((err) => {
                        setError(err.response.data.error)
                        alert(Error)
                    })
            } else if (installment.type === "Profit") {
                // conditional if installment type is profit minus 5% for company
                let newprofit = (val.Margin / (val.Margin + 5)) * installment.amount * (val.Quantity / val.TotalQuantity)
                let profit = Math.round(newprofit)

                // create transaction debit from admin with status "TransferInvestor"
                axios.post(`${apiURL}/transaction`, { debit: profit, credit: 0, Sender: "502aae43-40f4-4367-a973-1e47a5d18957", status: "TransferInvestor", project_id: installment.projects_id }, { headers: { Authorization: "Bearer " + user.token } })
                    .then(() => {
                        // create transaction data pencairan dana ke investor
                        axios.post(`${apiURL}/transaction`, { debit: 0, credit: profit, Sender: val.UserID, status: "TransferInvestor", project_id: installment.projects_id }, { headers: { Authorization: "Bearer " + user.token } })
                            .then(() => {
                                // change installment status to "Done"
                                axios.patch(`${apiURL}/installment/status/${installment.id}`, { status: "done" }, { headers: { Authorization: "Bearer " + user.token } }
                                )
                                    .then(() => {
                                        props.onHide()
                                    })
                                    .catch((err) => {
                                        setError(err.response.data.error)
                                        alert(Error)
                                    })

                            })
                            .catch((err) => {
                                setError(err.response.data.error)
                                alert(Error)
                            })

                    })
                    .catch((err) => {
                        setError(err.response.data.error)
                        alert(Error)
                    })
            }
            // create transaction credit to investor id
        })
    }
    const handleDone = () => {
        // change status project jadi done
        // update status project
        axios.patch(`${apiURL}/projects/status/${id}`, { status: "done" }, { headers: { Authorization: "Bearer " + user.token } }
        )
            .then(() => {
                props.trigger()
            })
            .catch((err) => {
                setError(err.response.data.error)
                alert(Error)
            })
    }

    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Data Cicilan Investee</Modal.Title>
                {error !== undefined && (
                    <Alert key="danger" variant="danger">
                        {error}
                    </Alert>
                )}
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover className="">
                    <thead>
                        <Row className="text-center">
                            <Col>Type</Col>
                            <Col>Amount</Col>
                            <Col>Status</Col>
                            <Col>Tindakan</Col>
                        </Row>
                    </thead>
                    <tbody>
                        {props.installment.map((val) => {

                            return (
                                <Row className="text-center d-flex align-items-center">

                                    <Col>{val.type}</Col>
                                    <Col>{formatter.format(val.amount)}</Col>
                                    <Col>{val.status}</Col>
                                    <Col>
                                        {val.status === "Paid" && (
                                            <Button onClick={() => { handleDisbursement(val) }} variant="warning">
                                                Bagi Ke Investor
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                            )
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                {(newInstallment.length === 0 && props.projectStatus === "running") && (
                    <Button onClick={() => { handleDone() }} variant="success">
                        Done
                    </Button>

                )}
                <Button onClick={props.onHide} variant="danger">
                    Kembali
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InstallmentData;
