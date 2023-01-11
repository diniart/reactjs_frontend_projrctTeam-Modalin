import "../../Style/search.css";

import React from "react";
import NavbarComp from "../../Components/Navbar/Navbar";
import FooterComp from "../../Components/Footer/Footer";
import image from "../../Images/yes.png";
import process from "../../Images/process.jpg";
import { useState, useEffect } from "react";
import { ButtonGroup, ToggleButton, Card, Row, Col, Button, ProgressBar } from "react-bootstrap";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { apiURL } from "../../Helpers/API";

const Project = () => {
	const [data, setData] = useState([]);
	const [fetchTriger, setFetchTriger] = useState(true);
	let navigate = useNavigate();
	const [cardLimit, setCardLimit] = useState(8);
	const [status, setStatus] = useState("posted");
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`${apiURL}/projects/filter?limit=${cardLimit}&status=${status}&keyword=${keyword}`);
			setData(
				result.data.data.map((x) => {
					return { ...x, key: x.id };
				})
			);
		};

		if (fetchTriger) {
			fetchData();
			setFetchTriger(false);
		}
	}, [fetchTriger, cardLimit, keyword, status]);

	const handleAction = (id) => {
		axios.get(`${apiURL}/${id}`);
		navigate(`/project/detail/${id}`);
	};

	const handleChange = (event) => {
		let val = event.target.value.toLowerCase();
		setKeyword(val);
		setFetchTriger(true);
	};
	return (
		<>
			<NavbarComp />
			<div className="margin-lrtb3" style={{ backgroundColor: "white", height: "auto", marginRight: "69px", marginLeft: "69px" }}>
				<br />
				<br />
				<Row style={{ backgroundColor: "white", paddingBottom: "5vw", paddingLeft: "20px", display: "flex", flexDirection: "row" }}>
					{/* kiri */}
					<Col md={5} sm={12} style={{ backgroundColor: "white" }}>
						<h1 style={{ fontWeight: "bold", fontSize: "50spx" }}>Proyek Pendanaan</h1>
						<div style={{ width: "85%" }}>
							<p style={{ fontSize: "19px" }}>Setiap proyek yang Anda danai turut memberikan manfaat bagi peningkatan kesejahteraan pelaku wirausaha.</p>
							<br />
							<br />
							<div style={{ display: "flex", flexDirection: "row" }}>
								<p style={{ fontSize: "16px" }}>
									&#10004;Pendanaan Berasuransi
									<br />
									<br />
									&#10004;Pemberdayaan Wirausaha
								</p>
								<p style={{ fontSize: "16px", marginLeft: "20px" }}>
									&#10004;Kemajuan UMKM
									<br />
									<br />
									&#10004;Berdampak Lingkungan
								</p>
							</div>
						</div>
					</Col>
					<br />
					{/* kanan */}

					<Col md={5} sm={12} style={{ backgroundColor: "white", marginLeft: "20px" }}>
						<img style={{ width: "100%", height: "400px", objectFit: 'contain' }} src={image} alt="foto-umkm" />
					</Col>
				</Row>
				{/* isi */}
				<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
					<div>
						<ButtonGroup>
							<ToggleButton
								style={{ marginRight: "25px" }}
								variant="outline-success"
								onClick={() => {
									setStatus("posted");
									setCardLimit(8)
									setFetchTriger(true);
								}}
							>
								Proyek tersedia
							</ToggleButton>

							<ToggleButton
								style={{ marginRight: "25px" }}
								variant="outline-success"
								onClick={() => {
									setStatus("running");
									setCardLimit(8)
									setFetchTriger(true);
								}}
							>
								Sedang berjalan
							</ToggleButton>

							<ToggleButton
								style={{ marginRight: "25px" }}
								variant="outline-success"
								onClick={() => {
									setStatus("done");
									setCardLimit(8)
									setFetchTriger(true);
								}}
							>
								Selesai
							</ToggleButton>
						</ButtonGroup>
					</div>

					<div>
						<form className="search">
							<input type="text" className="searchTerm" placeholder="Search.." onChange={handleChange} value={keyword} />
							<button className="searchButton" disabled>
								<i className="fa fa-search"></i>
							</button>
						</form>
					</div>
				</div>
			</div>

			<div style={{ margin: "50px" }}>
				<Row xs={1} md={4} className="g-4">
					{data.map((val, ind) => {
						return (
							<Col key={ind} className="col-sm-6 col-md-4 col-lg-3">
								<Card className="card-homepage" onClick={() => handleAction(val.ProjectID)}>
									{val.Images !== '' && <Card.Img variant="top" src={val.ImageURL} alt={ind} />}
									{val.Images === '' && <Card.Img variant="top" src={process} alt={ind} />}
									<Card.Body style={{ paddingBottom: "0px" }}>
										<Card.Title className="text-truncate">{val.Name}</Card.Title>
										<Card.Text className="text-truncate" style={{ fontSize: "12px" }}>
											{val.Description}
										</Card.Text>
										<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
											<Card.Text>
												<p style={{ color: "grey" }}> Margin</p>
												<br />
												<p style={{ fontWeight: "bold" }}>{val.Margin} % Per tahun</p>
											</Card.Text>
											<Card.Text>
												<p style={{ color: "grey" }}> Durasi kontrak</p>
												<br />
												<p style={{ fontWeight: "bold" }}>{val.Duration} bulan </p>
											</Card.Text>
										</div>
										<ProgressBar variant="success" now={val.Sold / val.Quantity * 100} key={1} />
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</div>

			<div className="margin-lrtb3 flex-center">
				<Button
					className="button-width background-color"
					variant="success"
					type="submit"
					onClick={() => {
						setCardLimit(cardLimit + 8);
						setFetchTriger(true);
					}}
				>
					Lihat lebih banyak
				</Button>
			</div>

			<FooterComp />
		</>
	);
};
export default Project;
