import axios from "axios";
import { useState } from "react";
import { Alert, Button, Col, Container, Form, Image, Row, Toast, ToastContainer } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FooterComp from "../../Components/Footer/Footer";
import NavbarComp from "../../Components/Navbar/Navbar";
import image from "../../Images/seedingplant.jpg";
import { apiURL } from "../../Helpers/API";

const Register = () => {
	const [input, setInput] = useState({ email: "", password: "", role: "" });
	const [error, setError] = useState("");
	const [success, setSuccess] = useState();
	let navigate = useNavigate();

	const [classes, setClasses] = useState('bi bi-eye-fill')
	const [typeInput, setTypeInput] = useState('password')

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post(`${apiURL}/register`, {
				email: input.email,
				password: input.password,
				role: input.role,
			})
			.then((res) => {
				setSuccess("Registrasi berhasil, silakan login");
				setTimeout(() => {
					navigate("/login");
				}, 2000);
			})
			.catch((error) => {
				setTimeout(() => {
					setError("");
				}, 3000);
				if (input.role === '') {
					setError("Oops, silahkan pilih tujuan Anda mendaftar");
				} else {
					setError("Alamat email Anda sudah terdaftar");
				}
			});
	};

	const handleChange = (event) => {
		let value = event.target.value;
		let name = event.target.name;
		setInput({ ...input, [name]: value });
	};

	const handleSee = () => {
		// bi bi-eye-slash-fill
		if (classes === 'bi bi-eye-fill') {
			setClasses('bi bi-eye-slash-fill')
			setTypeInput('text')
		} else {
			setClasses('bi bi-eye-fill')
			setTypeInput('password')
		}
	}

	return (
		<div>
			<NavbarComp />

			<ToastContainer position="top-center" className="p-4">
				<Toast onClose={() => setSuccess()} show={success !== undefined} delay={3000} autohide>
					<Toast.Body className="text-center">
						<span className="px-3 ">{success}<span className="text-color font-weight-bold h4 align-middle"> <i className="bi bi-check-circle"></i></span></span>
					</Toast.Body>
				</Toast>
			</ToastContainer>

			<Container className="mt-5 mb-5 pb-5 register-page">
				<Row>
					<Col xs={12} md={6} className="pt-2">
						<Image className="img-fluid" src={image} alt="seeding plant" max-width={90} />
					</Col>

					<Col xs={12} md={6} className="ml-4">
						<h3>Buat akun Modal.in </h3>
						<br />

						{error !== "" && (
							<Alert key="danger" variant="danger">
								<span className="font-weight-bold h5 align-middle"> <i className="bi bi-x-circle"></i></span> {error}
							</Alert>
						)}

						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Alamat email</Form.Label>
								<Form.Control name="email" type="email" onChange={handleChange} value={input.email} placeholder="nama@email.com" required />
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<div className="d-flex">
									<Form.Control name="password" type={typeInput} onChange={handleChange} value={input.password} placeholder="Password minimal 6 karakter" required />
									<Button variant="success" style={{ fontWeight: "bold" }} type="button" onClick={handleSee}
									><i className={classes}></i>
									</Button>
								</div>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicCheckbox">
								<Form.Check type="radio" name="role" onChange={handleChange} value="investor" label="Saya ingin menjadi investor." />
								<Form.Check type="radio" name="role" onChange={handleChange} value="investee" label="Saya ingin mencari pendanaan." />
							</Form.Group>

							<Button className="background-color" variant="success" type="submit">
								Register
							</Button>

							<br />
							<br />

							<Form.Text className="text-muted">
								Sudah punya akun? <Link to="/login">Login</Link>
							</Form.Text>
						</Form>
					</Col>
				</Row>
			</Container>
			<FooterComp />
		</div>
	);
};

export default Register;
