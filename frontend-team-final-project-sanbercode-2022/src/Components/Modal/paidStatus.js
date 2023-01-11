import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import formatter from "../../Helpers/Formatter"


const PaidStatus = (props) => {

	return (
		<Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Status Pembayaran</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Table striped bordered hover className="">
					<thead>
						<Row className="text-center">
							<Col>Project ID</Col>
							<Col>Type</Col>
							<Col>Amount</Col>
							<Col>Status</Col>
						</Row>
					</thead>
					<tbody>
						{props.installment.map((val) => {
							let project = props.singleProject

							var profit = 0
							if (val.type === "Main") {
								profit = val.amount * (project.Sold / project.Quantity)
							} else if (val.type === "Profit") {
								// conditional if installment type is profit minus 5 % for company
								profit = (project.Margin / (project.Margin + 5)) * val.amount * (project.Sold / project.Quantity)
							}

							return (
								<Row className="text-center d-flex align-items-center">
									<Col>Cicilan </Col>
									<Col>{val.type}</Col>
									<Col>{formatter.format(profit)}</Col>
									<Col>{val.status}</Col>
								</Row>
							);
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
}

export default PaidStatus