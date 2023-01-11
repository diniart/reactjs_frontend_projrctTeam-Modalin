import { useContext, useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarDash from "../../Components/Navbar/NavbarDash";
import { UserContext } from "../../Context/UserContext";
import SidebarInvestor from "./SidebarInvestor";
import image from "../../Images/banner2.png";
import axios from "axios";
import { apiURL } from "../../Helpers/API";
import formatter from "../../Helpers/Formatter";
import FilterOrder from "../../Components/Filter/FilterOrder";
import Disbursement from "../../Components/Modal/Disbursement"
import ErrorBank from "../../Components/Modal/errorFillBankAccount"

const DashboardInvestor = () => {
	let navigate = useNavigate();
	const [user] = useContext(UserContext);
	const [transaction, setTransaction] = useState([]);
	const [asset, setAsset] = useState();
	const [bank, setBank] = useState({});
	const [modalShow, setModalShow] = useState(false);
    const [errModalShow, setErrModalShow] = useState(false);
	const [fetchTrigger, setFetchTrigger] = useState(true);

	let totalPokok = 0;
	let totalPokokDone = 0;
	let totalPencairanGagal = 0

	useEffect(() => {
		const fetchData = async () => {
			const resp = await axios.get(`${apiURL}/projects/buy`, { headers: { Authorization: "Bearer " + user.token } });
			setAsset(resp.data.data);

			const transaction = await axios.get(`${apiURL}/transaction`, { headers: { Authorization: "Bearer " + user.token } });
			setTransaction(transaction.data.data);

			const profiles = await axios.get(`${apiURL}/userProfile`, { headers: { Authorization: "Bearer " + user.token } });
			const result = profiles.data.data;
			setBank({ fullname: result.fullname, bank_name: result.bank_name, bank_account_number: result.bank_account_number });
		};
		fetchData();
	}, [user.token,fetchTrigger]);

	const handleClick = async () => {
        // hit api to get bank information
        if (bank.bank_name === '' || bank.bank_account_number === null) {
            setErrModalShow(true)
        } else {
            setModalShow(true)
        }
    }

	if (asset) {
		asset.map((val, i) => {
			totalPokok += val.Sold * val.Price;
			return "";
		});
	}

	if (asset) {
		FilterOrder(asset, ["done"]).map((val, i) => {
			totalPokokDone += val.Sold * val.Price;
			return "";
		});
	}

	if (transaction) {
		transaction.map((val, i) => {
			if (val.status === "PencairanGagal"){
				totalPencairanGagal += val.debit;
			}
			return ""
			
		});
	}

	// mencari total saldo tersedia
	let credits = 0;
	let debits = 0;

	for (let i = 0; i <= transaction.length - 1; i++) {
		credits += transaction[i].credit;
		debits += transaction[i].debit;
	}


	let totalAsset = totalPokok - totalPokokDone + credits - debits + totalPencairanGagal;
	let sisaPokok = totalPokok - totalPokokDone;


	return (
		<>
			<NavbarDash />
			<Container fluid>
				<Row className="d-flex justify-content-around">
					{/* Sidbar kiri*/}
					<Col md={3} className="shadow me-auto">
						<SidebarInvestor />
					</Col>

					<Col md={5} className="mx-auto " style={{ minHeight: "100vh" }}>
						<Row className=" rounded my-3  ">
							<span className="fs-2"> Hai, {bank.fullname !== "" ? bank.fullname : user.email}</span>
							<span className="text-success fs-4">Selamat datang</span>
						</Row>

						<Row className="shadow rounded mb-3 py-3">
							<span className="fs-5 text-muted"> TOTAL ASET SAYA</span>
							<span className="fs-2">{formatter.format(totalAsset)}</span>
						</Row>
						<Row className="shadow rounded mb-3 py-3">
							<Container fluid>
								<Row className="mb-3 py-2 ">
									<Col>
										<span>Pendanaan Mitra Aktif</span>
									</Col>
									<Col className="text-end">
										<Button
											onClick={() => {
												navigate("/investor/portofolio");
											}}
											variant="success"
										>
											Detail Portofolio Saya
										</Button>
									</Col>
								</Row>
								<Row className="d-flex justify-content-around px-3">
									<Col>
										<Row style={{ fontSize: "0.7rem" }} className="fw-bold text-muted">
											SISA POKOK
										</Row>
										<Row className="fw-bold">{formatter.format(sisaPokok)}</Row>
									</Col>
									<Col>
										<Row style={{ fontSize: "0.7rem" }} className="fw-bold text-muted">
											ANGSURAN TERBAYAR
										</Row>
										<Row className="fw-bold">{formatter.format(totalPokokDone)}</Row>
									</Col>
									<Col>
										<Row style={{ fontSize: "0.7rem" }} className="fw-bold text-muted">
											MITRA PENDANAAN AKTIF
										</Row>
										<Row className="fw-bold">
											<span></span>
											{asset && FilterOrder(asset, ["running"]).length} Mitra{" "}
										</Row>
									</Col>
								</Row>
							</Container>
						</Row>
						<Row className="shadow rounded mb-3">
							<Button
								onClick={() => {
									navigate("/projects");
								}}
								variant="success"
								style={{ minHeight: "14rem", backgroundImage: `url("${image}")`, backgroundSize: "100%" }}
							></Button>
						</Row>
					</Col>
					<Col md={3} className=" ms-auto me-3 ">
						<Row className="shadow rounded my-3 py-5 d-flex align-item-center text-white bg-success">
							<Col md={8} sm={8}>
								<Container fluid>
									<Row>
										<span className="fs-6 fw-bold">DANA TERSEDIA</span>
									</Row>
									<Row>
										<span className="fs-5">{formatter.format(credits - debits + totalPencairanGagal)}</span>
									</Row>
								</Container>
							</Col>
							<Col className="text-end">
								<Button onClick={() => {
												navigate("/investor/portofolio");
											}} size="lg" className="rounded-circle background-color" variant="success">
									<i className="bi bi-arrow-left"></i>
								</Button>
							</Col>
						</Row>
						<Row className="shadow rounded my-3 py-5 d-flex align-item-center  border-color">
							<Col md={8} sm={8}>
								<Container fluid>
									<Row>
										<span className="fs-6 fw-bold">PENCAIRAN DANA</span>
									</Row>
								</Container>
							</Col>
							<Col className="text-end">
								<Button onClick={()=>{handleClick()}} size="lg" className="rounded-circle " variant="success">
									<i className="bi bi-arrow-right"></i>
								</Button>
							</Col>
						</Row>
						<Row className="shadow rounded my-3 py-4 d-flex align-item-center bg-secondary">
							<Col md={8} sm={8}>
								<Container fluid>
									<Row>
										<span className="fs-5 fw-bold text-white">Pusat Bantuan</span>
									</Row>
								</Container>
							</Col>
							<Col className="text-end">
								<Button
									onClick={() => {
										navigate("/help");
									}}
									size="lg"
									className="rounded-circle "
									variant="light"
								>
									<i className="bi bi-telephone"></i>
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
			<ErrorBank show={errModalShow} navi="/investor/account/form" onHide={() => setErrModalShow(false)} />

			<Disbursement show={modalShow} navi="/investor/account/form" onHide={() => setModalShow(false)} bank={bank} trigger={() => setFetchTrigger(true)} />
		</>
	);
};

export default DashboardInvestor;
