import SidebarAdmin from "./sidebarAdmin";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Table, Row, Col, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

import defaultProfile from "../../Images/default-profile.png";

import { apiURL } from "../../Helpers/API";
import NavbarAdmin from "../../Components/Navbar/NavbarAdmin";

const AdminProfile = () => {
	const [user] = useContext(UserContext);
	const [profile, setProfile] = useState({});
	let navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const project = await axios.get(`${apiURL}/userProfile`, { headers: { Authorization: "Bearer " + user.token } });
			const result = project.data.data;
			setProfile(result);
		};
		fetchData();
	}, [user.token]);

	return (
		<div style={{ backgroundColor: "GhostWhite" }}>
			<NavbarAdmin />

			<div style={{ display: "flex", flexDirection: "row" }}>
				<div style={{ width: "30vw", height: "auto" }}>
					<SidebarAdmin />
				</div>

				<div className="mt-3" style={{ display: "flex", flexDirection: "column", width: "95%" }}>
					<div style={{ width: "100%", height: "auto", marginBottom: "5vh" }}>
						{/* <Link style={{ TextDecoder: "none", color: "black" }} to="/">
							<h1 style={{ marginLeft: "91%" }}>
								<i className="bi bi-house"></i>
							</h1>
						</Link> */}
						<h1 style={{ marginLeft: "3vw", marginTop: "1vw" }}>
							<i className="bi bi-person"></i> Profile Saya
						</h1>

						<div className="shadow" style={{ marginLeft: "3vw", marginTop: "3vw", width: "75%", backgroundColor: "white", height: "auto", paddingTop: "2vw", paddingBottom: "2vw" }}>
							<div className="image-profile-container border-color mt-4 mb-4 p-3" style={{ marginLeft: "5vh", marginTop: "20vw" }}>
								{profile.profile_url === "" && <img src={defaultProfile} alt="investee-profiles" />}
								{profile.profile_url !== "" && <img src={profile.profile_url} alt="investee-profiles" />}
							</div>

							<Row className=" background-color text-white" style={{ margin: "0vh", marginTop: "3vw" }}>
								<h5>Informasi Pribadi</h5>
							</Row>
							<div className=" border-color mt-4 " style={{ height: "50vh", width: "91%", margin: "5vh", marginBottom: "5vh", paddingLeft: "5vh" }}>
								<Row className=" mt-5 mb-3">
									<Col sm={4} xs={4}>
										Nama Lengkap
									</Col>
									<Col sm={8} xs={8}>
										{profile.fullname}
									</Col>
								</Row>
								<Row className="mb-3">
									<Col sm={4} xs={4}>
										Jenis Kelamin
									</Col>
									<Col sm={8} xs={8}>
										{profile.gender === "male" ? "Laki - laki" : profile.gender === "female" ? "Perempuan" : "-"}
									</Col>
								</Row>
								<Row className="mb-3">
									<Col sm={4} xs={4}>
										Nomor Telepon
									</Col>
									<Col sm={8} xs={8}>
										{profile.phone}
									</Col>
								</Row>
								<Row className="mb-3">
									<Col sm={4} xs={4}>
										KTP
									</Col>
									<Col sm={8} xs={8}>
										{profile.ktp}
									</Col>
								</Row>
								<br />
								<Row>
									<h6>Alamat </h6>
								</Row>

								<Row className="mb-3">
									<Col sm={4} xs={4}>
										Alamat Lengkap
									</Col>
									<Col sm={8} xs={8}>
										{profile.address}
									</Col>
								</Row>
								<Row className="mb-3">
									<Col sm={4} xs={4}>
										Kota
									</Col>
									<Col sm={8} xs={8}>
										{profile.city}
									</Col>
								</Row>
								<Row className="mb-3">
									<Col sm={4} xs={4}>
										Provinsi
									</Col>
									<Col sm={8} xs={8}>
										{profile.province}
									</Col>
								</Row>
								<br />
								<Row className="text-end">
									<Col>
										<Button
											className="mt-3 mb-3 "
											onClick={() => {
												navigate("/admin/dashboard/profile/form");
											}}
											variant="success"
										>
											Edit Profil
										</Button>
									</Col>
								</Row>
							</div>
						</div>
					</div>
					<div className="shadow" style={{ marginLeft: "3vw", marginTop: "1vh", marginBottom: "3vh", width: "75%", backgroundColor: "white", height: "auto", paddingBottom: "2vw" }}>
						<Row className=" background-color text-white" style={{ margin: "0vh" }}>
							<h5>Perbarui Password</h5>
						</Row>

						<div style={{ margin: "2vw" }}>
							<Row>
								<Form>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="4">
											Email
										</Form.Label>
										<Col sm="8">
											<Form.Control plaintext readOnly value={user.email} />
										</Col>
									</Form.Group>

									<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
										<Form.Label column sm="4">
											Password Lama
										</Form.Label>
										<Col sm="8">
											<Form.Control type="password" placeholder="Password" required />
										</Col>
									</Form.Group>

									<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
										<Form.Label column sm="4">
											Password Baru
										</Form.Label>
										<Col sm="8">
											<Form.Control type="password" placeholder="Password" required />
										</Col>
									</Form.Group>
									<Row className="text-end mb-3">
										<Col>
											<Button variant="success" type="submit">
												Simpan
											</Button>
										</Col>
									</Row>
								</Form>
							</Row>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AdminProfile;
