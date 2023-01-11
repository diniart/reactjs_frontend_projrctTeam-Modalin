import { Link } from "react-router-dom";

const SidebarAdmin = () => {
	return (
		<>
			<div className="shadow" style={{ borderRadius: "5%", backgroundColor: "#176139", marginLeft: "2vw", marginTop: "2vw", width: "19vw", height: "93vh" }}>
				<pre>
					<h5 style={{ color: "white", marginTop: "7vh", textAlign: "center", fontSize: "25pt", fontWeight: "bold" }}> Admin</h5>
					<hr style={{ color: "white", marginLeft: "70px", marginRight: "70px", marginTop: "45px" }} />

					<div className="sidebar-menu " style={{ margin: "4vw" }}>
						<Link style={{ textDecoration: "none", fontSize: "17pt" }} to="/admin/dashboard/">
							<p style={{ color: "white", marginBottom: "3vh" }}>
								{" "}
								<i className="bi bi-speedometer"></i> Dashboard
							</p>
						</Link>
						<Link style={{ textDecoration: "none" }} to="/admin/dashboard/category">
							<p style={{ color: "white", fontSize: "17pt", marginBottom: "3vh" }}>
								{" "}
								<i className="bi bi-bookmarks"></i> Kategori
							</p>
						</Link>
						<Link style={{ textDecoration: "none" }} to="/admin/dashboard/projects">
							<p style={{ color: "white", fontSize: "17pt", marginBottom: "3vh" }}>
								{" "}
								<i className="bi bi-building"></i> Proyek
							</p>
						</Link>
						<Link style={{ textDecoration: "none" }} to="/admin/dashboard/transaction">
							<p style={{ color: "white", fontSize: "17pt", marginBottom: "3vh" }}>
								{" "}
								<i className="bi bi-cash-coin"></i> Transaksi
							</p>
						</Link>
						<Link style={{ textDecoration: "none" }} to="/admin/dashboard/pencairan">
							<p style={{ color: "white", fontSize: "17pt", marginBottom: "3vh" }}>
								{" "}
								<i className="bi bi-box-arrow-left"></i> Pencairan
							</p>
						</Link>

						<Link style={{ textDecoration: "none" }} to="/admin/dashboard/investor">
							<p style={{ color: "white", fontSize: "17pt", marginBottom: "3vh" }}>
								{" "}
								<i className="bi bi-bank"></i> Investor
							</p>
						</Link>
						<Link style={{ textDecoration: "none" }} to="/admin/dashboard/investee">
							<p style={{ color: "white", fontSize: "17pt", marginBottom: "3vh" }}>
								{" "}
								<i className="bi bi-wallet2"></i> Investee
							</p>
						</Link>
						<Link style={{ textDecoration: "none" }} to="/admin/dashboard/profile">
							<p style={{ color: "white", fontSize: "17pt", marginBottom: "3vh" }}>
								{" "}
								<i className="bi bi-person"></i> Profil
							</p>
						</Link>
					</div>
				</pre>
			</div>
		</>
	);
};

export default SidebarAdmin;
