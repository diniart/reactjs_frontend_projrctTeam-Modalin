import { Col, Container, Image, Row } from "react-bootstrap";
import NavbarComp from "../../Components/Navbar/Navbar";
import invest from "../../Images/invest1.gif"

const About = () => {
	return (
		<>
			<NavbarComp />
			<Container className="mt-5 mb-5 pb-5">
				<Row className="mt-5">
					<Col xs={2}>
						<Row></Row>
						<Row>
							<div className="border-color border-light shadow box-width-15 m-md-3 m-1 padding-lrtb1">
								<h5 className="text-color text-center">Rata-rata Margin</h5>
								<h6 className="text-center">18%</h6>
							</div>
						</Row>

						<Row>
							<div className="border-color border-light shadow box-width-15 m-md-3 m-1 padding-lrtb1">
								<h5 className="text-color text-center">Total Pendanaan</h5>
								<h6 className="text-center">Rp. 1.000.000.000</h6>
							</div>
						</Row>

						<Row>
							<div className="border-color border-light shadow box-width-15 m-md-3 m-1 padding-lrtb1">
								<h5 className="text-color text-center">Dana Tersalurkan</h5>
								<h6 className="text-center">Rp. 900.000.000</h6>
							</div>
						</Row>

						<Row>
							<div className="border-color border-light shadow box-width-15 m-md-3 m-1 padding-lrtb1">
								<h5 className="text-color text-center">Total Biaya</h5>
								<h6 className="text-center">3%</h6>
							</div>
						</Row>

						<Row>
							<div className="border-color border-light shadow box-width-15 m-md-3 m-1 padding-lrtb1">
								<h5 className="text-color text-center">Penerima Dana</h5>
								<h6 className="text-center">200 umkm</h6>
							</div>
						</Row>

						<Row>
							<div className="border-color border-light shadow box-width-15 m-md-3 m-1 padding-lrtb1">
								<h5 className="text-color text-center">Investor</h5>
								<h6 className="text-center">100 investor</h6>
							</div>
						</Row>
					</Col>

					<Col xs={1}></Col>

					<Col xs={9} className="mt-1 shadow pt-2 px-5">
						<Row>
							<h1 className="text-color text-center">Tentang kami</h1>
						</Row>

						<Row className="mt-4">
							<p>
								Modal.in menghubungkan pemilik modal (investor) dengan pengusaha yang membutuhkan modal (investee) untuk menjalankan proyeknya. Modal.in dibuat untuk memberikan akses ke UMKM yang selama ini mengalami kesulitan akses
								permodalan.
							</p>
							<p>Investee dapat mendaftarkan proyeknya untuk dapat ditawarkan ke investor setelah melalui serangkaian verifikasi. Di lain sisi, Investor dapat memilih berbagai pilihan proyek yang ditawarkan oleh para pelaku usaha (investee) dengan imbal hasil yang menarik.</p>
							<p>Dengan ekosistem yang kami kembangkan, diharapkan masyarakat dapat saling bekerjasama dalam memajukan perekonomian nasional, saling mendukung satu sama lain, meningkatkan kerjasama dan hubungan baik dalam berwirausaha serta meningkatkan kekuatan bisnis di sektor UMKM.    </p>
						</Row>
						<br />
						<Row>
							<Image className="mb-5" style={{ maxHeight: "30vh", overflow: "hidden", objectFit: "cover" }} src={invest}></Image>
						</Row>
					</Col>
				</Row>
			</Container>

			<div className="footer-about footer flex-center background-color text-white pt-3">
				<h6>Copyright @ Modal .In 2022</h6>
			</div>
		</>
	);
};

export default About;
