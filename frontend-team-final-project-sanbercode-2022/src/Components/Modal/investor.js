import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import formatter from "../../Helpers/Formatter";

const InvestorData = (props) => {

    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Data Investor Tergabung</Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover className="">
                    <thead>
                        <Row className="text-center">
                            <Col>No</Col>
                            <Col>Email</Col>
                            <Col>Jumlah Saham</Col>
                            <Col>Harga Saham</Col>
                            <Col>Total Nilai Saham</Col>
                        </Row>
                    </thead>
                    <tbody>
                        {props.investor.map((val, ind) => {
                            return (
                                <Row className="text-center d-flex align-items-center">

                                    <Col>{ind + 1}</Col>
                                    <Col>{(val.Email)}</Col>
                                    <Col>{val.Quantity}</Col>
                                    <Col>{formatter.format(val.Price)}</Col>
                                    <Col>{formatter.format(val.Quantity * val.Price)}</Col>

                                </Row>
                            )
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="danger">
                    Kembali
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InvestorData;
