import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ErrorBank = (props) => {
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
                Ooops, Silahkan masukkan data rekening terlebih dahulu.
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { navigate(props.navi) }} variant="success"> Tautkan Rekening </Button>
                <Button onClick={props.onHide} variant="danger">Batalkan</Button>
            </Modal.Footer>
        </Modal>
    );

}

export default ErrorBank