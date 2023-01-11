import { useContext, useEffect, useState } from "react";
import { Col, Row, Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SidebarInvestor from "./SidebarInvestor";
import defaultProfile from "../../Images/default-profile.png";
import { apiURL } from "../../Helpers/API";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import NavbarDash from "../../Components/Navbar/NavbarDash";

export const AccountDash = () => {
	const initialInput = { password: "", password_new: "", re_password_new: "" };
	const [profile, setProfile] = useState({});
	const [user] = useContext(UserContext);
	const [input, setInput] = useState(initialInput);
	const [error, setError] = useState();
	const [success, setSucces] = useState("");
	let navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const project = await axios.get(`${apiURL}/userProfile`, { headers: { Authorization: "Bearer " + user.token } });
			const result = project.data.data;
			setProfile(result);
		};
		fetchData();
	}, [user.token, user]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (input.password_new !== input.re_password_new) {
			setError("Re-type Password berbeda");
		} else {
			axios
				.post(`${apiURL}/change_password`, { password: input.password, password_new: input.password_new }, { headers: { Authorization: "Bearer " + user.token } })
				.then((res) => {
					navigate("/investor/account");
					setInput(initialInput);
					setSucces("Change Password Success");
					setError();
				})
				.catch((err) => {
					setError(err.response.data.error);
				});
		}
	};

	const handleChange = (event) => {
		let property = event.target.name;
		let value = event.target.value;
		setInput({ ...input, [property]: value });
	};
	console.log("profile", profile);
	console.log("user", user);
	return (
		<>
			<NavbarDash />
			<Container fluid>
				<Row>
					{/* Sidbar kiri*/}
					<Col md={3} className="shadow  ">
						<SidebarInvestor />
					</Col>

					<Col md={8} className="shadow ms-auto me-3">
						<Container>
							<br />
							<h2 className="fw-bold mt-3">AKUN</h2>

							<Row className=" py-2 background-color text-white">
								<h5>Informasi Akun</h5>
							</Row>

							<Row>
								{error !== undefined && (
									<Alert className="my-3" key="danger" variant="danger">
										{error}
									</Alert>
								)}
								{success !== "" && (
									<Alert className="my-3" key="success" variant="success">
										{success}
									</Alert>
								)}

								<Form>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="4">
											Email
										</Form.Label>
										<Col sm="8">
											<Form.Control plaintext readOnly value={user.email} />
										</Col>
									</Form.Group>
								</Form>
								<Form>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
										<Form.Label column sm="4">
											Password Lama
										</Form.Label>
										<Col sm="8">
											<Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} required />
										</Col>
									</Form.Group>

									<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
										<Form.Label column sm="4">
											Password Baru
										</Form.Label>
										<Col sm="8">
											<Form.Control type="password" placeholder="Password Baru" name="password_new" onChange={handleChange} required />
										</Col>
									</Form.Group>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
										<Form.Label column sm="4">
											Re-Password Baru
										</Form.Label>
										<Col sm="8">
											<Form.Control type="password" placeholder="Re-Password Baru" name="re_password_new" onChange={handleChange} required />
										</Col>
									</Form.Group>
									<Row className="text-end mb-3">
										<Col>
											<Button onClick={handleSubmit} variant="success" type="submit">
												Simpan
											</Button>
										</Col>
									</Row>
								</Form>
							</Row>

							<Row className="my-5 py-2 background-color text-white">
								<h5>Informasi Pribadi </h5>
							</Row>
							<div className="row image-profile-container border-color rounded mx-auto mt-5 p-3 ">
								{profile.profile_url === "" && <img src={defaultProfile} alt="investee-profiles" />}
								{profile.profile_url !== "" && <img src={profile.profile_url} alt="investee-profiles" />}
							</div>
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
							<Row className="my-5 py-2 background-color text-white">
								<h5>Informasi Bank </h5>
							</Row>

							<Row className="mb-3">
								<Col sm={4} xs={4}>
									Nama Bank
								</Col>
								<Col sm={8} xs={8}>
									{profile.bank_name}
								</Col>
							</Row>
							<Row className="mb-3">
								<Col sm={4} xs={4}>
									Nomor Rekening
								</Col>
								<Col sm={8} xs={8}>
									{profile.bank_account_number}
								</Col>
							</Row>

							<br />
							<Row className="text-end">
								<Col>
									<Button
										className="mt-3 mb-3 "
										onClick={() => {
											navigate("/investor/account/form");
										}}
										variant="success"
									>
										Edit Profil
									</Button>
								</Col>
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
};
