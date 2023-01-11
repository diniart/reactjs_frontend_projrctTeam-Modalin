import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import { UserContext } from "../../Context/UserContext";
import { apiURL } from "../../Helpers/API";
import formatter from "../../Helpers/Formatter";

const DisbursementAdmin = (props) => {
    const [user] = useContext(UserContext)
    const [error, setError] = useState()

    const detail = props.data
    let email = ''
    let role = ''
    let bank = ''
    let account = 0
    if (detail.length !== 0) {
        email = detail.user.email
        role = detail.user.role
        bank = detail.user.UserProfile.bank_name
        account = detail.user.UserProfile.bank_account_number
    }

    let id = props.data.id
    const handleProses = () => {
        axios.patch(`${apiURL}/transaction/${id}`, { status: "PencairanBerhasil" }, { headers: { Authorization: "Bearer " + user.token } })
            .then((res) => {
                props.onHide()
            })
            .catch((err) => {
                setError(err.response.data.error);
            });
    }

    const handleDeny = () => {
        axios.patch(`${apiURL}/transaction/${id}`, { status: "PencairanGagal" }, { headers: { Authorization: "Bearer " + user.token } })
            .then((res) => {
                props.onHide()
            })
            .catch((err) => {
                setError(err.response.data.error);
            });
    }

    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Proses Pencairan Dana</Modal.Title>
                {error !== undefined && (
                    <Alert key="danger" variant="danger">
                        {error}
                    </Alert>
                )}
            </Modal.Header>
            <Modal.Body>
                <p>Lakukan transfer sesuai informasi berikut ini : </p>
                <Table striped border hover>
                    <thead>
                        <tr>
                            <th>Email User</th>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <th>Role User</th>
                            <td>{role}</td>
                        </tr>
                        <tr>
                            <th>Nominal Transfer</th>
                            <td>{formatter.format(detail.debit)}</td>
                        </tr>
                        <tr>
                            <th>Nama Bank</th>
                            <td>{bank}</td>
                        </tr>

                        <tr>
                            <th>Nomor Rekening</th>
                            <td>{account}</td>
                        </tr>
                    </thead>
                </Table>
                <p className="text-color">Notes : Klik selesai jika transfer sudah berhasil </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleProses} variant="success">
                    Selesai
                </Button>

                <Button onClick={handleDeny} variant="danger">
                    Tolak
                </Button>

                <Button onClick={props.onHide} variant="warning">
                    Kembali
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DisbursementAdmin;
