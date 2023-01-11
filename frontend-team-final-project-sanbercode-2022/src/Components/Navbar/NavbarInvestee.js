import { useContext } from "react";
import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
const NavbarInvestee = () => {
	const [user, setUser] = useContext(UserContext);
	let navigate = useNavigate();
	return (
	<>
		<Navbar key={false} className="background-color shadow border border-secondary" variant="dark" expand={false}>
			<Container >
				<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} className="d-block d-md-none" />
				<Navbar.Brand as={Link} to="/">
					{/* <span className="fw-bold d-none d-md-block">
						<i class="bi bi-house-door-fill me-2"></i>Home
					</span> */}
					<span className="fw-bold ">Modal.in</span>
				</Navbar.Brand>
				<Nav className="me-auto d-md-flex flex-row  d-none d-md-block ">
					<Nav.Link as={Link} to="/" className="text-white mx-2">
						Beranda
					</Nav.Link>
					<Nav.Link as={Link} to="/about" className="text-white mx-2">
						Tentang Kami
					</Nav.Link>
					<Nav.Link as={Link} to="/projects" className="text-white mx-2">
						Proyek
					</Nav.Link>
					<Nav.Link as={Link} to="/help" className="text-white mx-2">
						Bantuan
					</Nav.Link>
				</Nav>
				{user.role === "investee" && (
					<Navbar.Text className="ms-auto me-3">
						<span className="me-2">Signed in as:</span> <Link to="/investee/dashboard/profile">{user.email}</Link>
					</Navbar.Text>
				)}
				<Navbar.Offcanvas className="text-white" id={`offcanvasNavbar-expand-${false}`} aria-labelledby={`offcanvasNavbarLabel-expand-${false}`} placement="start" style={{ width: "19rem" }}>
					<Offcanvas.Header className="background-color text-white" closeButton>
						<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`} className="fs-2 fw-bold">
							Modal.in
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body className="background-color text-white ">
						<Nav className="justify-content-end flex-grow-1 pe-3 text-white">
							<Nav.Link as={Link} to="/" className="fs-4 text-white">
								<span>
									<i class="bi bi-house-door-fill me-2"></i>Home
								</span>
							</Nav.Link>
							<Nav.Link as={Link} to="/investee/dashboard" className="fs-4 text-white">
								<i className="bi bi-speedometer me-2"></i>
								<span>Dashboard</span>
							</Nav.Link>
							<span className="fw-bold fs-3 text-muted">Proyek</span>
							<Nav.Link as={Link} to="/investee/dashboard/projects" className="fs-4 text-white">
								<i className="bi bi-building me-2"></i> Semua Proyek
							</Nav.Link>
							<Nav.Link as={Link} to="/investee/dashboard/project/form" className="fs-4 text-white">
								<i class="bi bi-plus-lg me-2"></i>Tambah Proyek
							</Nav.Link>
							<span className="fw-bold fs-3 text-muted">Transaksi</span>
							<Nav.Link as={Link} to="/investee/dashboard/projects" className="fs-4 text-white">
								<i class="bi bi-clock-history me-2"></i> Riwayat Transaksi
							</Nav.Link>
							<Nav.Link as={Link} to="/investee/dashboard/project/form" className="fs-4 text-white">
								<i class="bi bi-receipt-cutoff me-2"></i>Tagihan Proyek Berjalan
							</Nav.Link>
							<span className="fw-bold fs-3 text-muted">Akun</span>
							<Nav.Link as={Link} to="/investee/dashboard/profile" className="fs-4 text-white">
								<i className="bi bi-person-lines-fill me-2 "></i>Profil Saya
							</Nav.Link>
							<Nav.Link as={Link} to="/investee/changepassword" className="fs-4 text-white">
								<i class="bi bi-gear-wide-connected me-2"></i>Ganti Password
							</Nav.Link>
							<Nav.Link
								onClick={() => {
									setUser(null);
									localStorage.clear();
									navigate("/");
								}}
								className="fs-4 text-white"
							>
								<i class="bi bi-door-open-fill me-2"></i> Log Out
							</Nav.Link>
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	</>
	);
};

export default NavbarInvestee;
