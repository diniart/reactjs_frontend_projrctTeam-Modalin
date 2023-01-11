import SidebarAdmin from "./sidebarAdmin";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { apiURL } from "../../Helpers/API";
import { UserContext } from "../../Context/UserContext";
import { Table } from "react-bootstrap";
import ButtonStatus from "./switchbuttonstatususer";
import _ from "lodash";
import { Nav } from "react-bootstrap";

import axios from "axios";
import defaultProfile from "../../Images/default-profile.png";
import NavbarAdmin from "../../Components/Navbar/NavbarAdmin";

const InvesteeDashboardAdmin = () => {
	const [user] = useContext(UserContext);
	const [investee, setInvestee] = useState([{}]);

	// pagination
	const [paginated, setPaginated] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const pageSize = 5;
	const pageCount = Math.ceil(investee.length / pageSize);
	const pages = _.range(1, pageCount + 1);

	useEffect(() => {
		const fetchData = async () => {
			const investee = await axios.get(`${apiURL}/admin/users/investee`, { headers: { Authorization: "Bearer " + user.token } });
			const result = investee.data.data;
			setInvestee(result);
			setPaginated(_(investee.data.data).slice(0).take(pageSize).value());
		};

		fetchData();
	}, [user.token]);

	const pagination = (pageNo) => {
		setCurrentPage(pageNo);
		const startIndex = (pageNo - 1) * pageSize;
		const paginated = _(investee).slice(startIndex).take(pageSize).value();
		setPaginated(paginated);
	};

	return (
		<div style={{ backgroundColor: "GhostWhite" }}>
			<NavbarAdmin />
			<div style={{ display: "flex", flexDirection: "row" }}>
				<div style={{ width: "25vw", height: "auto" }}>
					<SidebarAdmin />
				</div>

				<div className="mt-3" style={{ display: "flex", flexDirection: "column", width: "75%" }}>
					<div style={{ width: "100%", height: "auto", marginBottom: "5vh" }}>
						{/* <Link style={{ TextDecoder: "none", color: "black", marginLeft: "100vh" }} to="/">
							<h1 style={{ marginLeft: "91%" }}>
								<i className="bi bi-house"></i>
							</h1>
						</Link> */}
						<h1 style={{ marginLeft: "3vw", marginTop: "1vw" }}>
							<i className="bi bi-wallet2"></i> Table Investee
						</h1>

						<div className="shadow" style={{ marginLeft: "3vh", marginTop: "3vw", width: "97%", height: "auto", paddingTop: "2vw", paddingBottom: "2vw" }}>
							<div className="style-table">
								<Table className="table table-hover table-borderless" style={{ marginLeft: "3vh", width: "95%" }}>
									<thead>
										<th>ID</th>
										<th>Status</th>
										<th>Email</th>
										<th>Photo</th>
										<th>Nama</th>
										<th>Alamat</th>
									</thead>
									<br />
									<tbody>
										{paginated.map((val, ind) => {
											return (
												<>
													<tr>
														<td>{(currentPage - 1) * 5 + (ind + 1)}</td>
														<td>
															<ButtonStatus status={val.status} id={val.id} />
														</td>
														<td>{val.email}</td>

														<td>
															{val.UserProfile.profile_url === "" && <img style={{ width: "5vw", objectFit: "contain" }} src={defaultProfile} alt="investee-profiles" />}
															{val.UserProfile.profile_url !== "" && <img style={{ width: "5vw", objectFit: "contain" }} src={val.UserProfile.profile_url} alt="investee-profiles" />}
														</td>
														{val.UserProfile.fullname === "" && <td style={{ width: "15vw" }}>.....</td>}
														{val.UserProfile.fullname !== "" && <td style={{ width: "15vw" }}>{val.UserProfile.fullname}</td>}
														{val.UserProfile.address === "" && <td style={{ width: "15vw" }}>.....</td>}
														{val.UserProfile.address !== "" && <td style={{ width: "15vw" }}>{val.UserProfile.address}</td>}
													</tr>
												</>
											);
										})}
									</tbody>
								</Table>
							</div>

							<Nav className="d-flex justify-content-center">
								<ul className="pagination">
									{pages.map((page) => {
										return (
											<li className={page === currentPage ? "page-item active" : "page-item"}>
												<p className="page-link" onClick={() => pagination(page)}>
													{page}
												</p>
											</li>
										);
									})}
								</ul>
							</Nav>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default InvesteeDashboardAdmin;
