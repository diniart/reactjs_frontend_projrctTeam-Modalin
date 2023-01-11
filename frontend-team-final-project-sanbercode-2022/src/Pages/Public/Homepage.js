import "../../Style/homepage.css";

import CarouselComp from "../../Components/Carousel/carousel";
import FooterComp from "../../Components/Footer/Footer";
import NavbarComp from "../../Components/Navbar/Navbar";

import process from "../../Images/process.jpg";

import { Button, Card, Col, ProgressBar, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../../Helpers/API";

const Homepage = () => {
	const [someProject, setSomeProject] = useState([]);

	let navigate = useNavigate();
	let margin = 0;
	useEffect(() => {
		const fetchData = async () => {
			const project = await axios.get(`${apiURL}/projects/filter?limit=4&status=posted`);
			const result = project.data.data;
			setSomeProject(result);
		};
		fetchData();
	}, []);

	// TODO invalid margin (should be from all projects)
	someProject.map((val) => {
		return (margin += val.Margin);
	});

	return (
		<>
			<NavbarComp />
			<CarouselComp />
			<div className="text-box-container text-center mt-md-5 mb-md-5 mt-1 mb-1">
				<div className="border-color box-width-25 m-md-3 m-1 padding-lrtb1">
					<h3 className="text-color">Rata-rata Margin</h3>
					{/* TODO margin should be from all projects */}
					<h5>{margin / someProject.length}%</h5>
				</div>
				<div className="border-color box-width-25 m-md-3 m-1 padding-lrtb1">
					<h3 className="text-color">Total Pendanaan</h3>
					{/* TODO currently displaying static data  */}
					<h5>Rp. 1.000.000.000</h5>
				</div>
				<div className="border-color box-width-25 m-md-3 m-1 padding-lrtb1">
					<h3 className="text-color">Dana Tersalurkan</h3>
					{/* TODO currently displaying static data  */}
					<h5>Rp. 900.000.000</h5>
				</div>
				<div className="border-color box-width-25 m-md-3 m-1 padding-lrtb1">
					<h3 className="text-color">Total Biaya</h3>
					{/* TODO currently displaying static data  */}
					<h5>5%</h5>
				</div>
				<div className="border-color box-width-25 m-md-3 m-1 padding-lrtb1">
					<h3 className="text-color">Penerima Dana</h3>
					{/* TODO currently displaying static data  */}
					<h5>20 UMKM</h5>
				</div>
				<div className="border-color box-width-25 m-md-3 m-1 padding-lrtb1">
					<h3 className="text-color">Investor</h3>
					{/* TODO currently displaying static data  */}
					<h5>100 investor</h5>
				</div>
			</div>

			<div className="about-homepage">
				<h2 className="mb-sm-5 mb-3 text-color">Tentang Modal.in</h2>
				<p>
					Modal .In adalah platform peer to peer Lending yang diperuntukkan bagi Usaha Mikro Kecil dan Menengah (UMKM) yang tersebar di berbagai wilayah di Indonesia. Kami menghubungkan para pelaku usaha dengan orang - orang yang memiliki
					dana berlebih dan ingin berinvestasi di sektor riil. Mengedepankan prinsip akuntabilitas, transparansi dan keterbukaan dengan pihak - pihak yang terlibat.
				</p>
			</div>

			<div className="margin-lrtb3">
				<h2 className="margin-lrtb3 text-color text-center">Cara Kerja Modal.in</h2>
				<div className="process">
					<div className="image-container">
						<img src={process} alt="process" />
					</div>
					<div className="process-detail">
						<h5>1. Daftar akun Modal.in</h5>
						<p> Lakukan registrasi akun di platform Modal.in</p>

						<h5>2. Pilih Proyek Pendanaan</h5>
						<p>Modal.in akan meluncurkan proyek terpilih dalam bentuk unit pendanaan untuk mengumpulkan dana proyek.</p>
						<h5>3. Penyaluran Dana</h5>
						<p>Setelah target pendanaan proyek terkumpul, pendanaan akan disalurkan secara bertahap sesuai dengan kebutuhan proyek tersebut.</p>

						<h5>4. Pantau Perkembangannya</h5>
						<p>Modal.in menyampaikan laporan perkembangan proyek, berupa foto dan detail proyek, secara berkala kepada para pemberi pendanaan.</p>

						<h5>5. Dapatkan keuntungan dari hasil usaha</h5>
						<p>Pemberi pendanaan akan menerima pembagian margin sesuai dengan periode masing-masing proyek.</p>
					</div>
				</div>
			</div>
			<div className="margin-lrtb3">
				<h2 className="margin-lrtb3 text-color text-center">Proyek Pendanaan Terbaru</h2>
				<div className="process flex-evenly">
					<Row xs={1} md={4} className="g-4">
						{someProject.map((val, ind) => {
							return (
								<Col className="col-sm-6 col-md-4 col-lg-3">
									<Card
										className="card-homepage"
										onClick={() => {
											navigate(`/project/detail/${val.ProjectID}`);
										}}
									>
										{val.Images !== '' && <Card.Img variant="top" src={val.ImageURL} alt={ind} />}
										{val.Images === '' && <Card.Img variant="top" src={process} alt={ind} />}
										<Card.Body>
											<Card.Title className="text-truncate">{val.Name}</Card.Title>
											<Card.Text>{val.Description.substring(0, 35)}...</Card.Text>
											<Card.Text className="flex-between mb-0">
												<p>Margin</p>
												<p>Kontrak</p>
											</Card.Text>
											<Card.Text className="flex-between mb-0">
												<p>{val.Margin} % per tahun</p>
												<p>{val.Duration} bulan</p>
											</Card.Text>
											<ProgressBar variant="success" now={val.Sold / val.Quantity * 100} key={1} />
										</Card.Body>
									</Card>
								</Col>
							);
						})}
					</Row>
				</div>
			</div>
			<div className="margin-lrtb3 flex-center">
				<Button
					onClick={() => {
						navigate("/projects");
					}}
					className="button-width background-color"
					variant="success"
					type="submit"
				>
					Lihat Proyek Lainnya
				</Button>
			</div>

			<FooterComp />
		</>
	);
};

export default Homepage;
