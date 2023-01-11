import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import FooterComp from "../../Components/Footer/Footer";
import NavbarComp from "../../Components/Navbar/Navbar";
import { apiURL } from "../../Helpers/API";
import defaultProfpic from "../../Images/default-profile.png";

const PublicProfile = () => {
	let { id } = useParams();
	let navigate = useNavigate();
	const [data, setData] = useState([]);
	const [projectData, setProjectData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`${apiURL}/userProfile/${id}`);
			setData(result.data.data);

			const resultProject = await axios.get(`${apiURL}/projects/investee/${id}`);
			setProjectData(resultProject.data.data);
		};
		fetchData();
	}, [id]);

	const firstName = (name) => {
		if (name !== undefined) {
			let nameArr = name.split(" ");
			return nameArr[0];
		}
	};

	console.log("profile", data);
	console.log("project", projectData);
	console.log("jumlah proyek", projectData.length);

	return (
		<>
			<NavbarComp />

			<Container className="p-5">
				<Row className="shadow p-3">
					<Col xs={2}>
						<div style={{ width: "10vw", height: "20vh", overflow: "hidden" }}>
							{data.profile_url ? <Image className="img-thumbnail" src={data.profile_url} style={{ objectFit: "cover" }} /> : <Image className="img-thumbnail" src={defaultProfpic} style={{ objectFit: "cover" }} />}
						</div>
					</Col>

					<Col xs={10}>
						<h3>{data.fullname}</h3>
						<p>
							<i className="bi bi-geo-alt-fill"></i> {data.city}, {data.province}
						</p>
					</Col>
				</Row>

				<Row className="shadow p-5">
					<h3 className="text-color">
						{firstName(data.fullname)} memiliki {projectData.length} Proyek
					</h3>
					{projectData.map((val, ind) => {
						return (
							<Col className="mt-3" md={4} sm={1}>
								<Card
									className="card-homepage"
									onClick={() => {
										navigate(`/project/detail/${val.id}`);
									}}
								>
									<Card.Img variant="top" src={val.images[0].images_url} alt={ind} />
									<Card.Body>
										<Card.Title className="text-truncate">{val.name}</Card.Title>
										<Card.Text className="text-truncate">{val.description}</Card.Text>
										<Card.Text>Margin : {val.margin} % per tahun</Card.Text>
										<Card.Text>Kontrak : {val.duration} bulan</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>

			<FooterComp />
		</>
	);
};

export default PublicProfile;
