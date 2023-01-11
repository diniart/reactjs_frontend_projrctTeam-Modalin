import axios from "axios";
import { useContext, useState } from "react";
import { Row, Col, Container, Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { apiURL } from "../../Helpers/API";
import image from "../../Images/seedingplant.jpg";

const Loginpage = () => {
	let navigate = useNavigate();
	const [input, setInput] = useState({ email: "", password: "" });
	const [user, setUser] = useContext(UserContext);
	const [error, setError] = useState();
	const [success, setSucces] = useState();

	const [classes, setClasses] = useState('bi bi-eye-fill')
	const [typeInput, setTypeInput] = useState('password')

	const handleSubmit = (event) => {
		if (user === null) {
			event.preventDefault();
			axios
				.post(`${apiURL}/login`, {
					email: input.email,
					password: input.password,
				})
				.then((res) => {
					var user = res.data.user;
					var token = res.data.token;
					var currentUser = { id: user.id, email: user.email, token, role: user.role };
					setUser(currentUser);
					localStorage.setItem("user", JSON.stringify(currentUser));
					setTimeout(() => {
						navigate("/");
					}, 2000);
					setSucces("Woohoo, you're successfully login!");
				})
				.catch((err) => {
					setError(JSON.stringify(err.response.data.error));
				});
		} else {
			event.preventDefault();
			setError("You already logged, please log out to login diffrent account");
		}
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
		<>
			<ToastContainer position="top-center" className="p-4">
				<Toast onClose={() => setSucces()} show={success !== undefined} delay={3000} autohide>
					<Toast.Body className="text-center">
						<span className="px-3 font-weight-bold">{success} <span className="text-color font-weight-bold h4 align-middle"> <i className="bi bi-check-circle"></i></span></span>
					</Toast.Body>
				</Toast>
				<Toast onClose={() => setError()} show={error !== undefined} delay={3000} autohide>
					<Toast.Body className="text-center">
						<span className="px-3 ">{error} <span className="text-danger font-weight-bold h4 align-middle"> <i className="bi bi-x-circle"></i></span></span>
					</Toast.Body>
				</Toast>
			</ToastContainer>
			<Container fluid>
				<Row style={{ minHeight: "100vh" }}>
					<Col xs={12} md={8} style={{ backgroundImage: `url("${image}")`, objectFit: "" }}>
						<Row className="justify-content-center">
							<Col xs={12} md={7}>
								<Container fluid className=" p-5  text-center mb-5  rounded shadow" style={{ marginTop: "10em", backgroundColor: "hsla(120, 60%, 70%, 0.5)" }}>
									<h2 className="mb-3">Login to Your Account</h2>
									<Form onSubmit={handleSubmit}>
										<Form.Group className="mb-3">
											<Form.Control type="email" placeholder="Email" name="email" value={input.email} onChange={handleChange} required />
										</Form.Group>
										<Form.Group className="mb-3 d-flex">
											<Form.Control type={typeInput} placeholder="Password" name="password" value={input.password} onChange={handleChange} required />
											<Button variant="success" className="" style={{ fontWeight: "bold" }} type="button" onClick={handleSee}
											><i className={classes}></i>
											</Button>
										</Form.Group>
										<Row>
											<Col>
												<Button className="background-color border-0" style={{ width: "10em" }} variant="secondary" type="submit">
													Login
												</Button>
											</Col>
										</Row>
									</Form>
								</Container>
							</Col>
						</Row>
						<Container className="mt-5">
							<Button variant="light" className="ms-3 mb-3" onClick={() => navigate("/")}>
								<span class="bi bi-arrow-left"></span> Back
							</Button>
						</Container>
					</Col>
					<Col xs={12} md={4} className="background-color text-light text-center">
						<Container style={{ marginTop: "10em", marginBottom: "10em" }}>
							<h2>Not Member ?</h2>
							<br />
							<p>Register and discover a great amount of new opportunities!</p>
							<Button variant="light" onClick={() => navigate("/register")}>
								Register
							</Button>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
};
export default Loginpage;
