import { useContext } from "react";
import { Button, Container, Navbar, Offcanvas, Nav, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const SidebarInvestor = () => {
	let navigate = useNavigate();
	const [, setUser] = useContext(UserContext);
	return (
		<>
			<Navbar expand="md" sticky="top" style={{ width: "auto" }} className="bg-md-modalin ">
				<Container fluid className="flex-column  ">
					<Row className="align-items-center mt-4" style={{ width: "auto" }}>
						<Col className="me-sm-4 me-md-0 ms-md-4 mt-3 d-md-none">
							<Navbar.Brand as={Link} to="/">
								<h2 className="fw-bold "> <i class="bi bi-credit-card-2-front me-1"></i>Modal.in</h2>
							</Navbar.Brand>
						</Col>

						<Col className="ms-sm-5 ms-md-0">
							<Navbar.Toggle aria-controls="offacanvasNavbar-expand-md" className="ms-5 mb-3" />
						</Col>
					</Row>

					<Navbar.Offcanvas style={{width: "17em"}} id="offacanvasNavbar-expand-md" aria-labelledby="offacanvasNavbar-expand-md" placement="start">
						<Offcanvas.Header closeButton>
							<Offcanvas.Title>
								<h2 className="fw-bold"> Modal.in</h2>
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body >
							<Container>
								{/* <Row className=" mb-3">
									<Button
										className="text-start"
										onClick={() => {
											navigate("/");
										}}
										autofocus
										variant="outline-success"
										style={{ borderRadius: "9px", fontSize: "auto" }}
									>
										<i class="bi bi-house-door-fill ms-5 me-3"></i> Home
									</Button>
								</Row> */}
								<Row className="mt-3 mb-3">
									<Button
										className="text-start"
										onClick={() => {
											navigate("/investor/dashboard");
										}}
										autofocus
										variant="outline-success"
										style={{ borderRadius: "9px", fontSize: "auto" }}
									>
										<i class="bi bi-speedometer2 ms-5 me-3"></i> Dashboard
									</Button>
								</Row>
								{/* <Row className="mt-3 mb-3 ">
									<Button
										className="text-start"
										onClick={() => {
											navigate("/projects");
										}}
										autofocus
										variant="outline-success"
										style={{ borderRadius: "9px" }}
									>
										<i class="bi bi-shop ms-5 me-3"></i> Proyek
									</Button>
								</Row> */}
								<Row className="mt-3 mb-3">
									<Button
										className="text-start"
										onClick={() => {
											navigate("/investor/portofolio");
										}}
										autofocus
										variant="outline-success"
										style={{ borderRadius: "9px" }}
									>
										<i class="bi bi-archive-fill ms-5 me-3"></i> Portofolio
									</Button>
								</Row>
								<Row className="mt-3 mb-3">
									<Button
										className="text-start"
										onClick={() => {
											navigate("/investor/activity");
										}}
										autofocus
										variant="outline-success"
										style={{ borderRadius: "9px" }}
									>
										<i class="bi bi-arrow-left-right ms-5 me-3"></i> Aktivitas
									</Button>
								</Row>
								<Row className="mt-3 mb-3">
									<Button
										className="text-start"
										onClick={() => {
											navigate("/investor/account");
										}}
										autofocus
										variant="outline-success"
										style={{ borderRadius: "9px" }}
									>
										<i class="bi bi-person-lines-fill ms-5 me-3"></i> Akun
									</Button>
								</Row>
								<Row className="mt-3 mb-3">
									<Button
										className="text-start"
										onClick={() => {
											setUser(null);
											localStorage.clear();
											navigate("/");
										}}
										autofocus
										variant="outline-success"
										style={{ borderRadius: "9px" }}
									>
										<i class="bi bi-door-open-fill ms-5 me-3"></i> Logout
									</Button>
								</Row>
							</Container>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</>
	);
};
export default SidebarInvestor;
