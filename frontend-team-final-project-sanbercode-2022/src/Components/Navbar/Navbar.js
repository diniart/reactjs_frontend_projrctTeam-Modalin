import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Badge, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { apiURL } from "../../Helpers/API";

const NavbarComp = (props) => {
	let navigate = useNavigate();
	const [user, setUser] = useContext(UserContext);
	const [itemLength, setItemLength] = useState();

	useEffect(() => {
		if (user != null) {
			const fetchData = async () => {
				const cart = await axios.get(`${apiURL}/cart-order`, { headers: { Authorization: "Bearer " + user.token } });
				const result = cart.data.data;
				setItemLength(result[0].CartItems.length);
			};
			fetchData();
		}
	}, [user, props.trigger]);

	return (
		<Navbar collapseOnSelect expand="lg" className="background-color">
			<Container>
				<NavbarBrand as={Link} to="/" className="fw-bold text-white">
					Modal.in
				</NavbarBrand>
				<NavbarToggle aria-controls="responsive-navbar-nav" />
				<NavbarCollapse id="responsive-navbar-nav">
					<Nav className="me-auto">
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

					<Nav>
						{user !== null && user.role === "investor" && (
							<Nav.Link
								onClick={() => {
									navigate("/investor/checkout");
								}}
								className="text-white"
								Heading
							>
								<i className="bi bi-cart4"></i> Keranjang
								<Badge bg="secondary" className="ms-2">
									{itemLength}
								</Badge>
							</Nav.Link>
						)}

						{user != null && (
							<>
								<Nav.Link
									onClick={() => {
										if (user.role === "admin") {
											navigate("/admin/dashboard");
										} else if (user.role === "investor") {
											navigate("/investor/dashboard");
										} else if (user.role === "investee") {
											navigate("/investee/dashboard");
										}
									}}
									className="text-white"
								>
									Dashboard
								</Nav.Link>
								<Nav.Link
									onClick={() => {
										setUser(null);
										localStorage.clear();
										navigate("/");
									}}
									className="text-white"
								>
									Log out
								</Nav.Link>
							</>
						)}
						{user == null && (
							<>
								<Nav.Link as={Link} to="/login" className="text-white">
									Login
								</Nav.Link>
								<Nav.Link as={Link} to="/register" className="text-white">
									Register
								</Nav.Link>
							</>
						)}
					</Nav>
				</NavbarCollapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComp;
