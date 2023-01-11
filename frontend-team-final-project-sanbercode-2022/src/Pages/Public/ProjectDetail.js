import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Carousel, Col, Container, Form, Image, ProgressBar, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import FooterComp from "../../Components/Footer/Footer";
import ConfirmOrder from "../../Components/Modal/confirmOrder";
import Unauthorized from "../../Components/Modal/unauthorized";
import NavbarComp from "../../Components/Navbar/Navbar";
import { UserContext } from "../../Context/UserContext";
import { apiURL } from "../../Helpers/API";
import formatter from "../../Helpers/Formatter";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import process from "../../Images/process.jpg";
import defaultProfpic from "../../Images/default-profile.png";

const ProjectDetail = () => {
	let navigate = useNavigate();
	let { id } = useParams();
	const [qty, setQty] = useState(0);

	const [user] = useContext(UserContext);
	const [data, setData] = useState([]);
	const [image, setImage] = useState([]);
	const [investee, setInvestee] = useState([]);
	const [someData, setSomeData] = useState([]);
	const [projectSold, setProjectSold] = useState();

	// state for confirm order in MODAL Component
	const [modalShow, setModalShow] = useState(false);
	const [unauthorizedShow, setUnauthorizedShow] = useState(false);
	const [messageHeader, setMessageHeader] = useState("");

	// State for order cart
	const [cartId, setCartId] = useState("");

	const [orderError, setOrderError] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const projectData = await axios.get(`${apiURL}/projects/${id}`);
			setData(projectData.data.data);
			setImage(projectData.data.data.images);
			setInvestee(projectData.data.data.user.UserProfile);

			const someProjects = await axios.get(`${apiURL}/projects/filter?limit=6&status=posted`);
			setSomeData(someProjects.data.data);

			const numberSold = await axios.get(`${apiURL}/projects/sold/${id}`);
			if (numberSold.data.data === null) {
				setProjectSold(0);
			} else {
				setProjectSold(numberSold.data.data[0].Sold);
			}

			if (user && user.role === "investor") {
				// mengambil semua data shopping cart
				const result = await axios.get(`${apiURL}/cart`, { headers: { Authorization: "Bearer " + user.token } });
				const arr = result.data.data;
				const output = arr.filter((val) => {
					return val.payment_status === "order";
				});
				setCartId(output[0].id);
			}
		};

		fetchData();
	}, [id, user]);

	return (
		<>
			<NavbarComp />

			<Container className="mt-5 mb-3" style={{ minHeight: "85vh" }}>
				<Row>
					<Col xs={9}>
						<h1 className="text-color">{data.name}</h1>
						<h6>
							<strong>{projectSold} unit</strong> telah didanai, sisa <strong>{data.quantity - projectSold} unit</strong> lagi
						</h6>
						<ProgressBar variant="success" now={(projectSold / data.quantity) * 100} />

						<Row className="mt-5 mb-5">
							<Col>
								<Row>
									<h4 className="text-color">Penerima pendanaan </h4>

									<Col xs={1} md={1} style={{ width: "8rem", height: "auto", overflow: "hidden" }}>
										{investee.profile_url ? (
											<Image className="img-thumbnail" src={investee.profile_url} style={{ objectFit: "cover", width: "auto" }} />
										) : (
											<Image className="img-thumbnail" src={defaultProfpic} style={{ objectFit: "cover", width: "auto" }} />
										)}
									</Col>

									<Col xs={8} md={8}>
										<h3>{investee.fullname}</h3>
										<p>
											<i className="bi bi-geo-alt-fill"></i> {investee.city}
										</p>
										<Button
											className="background-color"
											variant="success"
											onClick={() => {
												navigate(`/profile/${investee.id}`);
											}}
										>
											Lihat profil
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>

						<Row className="mt-3 mb-5">
							<Col>
								<h4 className="text-color">Margin</h4>
								<h4>{data.margin} % per tahun</h4>
							</Col>

							<Col>
								<h4 className="text-color">Durasi Kontrak</h4>
								<h4>{data.duration} bulan</h4>
							</Col>

							<Col>
								<h4 className="text-color">Periode Margin</h4>
								<h4>{data.periode} bulan</h4>
							</Col>
						</Row>

						<Row className="mt-3 mb-5">
							<h4 className="text-color">Deskripsi Proyek</h4>
							<p>{data.description}</p>
						</Row>
					</Col>

					<Col xs={3}>
						<Card className="shadow" style={{ width: "20rem", overflow: "hidden" }} bg="light">
							<Carousel style={{ height: "13rem" }}>
								{image.map((url, index) => {
									return (
										<Carousel.Item key={index} >
											<div style={{ width: "20rem", height: "28vh", overflow: "hidden" }}>
												{image.length > 0 && <Card.Img className="text-center" src={url.images_url} alt={index} key={index} style={{}} />}
												{image.length === 0 && <Card.Img className="text-center" src={process} alt={index} key={index} style={{}} />}
											</div>
										</Carousel.Item>
									);
								})}
							</Carousel>

							<Card.Body>
								<Card.Title>Pendanaan</Card.Title>

								<Row>
									<Col xs={6}>
										<Card.Text>Harga per unit</Card.Text>
										<Card.Text style={{ height: "3vh" }}>Jumlah unit</Card.Text>
										<Card.Text>Total pendanaan</Card.Text>
										<Card.Text>Pengembalian</Card.Text>
									</Col>

									<Col xs={6}>
										<Card.Text>{formatter.format(data.price)}</Card.Text>

										<Card.Text>
											<Form.Group style={{ display: "flex", height: "3vh" }}>
												<Row className="d-flex justify-content-start">
													<Col xs={4}>
														<Button
															className="background-color btn btn-default btn-number"
															variant="success"
															onClick={() => {
																if (qty > 0) {
																	setQty(qty - 1);
																}
															}}
														>
															-
														</Button>
													</Col>

													<Col xs={4} className="p-0">
														<Form.Control className="form-control input-number" style={{ width: "3.5vw" }} type="text" value={qty} readOnly />
													</Col>
													<Col xs={4}>
														<Button
															className="background-color btn btn-default btn-number"
															variant="success"
															onClick={() => {
																if (qty < data.quantity - projectSold) {
																	setQty(qty + 1);
																}
															}}
														>
															+
														</Button>
													</Col>
												</Row>
											</Form.Group>
										</Card.Text>
										<Card.Text>{formatter.format(data.price * qty)}</Card.Text>
										<Card.Text>{formatter.format((data.margin / 100) * data.price * qty + data.price * qty)}</Card.Text>
									</Col>
								</Row>
							</Card.Body>

							<br />

							{data.status === "posted" && (
								<Button
									onClick={() => {
										if (!user) {
											setMessageHeader("Anda belum login");
											setUnauthorizedShow(true);
										} else if (user.role !== "investor") {
											setMessageHeader("Anda bukan investor");
											setUnauthorizedShow(true);
										} else {
											if (qty > 0) {
												setModalShow(true);
											} else {
												setOrderError("Danai minimal 1 unit");
												setTimeout(() => {
													setOrderError();
												}, 2000);
											}
										}
									}}
									className="background-color"
									variant="success"
								>
									Danai Proyek
								</Button>
							)}
							{orderError !== undefined && <Alert>{orderError}</Alert>}
						</Card>
					</Col>
				</Row>

				<div className="margin-lrtb3">
					<h2 className="margin-lrtb3 text-color text-center">
						<Link to="/projects" className="text-color" variant="light" style={{ textDecoration: "none" }}>
							Proyek Pendanaan Lainnya
						</Link>
					</h2>

					<div>
						<Swiper slidesPerView={4} spaceBetween={30} freeMode={true} navigation={true} modules={[Navigation]} className="mySwiper">
							{someData.map((val, ind) => {
								return (
									<SwiperSlide key={ind}>
										<Col>
											<Card
												className="card-homepage"
												onClick={() => {
													setQty(0);
													navigate(`/project/detail/${val.ProjectID}`);
												}}
												variant="success"
											>
												{val.Images !== '' && <Card.Img variant="top" src={val.ImageURL} alt={ind} />}
												{val.Images === '' && <Card.Img variant="top" src={process} alt={ind} />}

												<Card.Body>
													<Card.Title className="text-truncate">{val.Name}</Card.Title>
													<Card.Text className="text-truncate">{val.Description}</Card.Text>
													<Card.Text>Margin : {val.Margin} % per tahun</Card.Text>
													<Card.Text>Kontrak : {val.Duration} bulan</Card.Text>
													<ProgressBar variant="success" now={val.Sold / val.Quantity * 100} key={ind} />
												</Card.Body>
											</Card>
										</Col>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
				</div>
			</Container>

			<ConfirmOrder show={modalShow} onHide={() => setModalShow(false)} price={data.price} quantity={qty} project_id={data.id} cart_id={cartId} />

			<Unauthorized show={unauthorizedShow} header={messageHeader} onHide={() => setUnauthorizedShow(false)} />

			<FooterComp />
		</>
	);
};

export default ProjectDetail;
