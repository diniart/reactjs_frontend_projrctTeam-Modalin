import "../../Style/helppage.css";
import { Container, Row, Col, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const HelpPage = () => {
	let navigate = useNavigate();
	return (
		<>
			<Navbar bg="success" variant="dark">
				<Container>
					<Navbar.Brand as={Link} className="fw-bold fs-3 " to="/">
						Modal.in
					</Navbar.Brand>
				</Container>
			</Navbar>
			<Container fluid>
				<Row className="bg-success " style={{ minHeight: "5rem" }}>
					<Col className="d-flex align-items-center ms-2">
						<Container fluid>
							<Row>
								<span className="fw-bold fs-4 text-white text-center">Ada yang bisa kami bantu?</span>
							</Row>
						</Container>
					</Col>
				</Row>
				<Row className="d-flex justify-content-center align-items-center mt-5">
					<Col md={7}>
						<Container fluid>
							<a href="tel:085602301671" style={{ color: "inherit", textDecoration: "none" }}>
								<Row className="border mb-3 py-2 row-helppage" style={{ borderRadius: "15px" }}>
									<Col className="text-center ">
										<i className="bi bi-telephone bg-info rounded-circle " style={{ fontSize: "3em" }}></i>
									</Col>
									<Col>
										<Row className="fw-bold fs-4">Live Call</Row>
										<Row>Hubungi customer care kami</Row>
									</Col>
									<Col className=" d-flex align-items-center ">
										<i className="bi bi-chevron-right ms-auto" style={{ fontSize: "2em" }}></i>
									</Col>
								</Row>
							</a>
							<a href="https://wa.me/6285602301671" style={{ color: "inherit", textDecoration: "none" }}>
								<Row className="border mb-3 py-2 row-helppage" style={{ borderRadius: "15px" }}>
									<Col className="text-center">
										<i className="bi bi-whatsapp bg-warning rounded-circle" style={{ fontSize: "3em" }}></i>
									</Col>
									<Col>
										<Row className="fw-bold fs-4">WA Customer Care</Row>
										<Row>Whatsapp-an dengan customer care kami</Row>
									</Col>
									<Col className=" d-flex align-items-center ">
										<i className="bi bi-chevron-right ms-auto" style={{ fontSize: "2em" }}></i>
									</Col>
								</Row>
							</a>
							<a href="mailto:ikhwan.bas@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>
								<Row className="border mb-3  py-2 row-helppage" style={{ borderRadius: "15px" }}>
									<Col className="text-center">
										<i className="bi bi-envelope bg-info rounded-circle" style={{ fontSize: "3em" }}></i>
									</Col>
									<Col>
										<Row className="fw-bold fs-4">Email</Row>
										<Row>Laporkan kendala yang sedang dialami</Row>
									</Col>
									<Col className=" d-flex align-items-center ">
										<i className="bi bi-chevron-right ms-auto" style={{ fontSize: "2em" }}></i>
									</Col>
								</Row>
							</a>

							<Row className="my-5 d-flex justify-content-center text-center">

								<span className="text-center py-3">Atau kunjungi sosial media kami</span>
								<Container as={Col} md={5}>

									<Row className="d-flex justify-content-between">
										<Col> <a href="https://www.facebook.com"><i style={{ fontSize: "2em" }} className="bi bi-facebook"></i></a></Col>
										<Col> <a href="https://www.twitter.com"><i style={{ fontSize: "2em" }} className="bi bi-twitter"></i></a></Col>
										<Col> <a href="https://www.linkedin.com"><i style={{ fontSize: "2em" }} className="bi bi-linkedin"></i></a></Col>

									</Row>
								</Container>
							</Row>
						</Container>
					</Col>
				</Row>
				<Row>
					<Button variant="success" onClick={() => { navigate("/") }} className="m-5" style={{ width: "5rem" }}>Kembali</Button>
				</Row>
			</Container>
		</>
	);
};
export default HelpPage;
