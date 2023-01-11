import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Container, Navbar, Nav } from "react-bootstrap";

const NavbarDash = () => {
	let navigate = useNavigate();

	const [user] = useContext(UserContext);
	return (
		<>
			<Navbar variant="dark" className="background-color">
				<Container>
					<Navbar.Brand as={Link} to="/" className="fw-bold text-white d-none d-md-flex ">
						Modal.in
					</Navbar.Brand>
					<Nav className="me-auto  d-none d-md-flex ">
						<Nav.Link as={Link} to="/" className="text-white">
							Beranda
						</Nav.Link>
						<Nav.Link as={Link} to="/about" className="text-white">
							Tentang Kami
						</Nav.Link>
						<Nav.Link as={Link} to="/projects" className="text-white">
							Proyek
						</Nav.Link>
						<Nav.Link as={Link} to="/help" className="text-white">
							Bantuan
						</Nav.Link>
					</Nav>

					{user.role === "investor" && (
						<Navbar.Text className="ms-auto me-3">
							<span className="me-2">Signed in as:</span> <Link to="/investor/account">{user.email}</Link>
						</Navbar.Text>
					)}
				</Container>
			</Navbar>
		</>
	);
};

export default NavbarDash;
