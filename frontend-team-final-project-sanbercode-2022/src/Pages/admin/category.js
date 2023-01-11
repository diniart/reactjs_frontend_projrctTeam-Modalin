import SidebarAdmin from "./sidebarAdmin";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { apiURL } from "../../Helpers/API";
import NavbarAdmin from "../../Components/Navbar/NavbarAdmin";

const CategoryDashboardAdmin = () => {
	const [user] = useContext(UserContext);
	let navigate = useNavigate();
	const [category, setCategory] = useState([]);

	const [fetchTrigger, setFetchTrigger] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const category = await axios.get(`${apiURL}/category`);
			setCategory(
				category.data.data.map((x) => {
					return { ...x, key: x.id };
				})
			);
		};
		if (fetchTrigger) {
			fetchData();
			setFetchTrigger(false);
		}
	}, [fetchTrigger]);

	const ActionButton = ({ name, id }) => {
		const handleAction = () => {
			let caseName = name.toLowerCase();
			if (caseName === "delete") {
				axios.delete(`${apiURL}/category/${id}`, { headers: { Authorization: "Bearer " + user.token } }).then(() => {
					setFetchTrigger(true);
				});
			} else if (caseName === "edit") {
				navigate(`/admin/dashboard/category/form/${id}`);
			}
		};

		return (
			<Button variant="success" onClick={handleAction}>
				{" "}
				{name}
			</Button>
		);
	};

	return (
		<div style={{ backgroundColor: "GhostWhite" }}>
			<NavbarAdmin />
			<div style={{ display: "flex", flexDirection: "row" }}>
				<div style={{ width: "25vw", height: "auto" }}>
					<SidebarAdmin />
				</div>

				<div className="mt-3" style={{ display: "flex", flexDirection: "column", width: "95%" }}>
					<div style={{ width: "100%", height: "auto", marginBottom: "5vh" }}>
						{/* <Link style={{ TextDecoder: "none", color: "black", marginLeft: "100vh" }} to="/"><h1 style={{ marginLeft: "91%" }}><i className="bi bi-house"></i></h1></Link> */}
						<h1 style={{ marginLeft: "3vw", marginTop: "1vw" }}>
							<i className="bi bi-bookmarks"></i> Kategori Proyek
						</h1>

						<div className="shadow" style={{ marginLeft: "5vh", marginTop: "3vw", width: "90%", backgroundColor: "white", height: "auto", paddingTop: "2vw", paddingBottom: "2vw" }}>
							<table className="table table-hover table-borderless" style={{ marginLeft: "3vh", marginRight: "", width: "95%" }}>
								<thead>
									<th>Nomor</th>
									<th>Kategori</th>
									<th>Aksi</th>
								</thead>
								<br />
								<tbody>
									{category.map((val, x) => {
										return (
											<tr>
												<td>{x + 1}</td>
												<td>{val.category}</td>
												<td>
													<ActionButton name="Edit" id={val.id} />
													&nbsp;
													<ActionButton name="Delete" id={val.id} />
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<br />
							<Button
								type="primary"
								style={{ backgroundColor: "green", marginLeft: "3vw" }}
								onClick={() => {
									navigate("/admin/dashboard/category/form");
								}}
							>
								Tambah Kategori
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CategoryDashboardAdmin;
