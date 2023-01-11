import SidebarAdmin from "./sidebarAdmin";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { apiURL } from "../../Helpers/API";
import { Table } from "react-bootstrap";
import formatter from "../../Helpers/Formatter";
import _ from "lodash";
import { Nav } from "react-bootstrap";
import NavbarAdmin from "../../Components/Navbar/NavbarAdmin";

const TransactionAdmin = () => {
	const [user] = useContext(UserContext);
	const [arr, setArr] = useState([]);

	// pagination
	const [paginated, setPaginated] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const pageSize = 10;
	const pageCount = Math.ceil(arr.length / pageSize);
	const pages = _.range(1, pageCount + 1);

	useEffect(() => {
		const fetchData = async () => {
			const transaction = await axios.get(`${apiURL}/transaction`, { headers: { Authorization: "Bearer " + user.token } });
			setArr(transaction.data.data);
			setPaginated(_(transaction.data.data).slice(0).take(pageSize).value());
		};
		fetchData();
	}, [user.token]);

	let credits = 0;
	let debits = 0;

	for (let i = 0; i <= arr.length - 1; i++) {
		credits += arr[i].credit;
		debits += arr[i].debit;
	}

	const pagination = (pageNo) => {
		setCurrentPage(pageNo);
		const startIndex = (pageNo - 1) * pageSize;
		const paginated = _(arr).slice(startIndex).take(pageSize).value();
		setPaginated(paginated);
	};
	return (
		<div style={{ backgroundColor: "GhostWhite" }}>
			<NavbarAdmin />
			<div style={{ display: "flex", flexDirection: "row" }}>
				<div style={{ width: "25vw", height: "auto" }}>
					<SidebarAdmin />
				</div>

				<div className="mt-5" style={{ display: "flex", flexDirection: "column", width: "75%" }}>
					{/* <Link style={{ TextDecoder: "none", color: "black", marginLeft: "30vw" }} to="/">
						<h1 style={{ marginLeft: "91%" }}>
							<i className="bi bi-house"></i>
						</h1>
					</Link> */}
					<div className="shadow p-4" style={{ width: "90%", minHeight: "90vh", height: "auto", marginBottom: "5vh" }}>
						<h1>
							<i className="bi bi-cash-coin"></i> Informasi Keuangan{" "}
						</h1>
						<br />
						<div className="flex-evenly">
							<div className="border-color border-light shadow p-4">
								<h5>Saldo : {formatter.format(credits - debits)} </h5>
							</div>
							<div className="border-color border-light shadow p-4">
								<h5>Total Credit : {formatter.format(credits)} </h5>
							</div>
							<div className="border-color border-light shadow p-4">
								<h5>Total Debit : {formatter.format(debits)}</h5>
							</div>
						</div>
						<br />
						<h3>Riwayat Transaksi :</h3>
						<div className="style-table">
							<Table striped bordered hover responsive>
								<thead>
									<tr>
										<th>No</th>
										<th>Debit</th>
										<th>Credit</th>
										<th>Status</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody>
									{paginated.map((val, ind) => {
										var date = val.updated_at;
										var newDate = new Date(date).toLocaleDateString();
										return (
											<tr>
												<td>{(currentPage - 1) * 5 + (ind + 1)}</td>
												{/* <td>{ind + 1}</td> */}
												<td>{formatter.format(val.debit)}</td>
												<td>{formatter.format(val.credit)}</td>
												<td>{val.status}</td>
												<td>{newDate}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
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
export default TransactionAdmin;
