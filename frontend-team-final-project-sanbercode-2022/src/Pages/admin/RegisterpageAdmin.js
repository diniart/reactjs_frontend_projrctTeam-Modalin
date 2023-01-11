import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import image from "../../Images/pattern.png";
import { apiURL } from "../../Helpers/API"

const RegisterpageAdmin = () => {
	let navigate = useNavigate();
	const [error, setError] = useState();
	const [success, setSucces] = useState();
	const [input, setInput] = useState({ email: "", password: "", role: "admin", verifikasi: "" });

	const handleSubmit = (event) => {
		event.preventDefault();
		if (input.verifikasi !== "MODALIN") {
			setError("Kode verifikasi salah");
		} else {
			axios
				.post(`${apiURL}/register`, {
					email: input.email,
					password: input.password,
					role: input.role,
				})
				.then((res) => {
					setSucces("Register succes");
					setTimeout(() => {
						navigate("/login");
					}, 2000);
				})
				.catch((err) => {
					setError("Email sudah terdaftar");
				});
		}
	};

	const handleChange = (event) => {
		let value = event.target.value;
		let name = event.target.name;
		setInput({ ...input, [name]: value });
	};

	return (
		<>
			<div as={Row} className="d-flex align-items-center" style={{ backgroundImage: `url("${image}")`, backgroundSize: "8%", minHeight: "100vh" }}>
				<ToastContainer position="top-center" className="p-4">
					<Toast onClose={() => setSucces()} show={success !== undefined} delay={3000} autohide>
						<Toast.Body className="text-center">
							<span className="px-3 ">{success}</span>
						</Toast.Body>
					</Toast>
					<Toast onClose={() => setError()} show={error !== undefined} delay={3000} autohide>
						<Toast.Body className="text-center">
							<span className="px-3 ">{error}</span>
						</Toast.Body>
					</Toast>
				</ToastContainer>


				<Container as={Col} xs={12} md={5} className="py-4 shadow border border-dark " style={{ borderRadius: "10px", backgroundColor: "whitesmoke" }} >
					<Container as={Row} className="p-4">
						<h2 className=" text-center">Register Admin</h2>
					</Container>
					<Container as={Row} className="mt-2">
						<Form onSubmit={handleSubmit} className="ms-2">
							<Form.Group className="mb-3" controlId="register1">
								<Form.Label>Alamat Email</Form.Label>
								<Form.Control type="email" placeholder="nama@email.com" name="email" value={input.email} onChange={handleChange} required />
							</Form.Group>
							<Form.Group className="mb-3" controlId="register2">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="masukkan password" name="password" value={input.password} onChange={handleChange} required minLength="6" />
							</Form.Group>
							{/* <Form.Group className="mb-3" controlId="register">
                    <Form.Control 
                    type="password" 
                    placeholder="Confirm password"
                    name="password"
                    value={input.password}
                    // onChange={handleChange} 
                    required
                    />
                </Form.Group> */}
							<Form.Group className="mb-3" controlId="register3">
								<Form.Label>Kode verifikasi</Form.Label>
								<Form.Control type="password" placeholder="Masukkan kode verifikasi" name="verifikasi" onChange={handleChange} required />
							</Form.Group>
							<Row>
								<Col>
									<Button className="background-color border-0" variant="dark" type="submit">
										Register
									</Button>
								</Col>
								<Col className="text-center">
									<p>
										Already have account?
										<Link to="/login">Login</Link>
									</p>
								</Col>
							</Row>
						</Form>
						<Row></Row>
					</Container>
				</Container>
			</div>
		</>
	);
};
export default RegisterpageAdmin;
