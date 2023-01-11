import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Row, Col, Button, Accordion, ListGroup, Container, Table, Card, Image } from "react-bootstrap";
import FilterOrder from "../../Components/Filter/FilterOrder";
import NavbarDash from "../../Components/Navbar/NavbarDash";
import { UserContext } from "../../Context/UserContext";
import { apiURL } from "../../Helpers/API";
import DateFormat from "../../Helpers/DateFormat";
import formatter from "../../Helpers/Formatter";
import SidebarInvestor from "./SidebarInvestor";
import noData from "../../Images/no_data.svg";

export const ActivityDash = () => {
	const [user] = useContext(UserContext);
	const [order, setOrder] = useState([]);
	const [error, setError] = useState();
	const [fetchTrigger,setFetchTrigger] = useState(true) 

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`${apiURL}/cart`, { headers: { Authorization: "Bearer " + user.token } });
			const cart = result.data.data;
			setOrder(cart);
		};
		fetchData();
		setFetchTrigger(false)
	}, [fetchTrigger]);

	const filterOrder = (array, status) => {
		if (array !== undefined) {
			let proses = array.filter((arr) => {
				if (status.indexOf(arr.payment_status, 0) !== -1) {
					return true;
				}
			});
			return SortDate(proses);
		}
	};
	const handleDelete =(id)=>{
		axios.patch(`${apiURL}/cart/${id}`,{payment_status:"delete"}, { headers: { Authorization: "Bearer " + user.token } })
		setFetchTrigger(true)
	}

	const buttonStatus = (status) => {
		switch (status) {
			case "order":
				return (
					<Button style={{ width: "6em" }} disabled variant="secondary">
						{status}
					</Button>
				);
				break;
			case "pending":
				return (
					<Button style={{ width: "6em" }} disabled variant="danger">
						{status}
					</Button>
				);
				break;
			case "success":
				return (
					<Button style={{ width: "6em" }} disabled variant="success">
						{status}
					</Button>
				);
				break;
			case "delete":
				return (
					<Button style={{ width: "6em" }} disabled variant="danger">
						failure
					</Button>
				);
				break;

			default:
				break;
		}
	};

	const SortDate =(array)=>{
		let sorted = array.sort((a,b)=>{
			return new Date(b.created_at) - new Date(a.created_at) ;
		})
		return sorted
	}

	const handleClick = (id, total) => {
		axios
			.post(`${apiURL}/payments`, { order_id: id, gross_amt: total }, { headers: { Authorization: "Bearer " + user.token } })
			.then((res) => {
				// window.location.href = res.data.redirect_url
				window.open(res.data.redirect_url, "_blank");
			})
			.catch((err) => {
				setError(err.response.data.error);
			});
	};

	console.log("order", order)

	return (
		<>
			<NavbarDash />
			<Container fluid>
				<Row>
					{/* Sidbar kiri*/}
					<Col md={3} sm={0} className="shadow  ">
						<SidebarInvestor />
					</Col>

					<Col md={8} className="shadow ms-auto me-3" style={{ minHeight: "100vh" }}>
						<Container fluid>
							<br />
							<h2 className="fw-bold mt-4">
								{" "}
								<i class="bi bi-arrow-left-right  me-3"></i>AKTIVITAS
							</h2>
							<Row>
								<Container fluid>
									<Row className="py-2 background-color text-white">
										<h5>Order belum dibayar</h5>
									</Row>
									<Table border responsive="sm">
										<thead>
											<tr className="text-center my-3">
												<td>Date</td>
												<td>ID</td>
												<td>Payment Status</td>
											</tr>
										</thead>
										<tbody>
											{order && filterOrder(order, ["pending"]).length === 0 && (
												<tr>
													<td colSpan={3}>
														<Container fluid>
															<Row className="mt-2" style={{ height: "9rem", overflow: "hidden", objectFit: "contain" }}>
																<Image src={noData} style={{ height: "100%" }} />
															</Row>
															<Row className="text-center my-2">
																<span className="fw-bold fs-6">Tidak ada data</span>
															</Row>
														</Container>
													</td>
												</tr>
											)}
											{filterOrder(order, ["pending"]).map((value, i) => {
												let totals = 0;

												// console.log("total", totals);
												return (
													<>
														<tr>
															<td>{DateFormat(value.created_at)}</td>
															<td>{value.id}</td>
															<td className="text-center">{buttonStatus(value.payment_status)}</td>
														</tr>
														<tr>
															<td colSpan={3}>
																<Accordion flush defaultActiveKey={"0"} style={{ width: "auto" }}>
																	<Accordion.Item eventKey={i}>
																		<Accordion.Header></Accordion.Header>
																		<Accordion.Body>
																			<ListGroup variant="flush">
																				{value.CartItems.map((array, i) => {
																					let tambah = array.projects.price * array.quantity;
																					totals += tambah;
																					return (
																						<ListGroup.Item>
																							<Row className="justify-content-around">
																								<Col>{array.projects.name}</Col>
																								<Col className="text-end">{formatter.format(array.projects.price)}</Col>
																								<Col>{`Qty: ${array.quantity}`}</Col>
																								<Col>
																									<span className="text-start">Total:</span> <span className="text-end"> {formatter.format(array.projects.price * array.quantity)}</span>
																								</Col>
																							</Row>
																						</ListGroup.Item>
																					);
																				})}
																				<ListGroup.Item>
																					<Row className="d-flex ">
																						<Col className="ms-auto">
																							<span className="text-start">Total:</span> <span className="text-end"> {formatter.format(totals)}</span>
																						</Col>
																						<Col className="text-end">
																							<Button
																								onClick={() => {
																									handleClick(value.id, totals);
																								}}
																								className="ms-3 my-1"
																							>
																								Bayar
																							</Button>
																							<Button  className="ms-3" variant="danger" onClick={()=>{handleDelete(value.id)}}>Batalkan</Button>
																						</Col>
																					</Row>
																				</ListGroup.Item>
																			</ListGroup>
																		</Accordion.Body>
																	</Accordion.Item>
																</Accordion>
															</td>
														</tr>
													</>
												);
											})}
										</tbody>
									</Table>
								</Container>
							</Row>
							<Row>
								<Container fluid>
									<Row className="py-2 background-color text-white">
										<h5>History order</h5>
									</Row>
									<Table responsive>
										<thead>
											<tr className="text-center my-3">
												<td>Date</td>
												<td>ID</td>
												<td>Payment Status</td>
											</tr>
										</thead>
										<tbody>
											{order && filterOrder(order, ["success","delete"]).length === 0 && (
												<tr>
													<td colSpan={3}>
														<Container fluid>
															<Row className="mt-2" style={{ height: "9rem", overflow: "hidden", objectFit: "contain" }}>
																<Image src={noData} style={{ height: "100%" }} />
															</Row>
															<Row className="text-center my-2">
																<span className="fw-bold fs-6">Tidak ada data</span>
															</Row>
														</Container>
													</td>
												</tr>
											)}
											{filterOrder(order, ["success","delete"]).map((value, i) => {
												let totals = 0;

												// console.log("total", totals);
												return (
													<>
														<tr>
															<td>{DateFormat(value.created_at)}</td>
															<td>{value.id}</td>

															<td className="text-center">
																{buttonStatus(value.payment_status)}
																{/* <Button variant="outline-danger">{value.payment_status}</Button> */}
															</td>
														</tr>
														<tr>
															<td colSpan={3}>
																<Accordion flush defaultActiveKey={"0"}>
																	<Accordion.Item eventKey={i}>
																		<Accordion.Header></Accordion.Header>
																		<Accordion.Body>
																			<ListGroup variant="flush">
																				{value.CartItems.map((array, i) => {
																					let tambah = array.projects.price * array.quantity;
																					totals += tambah;
																					return (
																						<ListGroup.Item>
																							<Row className="justify-content-around">
																								<Col>{array.projects.name}</Col>
																								<Col className="text-end">{formatter.format(array.projects.price)}</Col>
																								<Col>{`Qty: ${array.quantity}`}</Col>
																								<Col>
																									<span className="text-start">Total:</span> <span className="text-end"> {formatter.format(array.projects.price * array.quantity)}</span>
																								</Col>
																							</Row>
																						</ListGroup.Item>
																					);
																				})}
																				<ListGroup.Item>
																					<Row>
																						<Col className="ms-auto">
																							<span className="text-start">Total:</span> <span className="text-end"> {formatter.format(totals)}</span>
																						</Col>
																					</Row>
																				</ListGroup.Item>
																			</ListGroup>
																		</Accordion.Body>
																	</Accordion.Item>
																</Accordion>
															</td>
														</tr>
													</>
												);
											})}
										</tbody>
									</Table>
								</Container>
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
};
