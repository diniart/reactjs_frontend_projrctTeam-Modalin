import SidebarAdmin from "./sidebarAdmin";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { apiURL } from "../../Helpers/API";
import { Button, Table } from "react-bootstrap";
import formatter from "../../Helpers/Formatter";
import DisbursementAdmin from "../../Components/Modal/DisbursementAdmin";
import NavbarAdmin from "../../Components/Navbar/NavbarAdmin";

const DisbursementRequest = () => {
	const [user] = useContext(UserContext);
	const [arr, setArr] = useState([]);
	const [fetchTrigger, setFetchTrigger] = useState(true);
	const [modalProsesPencairan, setModalProsesPencairan] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const transaction = await axios.get(`${apiURL}/transaction/filter?status=ProsesPencairan`, { headers: { Authorization: "Bearer " + user.token } });
			setArr(transaction.data.data);
		};
		if (fetchTrigger) {
			fetchData();
			setFetchTrigger(false);
		}
	}, [fetchTrigger, user.token]);

	const handleAccept = (val) => {
		setData(val);
		setModalProsesPencairan(true);
	};

	return (
		<div style={{ backgroundColor: "GhostWhite" }}>
			<NavbarAdmin />
			<div style={{ display: "flex", flexDirection: "row" }}>
				<div style={{ width: "25vw", height: "auto" }}>
					<SidebarAdmin />
				</div>

				<div className="mt-5" style={{ display: "flex", flexDirection: "column", width: "75%" }}>
					{/* <Link style={{ TextDecoder: "none", color: "black", marginLeft: "30vw" }} to="/"><h1 style={{ marginLeft: "91%" }}><i className="bi bi-house"></i></h1></Link> */}
					<div className="shadow p-4" style={{ width: "90%", minHeight: "90vh", height: "auto", marginBottom: "5vh" }}>
						<h1>
							<i className="bi bi-box-arrow-left"></i> Permintaan Pencairan Dana
						</h1>
						<div className="style-table mt-5">
							<Table striped bordered hover responsive>
								<thead>
									<tr>
										<th>No</th>
										<th>Debit</th>
										<th>Credit</th>
										<th>Status</th>
										<th>Date</th>
										<th>Tindakan</th>
									</tr>
								</thead>
								<tbody>
									{arr.length === 0 && (
										<td colSpan={6}>
											<h3 className="m-5">Belum Ada Permintaan Pencairan Dana Dari User</h3>
										</td>
									)}
									{arr.map((val, ind) => {
										var date = val.updated_at;
										var newDate = new Date(date).toLocaleDateString();
										return (
											<tr>
												<td>{ind + 1}</td>
												<td>{formatter.format(val.debit)}</td>
												<td>{formatter.format(val.credit)}</td>
												<td>{val.status}</td>
												<td>{newDate}</td>
												<td>
													{val.status === "ProsesPencairan" && (
														<>
															<Button
																onClick={() => {
																	handleAccept(val);
																}}
																variant="success"
																className="me-3"
															>
																Proses
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
					</div>
				</div>
			</div>
			<DisbursementAdmin show={modalProsesPencairan} onHide={() => setModalProsesPencairan(false)} data={data} />
		</div>
	);
};
export default DisbursementRequest;
