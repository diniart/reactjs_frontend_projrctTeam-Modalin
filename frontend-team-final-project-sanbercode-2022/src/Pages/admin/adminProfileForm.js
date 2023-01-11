import SidebarAdmin from "./sidebarAdmin";
import { Button, Form, Alert, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { apiURL } from "../../Helpers/API";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Helpers/firebase";
import { v4 } from "uuid";
import NavbarAdmin from "../../Components/Navbar/NavbarAdmin";

const AdminProfileForm = () => {
	const initialInput = { fullname: "", phone: "", ktp: 0, address: "", city: "", province: "", gender: "", profile_url: "" };
	const [user] = useContext(UserContext);
	const [input, setInput] = useState(initialInput);
	const [error, setError] = useState();

	let navigate = useNavigate();

	// image upload state
	const [image, setImage] = useState("");
	const [percent, setPercent] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const project = await axios.get(`${apiURL}/userProfile`, { headers: { Authorization: "Bearer " + user.token } });
			let { fullname, phone, ktp, address, city, province, gender, profile_url } = project.data.data;
			setInput({ fullname, phone, ktp, address, city, province, gender, profile_url });
		};
		fetchData();
	}, [user.token]);

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(input);
		axios
			.patch(`${apiURL}/userProfile`, input, { headers: { Authorization: "Bearer " + user.token } })
			.then((res) => {
				navigate("/admin/dashboard/profile");
				setInput(initialInput);
			})
			.catch((err) => {
				setError(err.response.data.error);
			});
	};

	const handleChange = (event) => {
		let value = event.target.value;
		let name = event.target.name;
		if (name === "ktp") {
			value = parseInt(value);
		}
		setInput({ ...input, [name]: value });
	};

	const handleImage = (event) => {
		setImage(event.target.files[0]);
	};

	const handleUpload = () => {
		if (!image) {
			alert("please upload an image first");
			return;
		} else {
			const imageRef = ref(storage, `modalin/${image.name + v4()}`);
			const uploadTask = uploadBytesResumable(imageRef, image);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					// update progress
					setPercent(percent);
				},
				(err) => console.log(err),

				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setInput({ ...input, profile_url: downloadURL });
					});
				}
			);
		}
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
						<h1 style={{ marginLeft: "1vh", marginTop: "1vw" }}>
							<i className="bi bi-person"></i> Form Profile Saya
						</h1>
						<div className="shadow" style={{ marginLeft: "1vh", marginTop: "3vw", width: "95%", backgroundColor: "white", height: "auto", paddingTop: "2vw", paddingBottom: "2vw" }}>
							<div className="form-project m-4">
								{error !== undefined && (
									<Alert key="danger" variant="danger">
										{error}
									</Alert>
								)}
								<Form>
									<Form.Group className="mb-4">
										<Form.Label>Nama Lengkap</Form.Label>
										<Form.Control style={{ width: "95%" }} name="fullname" value={input.fullname} onChange={handleChange} type="text" placeholder="Masukkan nama lengkap anda" />
									</Form.Group>

									<Form.Group className="mb-4">
										<Form.Label>Nomor Telepon</Form.Label>
										<Form.Control style={{ width: "95%" }} name="phone" value={input.phone} onChange={handleChange} type="text" placeholder="Masukkan nomor telepon anda" />
									</Form.Group>

									<Form.Group className="mb-4">
										<Form.Label>Nomor KTP</Form.Label>
										<Form.Control style={{ width: "95%" }} name="ktp" value={input.ktp} onChange={handleChange} type="number" placeholder="Masukkan nomor ktp elektronik" />
									</Form.Group>

									<Form.Group className="mb-4">
										<Form.Label>Alamat Lengkap</Form.Label>
										<Form.Control style={{ width: "95%" }} name="address" value={input.address} onChange={handleChange} type="text" placeholder="Masukkan alamat lengkap anda" />
									</Form.Group>

									<Form.Group className="mb-4">
										<Form.Label>Kota</Form.Label>
										<Form.Control style={{ width: "95%" }} name="city" value={input.city} onChange={handleChange} type="text" placeholder="Masukkan nama kota" />
									</Form.Group>

									<Form.Group className="mb-4">
										<Form.Label>Provinsi</Form.Label>
										<Form.Control style={{ width: "95%" }} name="province" value={input.province} onChange={handleChange} type="text" placeholder="Masukkan nama provinsi" />
									</Form.Group>

									<Form.Group className="mb-3">
										<Form.Label>Jenis Kelamin</Form.Label>
										<Form.Check type="radio" name="gender" onChange={handleChange} value="male" label="Laki - laki" />
										<Form.Check type="radio" name="gender" onChange={handleChange} value="female" label="Perempuan" />
									</Form.Group>

									<Form>
										<Form.Group className="mb-4">
											<Form.Label>Foto Profil :</Form.Label>

											{percent < 100 && percent > 0 && (
												<Alert key="warning" variant="warning">
													Mohon Tunggu Proses Upload
												</Alert>
											)}
											{percent === 100 && (
												<Alert key="success" variant="success">
													Upload berhasil
												</Alert>
											)}
											<div className="m-3">
												<input type="file" onChange={handleImage} />
											</div>
											<Button className="mx-3" onClick={handleUpload} variant="success">
												Upload
											</Button>
										</Form.Group>
									</Form>

									<Button onClick={handleSubmit} variant="success">
										Update Profile
									</Button>
									<br />
									<br />
									<Button
										onClick={() => {
											navigate("/admin/dashboard/profile");
											setInput(initialInput);
										}}
										variant="warning"
									>
										Cancel
									</Button>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AdminProfileForm;
