import SidebarAdmin from "./sidebarAdmin";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { apiURL } from "../../Helpers/API";
import formatter from "../../Helpers/Formatter";
import { Button, Col, Row } from "react-bootstrap";
import NavbarAdmin from "../../Components/Navbar/NavbarAdmin";

const DashboardAdmin = () => {
	let navigate = useNavigate();

	const [user] = useContext(UserContext);
	const [arr, setArr] = useState([]);
	const [profile, setProfile] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const transaction = await axios.get(`${apiURL}/transaction`, { headers: { Authorization: "Bearer " + user.token } });
			setArr(transaction.data.data);

			// get user profile
			const profiles = await axios.get(`${apiURL}/userProfile`, { headers: { Authorization: "Bearer " + user.token } });
			const result = profiles.data.data;
			setProfile({ name: result.fullname });
		};
		fetchData();
	}, [user.token]);

	console.log("profil", profile);

	let credits = 0;
	let debits = 0;

	for (let i = 0; i <= arr.length - 1; i++) {
		credits += arr[i].credit;
		debits += arr[i].debit;
	}
	return (
		<div style={{ backgroundColor: "GhostWhite" }}>
			<NavbarAdmin />

			<div style={{ display: "flex", flexDirection: "row" }}>
				<div style={{ width: "25vw", height: "auto" }}>
					<SidebarAdmin />
				</div>

				<div className="mt-5" style={{ display: "flex", flexDirection: "column", width: "75%" }}>
					{/* <Link style={{ TextDecoder: "none", color: "black", marginLeft: "30vw" }} to="/">
						<h1 style={{ marginLeft: "91%" }}>
							<i className="bi bi-house"></i>
						</h1>
					</Link> */}

					<div className="shadow p-4" style={{ width: "90%", minHeight: "90vh", height: "auto", marginBottom: "5vh" }}>
						<Row>
							<Row className="m-2">
								<h1>
									<i className="bi bi-person"></i> Selamat datang,{" "}
									<span
										className="text-color hover-cursor"
										onClick={() => {
											navigate("/admin/dashboard/profile");
										}}
									>
										{profile.name}
									</span>
								</h1>
							</Row>

							<Row className="m-2">
								<h3>
									<i className="bi bi-wallet2"></i> Ringkasan keuangan
								</h3>
								<br />
								<br />
								<div className="border-color p-5 flex-evenly">
									<div className="border-color border-light shadow p-4 text-center">
										<h5 className="text-color">Saldo </h5>
										<h5>{formatter.format(credits - debits)}</h5>
									</div>
									<div className="border-color border-light shadow p-4 text-center">
										<h5 className="text-color">Pemasukan</h5>
										<h5>{formatter.format(credits)} </h5>
									</div>
									<div className="border-color border-light shadow p-4 text-center">
										<h5 className="text-color">Pengeluaran</h5>
										<h5>{formatter.format(debits)}</h5>
									</div>
									<Button
										onClick={() => {
											navigate("/admin/dashboard/transaction");
										}}
										variant="success"
									>
										Lihat detail
									</Button>
								</div>
								<br />
							</Row>

							<Row className="m-2">
								<h3>
									<i className="bi bi-wallet2"></i> Ringkasan proyek
								</h3>
								<br />
								<br />
								<div className="border-color p-5 flex-evenly">
									<div className="border-color border-light shadow p-4 text-center">
										<h5 className="text-color">Sedang berjalan</h5>
										<h5>10 </h5>
									</div>
									<div className="border-color border-light shadow p-4 text-center">
										<h5 className="text-color">Tersedia</h5>
										<h5>12</h5>
									</div>
									<div className="border-color border-light shadow p-4 text-center">
										<h5 className="text-color">Selesai</h5>
										<h5>10</h5>
									</div>
									<Button
										onClick={() => {
											navigate("/admin/dashboard/projects");
										}}
										variant="success"
									>
										Lihat detail
									</Button>
								</div>
								<br />
							</Row>
							<Row className="m-2">
								<h3 className="my-4">
									<i className="bi bi-shop"></i> Pusat Bantuan
								</h3>

								<div className="border-color flex-evenly p-5">
									<div className="hovereffect">
										<div
											className="border-color border-light shadow p-4 text-center"
											onClick={() => {
												navigate("/help");
											}}
										>
											<h5>Hubungi Pusat Bantuan</h5>
										</div>
									</div>
								</div>
							</Row>
						</Row>
					</div>
				</div>
			</div>
		</div>
	);
};
export default DashboardAdmin;
