import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Alert, Button, FormControl, FormGroup, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { apiURL } from "../../Helpers/API";
import formatter from "../../Helpers/Formatter";

const Disbursement = (props) => {
    const [user] = useContext(UserContext)
    const [error, setError] = useState()
    const [input, setInput] = useState()
    let navigate = useNavigate({})

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post(`${apiURL}/transaction`, { debit: input.amount, credit: 0, Sender: user.id, status: "ProsesPencairan" }, { headers: { Authorization: "Bearer " + user.token } }
        )
            .then((res) => {
                props.trigger()
                setInput()
                props.onHide()
            })
            .catch((err) => {
                setError(err.response.data.error)
            })
    }

    const handleChange = (event) => {
        let value = parseInt(event.target.value)
        let name = event.target.name
        setInput({ [name]: value })
    }
    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Pengajuan Pencairan Dana</Modal.Title>
                {error !== undefined && (
                    <Alert key="danger" variant="danger">
                        {error}
                    </Alert>
                )}
            </Modal.Header>
            <Modal.Body>
                <Table striped border hover>
                    <thead>
                        <tr>
                            <th className="align-middle" style={{ width: '50%' }}>Nominal Pencairan</th>
                            <td>
                                <FormGroup style={{ width: '100%' }}>
                                    <FormControl name="amount" onChange={handleChange} type="int" />
                                </FormGroup>
                            </td>
                        </tr>
                        <tr>
                            <th>Nama Bank</th>
                            <td>{props.bank.bank_name}</td>
                        </tr>

                        <tr>
                            <th>Nomor Rekening</th>
                            <td>{props.bank.bank_account_number}</td>
                        </tr>
                    </thead>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit} variant="success">
                    Ajukan
                </Button>
                <Button onClick={() => { navigate(props.navi) }} variant="warning">
                    Ganti Rekening
                </Button>
                <Button onClick={props.onHide} variant="danger">
                    Batal
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Disbursement;
