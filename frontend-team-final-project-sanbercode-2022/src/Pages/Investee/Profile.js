import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import SidebarInvestee from "./Sidebar";

import defaultProfile from "../../Images/default-profile.png";

import { apiURL } from "../../Helpers/API";
import NavbarInvestee from "../../Components/Navbar/NavbarInvestee";

const InvesteeProfile = () => {
	const [user] = useContext(UserContext);
	const [profile, setProfile] = useState({});

	let navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const project = await axios.get(`${apiURL}/userProfile`, { headers: { Authorization: "Bearer " + user.token } });
			const result = project.data.data;
			setProfile(result);
		};
		fetchData();
	}, [user.token]);
	console.log(profile);
	return (
		<>
			<div>
				<NavbarInvestee />

				<div className="flex-top ">
					<Col md={3} className=" d-none d-md-block">
						<SidebarInvestee />
					</Col>
					<Col>
						<div className="investee-container mt-2 p-5 text-color">
							<h2>
								<i className="bi bi-person-lines-fill"></i> Profil Saya{" "}
							</h2>
							<div className="image-profile-container border-color mt-4 mb-4 p-3">
								{profile.profile_url === "" && <img src={defaultProfile} alt="investee-profiles" />}
								{profile.profile_url !== "" && <img src={profile.profile_url} alt="investee-profiles" />}
							</div>

							<h4>Informasi Pribadi </h4>
							<div className="border-color mt-4">
								<Table>
									<thead>
										<tr>
											<th>Nama Lengkap </th>
											<td>{profile.fullname}</td>
										</tr>
										<tr>
											<th>Jenis Kelamin </th>
											<td>{profile.gender === "male" ? "Laki - laki" : profile.gender === "female" ? "Perempuan" : "-"}</td>
										</tr>
										<tr>
											<th>Nomor Telepon </th>
											<td>{profile.phone}</td>
										</tr>
										<tr>
											<th>KTP </th>
											<td>{profile.ktp}</td>
										</tr>
									</thead>
								</Table>
							</div>
							<br />
							<h4>Alamat </h4>
							<div className="border-color mt-4">
								<Table>
									<thead>
										<tr>
											<th>Alamat Lengkap </th>
											<td>{profile.address}</td>
										</tr>
										<tr>
											<th>Kota </th>
											<td>{profile.city}</td>
										</tr>
										<tr>
											<th>Provinsi </th>
											<td>{profile.province}</td>
										</tr>
									</thead>
								</Table>
							</div>
							<br />
							<h4>Informasi Bank</h4>
							<div className="border-color mt-4">
								<Table>
									<thead>
										<tr>
											<th>Nama Bank </th>
											<td>{profile.bank_name}</td>
										</tr>
										<tr>
											<th>Nomor Rekening</th>
											<td>{profile.bank_account_number}</td>
										</tr>
									</thead>
								</Table>
							</div>
							<br />
							<Button
								onClick={() => {
									navigate("/investee/dashboard/profile/form");
								}}
								variant="success"
							>
								Edit Profil
							</Button>
						</div>
					</Col>
				</div>
			</div>
		</>
	);
};

export default InvesteeProfile;
