import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Row, Col, Container, ProgressBar, Card, Button, Image } from "react-bootstrap";
import FilterOrder from "../../Components/Filter/FilterOrder";
import PaidStatus from "../../Components/Modal/paidStatus";
import NavbarDash from "../../Components/Navbar/NavbarDash";
import { UserContext } from "../../Context/UserContext";
import { apiURL } from "../../Helpers/API";
import DateFormat from "../../Helpers/DateFormat";
import formatter from "../../Helpers/Formatter";
import SidebarInvestor from "./SidebarInvestor";
import noData from "../../Images/no_data.svg";
import FilterTransc from "../../Components/Filter/FilterTransc";
import Disbursement from "../../Components/Modal/Disbursement";
import ErrorBank from "../../Components/Modal/errorFillBankAccount";

export const PortofolioDash = () => {
	const [user] = useContext(UserContext);
	const [asset, setAsset] = useState([]);
	const [transaction, setTransaction] = useState([]);
	const [show, setShow] = useState(false);
	const [installments, setInstallments] = useState([]);
	const [singleProject, setSingleProject] = useState();
	const [bank, setBank] = useState({});
	const [modalShow, setModalShow] = useState(false);
	const [errModalShow, setErrModalShow] = useState(false);
	const [fetchTrigger, setFetchTrigger] = useState(true);

	let totalPokok = 0;
	let totalPokokRec = 0;
	let totalPokokDone = 0;
	let totalPokokProses = 0;
	let totalDanaAktif = 0;
	let totalPencairan = 0;
	let totalPencairanGagal = 0;

	useEffect(() => {
		const fetchData = async () => {
			const resp = await axios.get(`${apiURL}/projects/buy`, { headers: { Authorization: "Bearer " + user.token } });
			setAsset(resp.data.data);
			const transaction = await axios.get(`${apiURL}/transaction`, { headers: { Authorization: "Bearer " + user.token } });
			setTransaction(transaction.data.data);
			const profiles = await axios.get(`${apiURL}/userProfile`, { headers: { Authorization: "Bearer " + user.token } });
			const result = profiles.data.data;
			setBank({ bank_name: result.bank_name, bank_account_number: result.bank_account_number });
		};
		fetchData();
	}, [user.token, fetchTrigger]);

	if (asset) {
		asset.map((val, i) => {
			totalPokok += val.Sold * val.Price;
			return "";
		});
	}
	if (asset) {
		asset.map((val, i) => {
			if (val.Status === "running") {
				totalDanaAktif += val.Sold * val.Price;
			} else if (val.Status === "done") {
				totalPokokDone += val.Sold * val.Price;
			} else if (val.Status === "posted") {
				totalPokokProses += val.Sold * val.Price;
			}
			return "";
		});
	}

	if (transaction) {
		transaction.map((val, i) => {
			if (val.status === "TransferInvestor"){
				totalPokokRec += val.credit;
			}else
			if (val.status === "ProsesPencairan"){
				totalPencairan += val.debit;
			}else
			if (val.status === "PencairanGagal"){
				totalPencairanGagal += val.debit;
			}
			return ""
			
		});
	}

	let sisaPokok = totalPokok - totalPokokDone;

	const handleClick = async () => {
		// hit api to get bank information
		if (bank.bank_name === "" || bank.bank_account_number === null) {
			setErrModalShow(true);
		} else {
			setModalShow(true);
		}
	};

	function ProgressDana(percent) {
		return <ProgressBar variant="success" now={percent} label={`${percent}%`} />;
	}

	// mencari total saldo tersedia
	let credits = 0;
	let debits = 0;

	for (let i = 0; i <= transaction.length - 1; i++) {
		credits += transaction[i].credit;
		debits += transaction[i].debit;
	}

	let persentase = Math.round(100 - (totalPokokProses / totalPokok) * 100);
	let bagiHasil = totalPokokRec - totalPokokDone;
	let totalAsset = totalPokok - totalPokokDone + credits - debits + totalPencairanGagal;

	console.log("asset", asset);
	console.log("transaction", transaction);

	const handlePembayaran = async (val) => {
		const installment = await axios.get(`${apiURL}/installment/${val.ProjectID}`, { headers: { Authorization: "Bearer " + user.token } });
		setInstallments(installment.data.data);
		setSingleProject(val);
		setShow(true);
	};

	return (
		<>
			<NavbarDash />
			<Container fluid>
				<Row>
					{/* Sidbar kiri*/}
					<Col md={3} className="shadow " style={{ top: "2rem" }}>
						<SidebarInvestor />
					</Col>

					<Col md={8} className=" ms-auto me-3" style={{ minHeight: "100vh" }}>
						<Row>
							<Container fluid className="shadow rounded border my-3">
								<h3 className="mt-3">Total Aset Saya</h3>
								<h1 className="pb-2">{formatter.format(totalAsset)}</h1>
							</Container>
							<Container fluid className="shadow rounded border p-4">
								<Row className="pb-3 mb-3 border-5 border-bottom fw-bold fs-4">Pendanaan Mitra Aktif</Row>
								<Row className="mb-3">
									<Row className="fs-5 fw-bold py-3">Progress pendanaan</Row>
									<Container>{ProgressDana(persentase)}</Container>
								</Row>

								<Row className="pb-3 border-bottom ">
									<Container fluid>
										<Row className="fw-bold fs-5 ">Pokok</Row>
										<Row>
											<Col>
												<Row className="fw-bold text-muted">POKOK DITERIMA</Row>
												<Row className="lead">{formatter.format(totalPokokDone)}</Row>
											</Col>
											<Col>
												<Row className="fw-bold text-muted">SISA POKOK</Row>
												<Row className="lead">{formatter.format(sisaPokok)}</Row>
											</Col>
											<Col>
												<Row className="fw-bold text-muted">TOTAL PENDANAAN AKTIF</Row>
												<Row className="lead">{formatter.format(totalDanaAktif)}</Row>
											</Col>
										</Row>
									</Container>
								</Row>
								<Row className="py-3 border-bottom ">
									<Container>
										<Row>
											<Col md={4}>
												<Row className="fs-5 fw-bold ">Bagi hasil diterima</Row>
											</Col>
											<Col>
												<Row className="lead">{formatter.format(bagiHasil)}</Row>
											</Col>
										</Row>
									</Container>
								</Row>
								<Row className="py-3 border-bottom ">
									<Container>
										<Row>
											<Col md={4}>
												<Row className="fs-5 fw-bold ">Dana tersedia</Row>
											</Col>
											<Col>
												<Row className="lead">{formatter.format(credits - debits + totalPencairanGagal)}</Row>
											</Col>
											<Col>
												<Button
													onClick={() => {
														handleClick();
													}}
													variant="success"
												>
													Pencairan Dana
												</Button>
											</Col>
										</Row>
									</Container>
								</Row>
								{/* <Row className="py-3 border-bottom border-5">
									<Container>
										<Row className="fw-bold fs-5">Kualitas pendanaan</Row>
										<Row>
											<Col md={4}>
												<Row className="fw-bold text-muted">PEMBAYARAN LANCAR</Row>
												<Row className="lead">1 Mitra</Row>
											</Col>
											<Col>
												<Row className="fw-bold text-muted">PEMBAYARAN KURANG LANCAR</Row>
												<Row className="lead">1 Mitra</Row>
											</Col>
										</Row>
									</Container>
								</Row> */}
								<Row className="py-3 ">
									<Container>
										<Row>
											<Col md={4}>
												<Row className="fs-5 fw-bold ">Proses pencairan</Row>
											</Col>
											<Col>
												<Row className="lead">{formatter.format(totalPencairan)}</Row>
											</Col>
										</Row>
									</Container>
								</Row>
							</Container>
							<Container fluid className="shadow rounded border mt-4 p-4">
								<Row className="py-3 mb-3 border-5 border-bottom fw-bold fs-5">Daftar Mitra</Row>
								<Row>
									<Container>
										<Row className="mb-3">
											<span className="fw-bold">Mitra aktif</span>
										</Row>
										<Row>
											{asset && FilterOrder(asset, ["running"]).length === 0 && (
												<Card>
													<Card.Body>
														<Container>
															<Row className="mt-2" style={{ height: "9rem", overflow: "hidden", objectFit: "contain" }}>
																<Image src={noData} style={{ height: "100%" }} />
															</Row>
															<Row className="text-center my-2">
																<span className="fw-bold fs-6">Tidak ada data</span>
															</Row>
														</Container>
													</Card.Body>
												</Card>
											)}
											{asset &&
												FilterOrder(asset, ["running"]).map((val, i) => {
													return (
														<Card key={i}>
															<Card.Body>
																<Card.Title>{val.Name}</Card.Title>
																<Row>
																	<Col>{DateFormat(val.DueDate)}</Col>
																	<Col className="text-end">
																		<span className="mx-2">Qty:</span> <span>{val.Sold}</span>
																	</Col>
																	<Col className="text-end">
																		<span className="mx-2">Total:</span> <span>{formatter.format(val.Sold * val.Price)}</span>
																	</Col>
																	<Col className="text-end">
																		<Button
																			onClick={() => {
																				handlePembayaran(val);
																			}}
																			variant="success"
																		>
																			Pembayaran
																		</Button>
																	</Col>
																</Row>
															</Card.Body>
														</Card>
													);
												})}
										</Row>
									</Container>
								</Row>
								<Row>
									<Container>
										<Row className="my-3">
											<span className="fw-bold">Mitra dalam proses</span>
										</Row>
										<Row>
											{asset && FilterOrder(asset, ["posted"]).length === 0 && (
												<Card>
													<Card.Body>
														<Container>
															<Row className="mt-2" style={{ height: "9rem", overflow: "hidden", objectFit: "contain" }}>
																<Image src={noData} style={{ height: "100%" }} />
															</Row>
															<Row className="text-center my-2">
																<span className="fw-bold fs-6">Tidak ada data</span>
															</Row>
														</Container>
													</Card.Body>
												</Card>
											)}
											{asset &&
												FilterOrder(asset, ["posted"]).map((val, i) => {
													return (
														<Card key={i}>
															<Card.Body>
																<Card.Title>{val.Name}</Card.Title>
																<Row>
																	<Col>{DateFormat(val.DueDate)}</Col>
																	<Col className="text-end">
																		<span className="mx-2">Qty:</span> <span>{val.Sold}</span>
																	</Col>
																	<Col className="text-end">
																		<span className="mx-2">Total:</span> <span>{formatter.format(val.Sold * val.Price)}</span>
																	</Col>
																	<Col className="text-end"></Col>
																</Row>
															</Card.Body>
														</Card>
													);
												})}
										</Row>
									</Container>
								</Row>
								<Row>
									<Container>
										<Row className="my-3">
											<span className="fw-bold">Mitra tidak aktif</span>
										</Row>
										<Row>
											{asset && FilterOrder(asset, ["done"]).length === 0 && (
												<Card>
													<Card.Body>
														<Container>
															<Row className="mt-2" style={{ height: "9rem", overflow: "hidden", objectFit: "contain" }}>
																<Image src={noData} style={{ height: "100%" }} />
															</Row>
															<Row className="text-center my-2">
																<span className="fw-bold fs-6">Tidak ada data</span>
															</Row>
														</Container>
													</Card.Body>
												</Card>
											)}
											{asset &&
												FilterOrder(asset, ["done"]).map((val, i) => {
													return (
														<Card key={i}>
															<Card.Body>
																<Card.Title>{val.Name}</Card.Title>
																<Row>
																	<Col>{DateFormat(val.DueDate)}</Col>
																	<Col className="text-end">
																		<span className="mx-2">Qty:</span> <span>{val.Sold}</span>
																	</Col>
																	<Col className="text-end">
																		<span className="mx-2">Total:</span> <span>{formatter.format(val.Sold * val.Price)}</span>
																	</Col>
																	<Col className="text-end"></Col>
																</Row>
															</Card.Body>
														</Card>
													);
												})}
										</Row>
									</Container>
								</Row>
							</Container>
						</Row>
					</Col>
				</Row>
			</Container>
			<PaidStatus show={show} onHide={() => setShow(false)} installment={installments} singleProject={singleProject} />
			<ErrorBank show={errModalShow} navi="/investor/account/form" onHide={() => setErrModalShow(false)} />
			<Disbursement show={modalShow} navi="/investor/account/form" onHide={() => setModalShow(false)} bank={bank} trigger={() => setFetchTrigger(true)} />
		</>
	);
};
