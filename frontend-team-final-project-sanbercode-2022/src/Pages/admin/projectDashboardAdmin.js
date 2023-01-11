import SidebarAdmin from "./sidebarAdmin";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../../Helpers/API";
import formatter from "../../Helpers/Formatter";
import { UserContext } from "../../Context/UserContext";
import InstallmentData from "../../Components/Modal/installment";
import InvestorData from "../../Components/Modal/investor";
import _ from "lodash";
import { Nav } from "react-bootstrap";
import NavbarAdmin from "../../Components/Navbar/NavbarAdmin";
//import FilterOrder from "../../Components/Filter/FilterOrder";

const ProjectsDashboardAdmin = () => {
	const [user] = useContext(UserContext);
	const [projects, setProjects] = useState([]);
	const [error, setError] = useState();
	const [fetchTrigger, setFetchTrigger] = useState(true);

	// state for installment data in MODAL Component
	const [modalShow, setModalShow] = useState(false);
	const [modalInvestor, setModalInvestor] = useState(false);
	const [installments, setInstallments] = useState([]);
	const [investor, setInvestor] = useState([]);
	const [currentProjectID, setCurrentProjectID] = useState("");
	const [projectStatus, setProjectStatus] = useState("");

	// pagination
	const [paginated, setPaginated] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const pageSize = 5;
	const pageCount = Math.ceil(projects.length / pageSize);
	const pages = _.range(1, pageCount + 1);

	//filter
	const [filter, setFilter] = useState("");
	//const[status,setStatus]= useState(status)

	useEffect(() => {
		const fetchData = async () => {
			const projects = await axios.get(`${apiURL}/projects/sold`);
			setProjects(projects.data.data);
			setPaginated(_(projects.data.data).slice(0).take(pageSize).value());
		};
		if (fetchTrigger) {
			fetchData();
			setFetchTrigger(false);
		}
	}, [fetchTrigger]);

	const pagination = (pageNo) => {
		setCurrentPage(pageNo);
		const startIndex = (pageNo - 1) * pageSize;
		const paginated = _(projects).slice(startIndex).take(pageSize).value();
		setPaginated(paginated);
	};

	const handlePost = (ProjectID) => {
		axios
			.patch(`${apiURL}/projects/status/${ProjectID}`, { status: "posted" }, { headers: { Authorization: "Bearer " + user.token } })
			.then((res) => {
				setFetchTrigger(true);
			})
			.catch((err) => {
				setError(err.response.data.error);
				alert(error);
			});
	};

	const handleRun = (Q, P, ProjectID, Investee) => {
		// create transaction data untuk mengurangi saldo admin
		axios
			.post(`${apiURL}/transaction`, { debit: Q * P, credit: 0, Sender: "502aae43-40f4-4367-a973-1e47a5d18957", status: "TransferInvestee", project_id: ProjectID }, { headers: { Authorization: "Bearer " + user.token } })
			.then(() => {
				// create transaction data pencairan dana ke investee
				axios
					.post(`${apiURL}/transaction`, { debit: 0, credit: Q * P, Sender: Investee, status: "TransferInvestee", project_id: ProjectID }, { headers: { Authorization: "Bearer " + user.token } })
					.then(() => {
						// update status project
						axios
							.patch(`${apiURL}/projects/status/${ProjectID}`, { status: "running" }, { headers: { Authorization: "Bearer " + user.token } })
							.then(() => {
								setFetchTrigger(true);
							})
							.catch((err) => {
								setError(err.response.data.error);
								alert(Error);
							});
					})
					.catch((err) => {
						setError(err.response.data.error);
						alert(Error);
					});
			})
			.catch((err) => {
				setError(err.response.data.error);
				alert(Error);
			});
	};

	const handleInvestor = async (id) => {
		const investor = await axios.get(`${apiURL}/investor/${id}`, { headers: { Authorization: "Bearer " + user.token } });
		setInvestor(investor.data.data);
		setModalInvestor(true);
	};

	const handleInstallment = async (id, status) => {
		setCurrentProjectID(id);
		setProjectStatus(status);

		const investor = await axios.get(`${apiURL}/investor/${id}`, { headers: { Authorization: "Bearer " + user.token } });
		setInvestor(investor.data.data);

		const installment = await axios.get(`${apiURL}/installment/${id}`, { headers: { Authorization: "Bearer " + user.token } });
		setInstallments(installment.data.data);
		setModalShow(true);
	};
	// filter
	const handleChange = (event) => {
		console.log("event", event);

		let val = event.target.value;

		let data = projects.filter((item) => item.Status.includes(val));

		setPaginated(_(data).slice(0).take(pageSize).value());
	};

	return (
		<div style={{ backgroundColor: "GhostWhite" }}>
			<NavbarAdmin />
			<div style={{ display: "flex", flexDirection: "row" }}>
				<div style={{ width: "25vw", height: "auto" }}>
					<SidebarAdmin />
				</div>

				<div className="mt-5" style={{ display: "flex", flexDirection: "column", width: "auto", marginLeft: "5vw" }}>
					{/* <Link style={{ TextDecoder: "none", color: "black", marginLeft: "30vw" }} to="/">
						<h1 style={{ marginLeft: "91%" }}><i className="bi bi-house"></i></h1>
					</Link> */}
					<div className="shadow p-4" style={{ width: "90%", minHeight: "90vh", height: "auto", marginBottom: "5vh" }}>
						<div style={{ displaay: "flex", flexDirection: "row" }}>
							<h1>
								<i className="bi bi-building"></i> Semua Proyek{" "}
							</h1>
							<pre>
								<label for="status">Status : </label>
								<select id="status" name="status" onChange={handleChange}>
									<option style={{ color: "grey" }}>-status-</option>
									<option value="posted">Posted</option>
									<option value="running">Running</option>
									<option value="done">Done</option>
								</select>
							</pre>
						</div>
						<br />
						<div className="style-table" style={{ overflowX: "scroll" }}>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>No</th>
										<th>Project Name</th>
										<th>Due Date</th>
										<th>Duration</th>
										<th>Periode</th>
										<th>Margin</th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Sold</th>
										<th>Status</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{paginated.map((val, ind) => {
										return (
											<tr>
												<td>{(currentPage - 1) * 5 + (ind + 1)}</td>
												<td>{val.Name}</td>
												<td>{new Date(val.DueDate).toLocaleDateString()}</td>
												<td>{val.Duration}</td>
												<td>{val.Periode}</td>
												<td>{val.Margin}</td>
												<td>{formatter.format(val.Price)}</td>
												<td>{val.Quantity}</td>
												<td>{val.Sold}</td>
												<td>{val.Status}</td>
												<td>
													{val.Status === "pending" && (
														<Button
															onClick={() => {
																handlePost(val.ProjectID);
															}}
														>
															Post
														</Button>
													)}

													{val.Quantity === val.Sold && val.Status === "posted" && (
														<Button
															onClick={() => {
																handleRun(val.Quantity, val.Price, val.ProjectID, val.UserID);
															}}
															variant="success"
														>
															Run
														</Button>
													)}

													{(val.Status === "running" || val.Status === "done") && (
														<>
															<Button
																style={{ width: "80%", margin: "5%" }}
																onClick={() => {
																	handleInvestor(val.ProjectID);
																}}
																variant="success"
															>
																Investor
															</Button>
															<Button
																style={{ width: "80%" }}
																onClick={() => {
																	handleInstallment(val.ProjectID, val.Status);
																}}
																variant="warning"
															>
																Cicilan
															</Button>
														</>
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</div>
						<Nav className="d-flex justify-content-center" style={{ height: "10vw" }}>
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
			<InstallmentData show={modalShow} onHide={() => setModalShow(false)} investor={investor} installment={installments} projectID={currentProjectID} projectStatus={projectStatus} />

			<InvestorData
				show={modalInvestor}
				onHide={() => setModalInvestor(false)}
				investor={investor}
				trigger={() => {
					setFetchTrigger(true);
				}}
			/>
		</div>
	);
};
export default ProjectsDashboardAdmin;
