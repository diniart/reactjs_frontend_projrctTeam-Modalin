import { Button, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Unauthorized = (props) => {
    let navigate = useNavigate()
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Oops... {props.header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Silahkan login sebagai investor untuk mendanai proyek ini
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { navigate("/login") }} variant="success"> Log In </Button>
                <Button onClick={props.onHide} variant="danger">Batalkan</Button>
            </Modal.Footer>
        </Modal>
    );

}

export default Unauthorized