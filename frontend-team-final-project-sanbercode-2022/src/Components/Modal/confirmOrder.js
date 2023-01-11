import axios from "axios";
import { useContext, useState } from "react";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { apiURL } from "../../Helpers/API";
import formatter from "../../Helpers/Formatter";

const ConfirmOrder = (props) => {
	const [user] = useContext(UserContext);
	const [error, setError] = useState();

	let navigate = useNavigate();

	const input = { quantity: props.quantity, projectID: props.project_id, shoppingCartID: props.cart_id };

	const total = props.quantity * props.price;

	const handleConfirm = () => {
		// post ke cart items
		axios
			.post(`${apiURL}/cartItems`, input, { headers: { Authorization: "Bearer " + user.token } })
			.then((res) => {
				navigate("/investor/checkout");
			})
			.catch((err) => {
				setError(err.response.data.error);
			});
	};

	return (
		<Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Konfirmasi Pemesanan</Modal.Title>
				{error !== undefined && (
					<Alert key="danger" variant="danger">
						{error}
					</Alert>
				)}
			</Modal.Header>
			<Modal.Body>
				<Table>
					<thead>
						<tr>
							<th>Jumlah Saham</th>
							<td>{props.quantity} lembar</td>
						</tr>
						<tr>
							<th>Harga per Unit </th>
							<td>{formatter.format(props.price)}</td>
						</tr>

						<tr>
							<th>Total Pembayaran</th>
							<td>{formatter.format(total)}</td>
						</tr>
					</thead>
				</Table>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleConfirm} variant="success">
					Konfirmasi
				</Button>
				<Button onClick={props.onHide} variant="danger">
					Batalkan
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirmOrder;
