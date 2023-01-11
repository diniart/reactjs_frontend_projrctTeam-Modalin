import "../../Style/dashboardInvestee.css";

import { useContext, useEffect, useState } from "react";
import { Alert, Button, Form, Table, CloseButton, Row, Col, Accordion } from "react-bootstrap";
import { UserContext } from "../../Context/UserContext";

import SidebarInvestee from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { apiURL } from "../../Helpers/API";
// image upload import
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Helpers/firebase";
import { v4 } from "uuid";
import formatter from "../../Helpers/Formatter";
import NavbarInvestee from "../../Components/Navbar/NavbarInvestee";

const AllProjectInvestee = () => {
    const [user] = useContext(UserContext);
    const [project, setProject] = useState([]);
    const [error, setError] = useState();
    const [fetchTrigger, setFetchTrigger] = useState(true);
    const [image, setImage] = useState("");
    const [percent, setPercent] = useState(0);

    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const project = await axios.get(`${apiURL}/investee/projects`, { headers: { Authorization: "Bearer " + user.token } });
            const result = project.data.data;
            setProject(result);
        };
        if (fetchTrigger) {
            fetchData();
            setFetchTrigger(false);
        }
    }, [user.token, fetchTrigger]);

    const handleImage = (event) => {
        setImage(event.target.files[0]);
    };

    const handleUpload = (param) => {
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
                        axios
                            .post(`${apiURL}/images`, { images_url: downloadURL, projects_id: param }, { headers: { Authorization: "Bearer " + user.token } })
                            .then((res) => {
                                setImage("");
                                setPercent(0);

                                setFetchTrigger(true);
                            })
                            .catch((err) => {
                                setError(err.response.data.error);
                            });
                    });
                }
            );
        }
    };

    const handleDelete = (id) => {
        axios.delete(`${apiURL}/images/${id}`, { headers: { Authorization: "Bearer " + user.token } }).then(() => {
            setFetchTrigger(true);
        });
    };
    return (
        <div>
            <NavbarInvestee />

            {/* <Container fluid> */}
            <div className="row">
                <Col md={3} className=" d-none d-md-block">
                    <SidebarInvestee />
                </Col>

                <Col>
                    <div className="mt-2 p-3 text-color container">
                        <h3 className="mb-5">
                            <i className="bi bi-building"></i> Semua Proyek
                        </h3>
                        {error !== undefined && (
                            <Alert key="danger" variant="danger">
                                {error}
                            </Alert>
                        )}

                        <Table striped hover responsive>
                            <thead>
                                <tr className="text-center">
                                    <td className="align-middle">#</td>
                                    <td className="align-middle">Nama Proyek</td>
                                    <td className="align-middle">Durasi</td>
                                    <td className="align-middle">Margin</td>
                                    <td className="align-middle">Periode</td>
                                    <td className="align-middle">Jumlah Unit</td>
                                    <td className="align-middle">Harga per Unit (Rp.)</td>
                                    <td className="align-middle">Status</td>
                                    <td className="align-middle">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {project.map((val, ind) => {
                                    return (
                                        <>
                                            <tr>
                                                <td className="align-middle">{ind + 1}</td>
                                                <td className="align-middle" xs={3}>
                                                    {val.name}
                                                </td>
                                                <td className="text-center align-middle ">{val.duration} bulan</td>
                                                <td className="text-center align-middle ">{val.margin} %</td>
                                                <td className="text-center align-middle">{val.periode} bulan</td>
                                                <td className="text-center align-middle">{val.quantity} unit</td>
                                                <td className="text-center align-middle">{formatter.format(val.price)}</td>
                                                <td className="text-center align-middle">{val.status}</td>
                                                <td className="text-center align-middle">
                                                    {val.status === "pending" && (
                                                        <Button
                                                            variant="success"
                                                            onClick={() => {
                                                                navigate(`/investee/dashboard/project/${val.id}/form`);
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                    )}
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={10}>
                                                    <Accordion flush defaultActiveKey={"0"}>
                                                        <Accordion.Item eventKey={ind}>
                                                            <Row className="text-center d-flex align-items-center">
                                                                <Col className="align-middle">
                                                                    <Accordion.Header></Accordion.Header>
                                                                </Col>
                                                            </Row>

                                                            <Accordion.Body className="border-color mx-4 mb-4">
                                                                <tr>
                                                                    <td></td>
                                                                    <td colSpan={8}>
                                                                        <b> Kategori :</b> {val.category.category}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td></td>
                                                                    <td colSpan={8}>
                                                                        <b> Deskripsi :</b> {val.description}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td></td>
                                                                    <td colSpan={8}>
                                                                        <b> Gambar : </b>
                                                                        <Form>
                                                                            <Form.Group className="mb-4">
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
                                                                                <Button
                                                                                    className="mx-3"
                                                                                    onClick={() => {
                                                                                        handleUpload(val.id);
                                                                                    }}
                                                                                    variant="success"
                                                                                >
                                                                                    Upload
                                                                                </Button>
                                                                            </Form.Group>
                                                                        </Form>
                                                                        <div className="image-table-container ">
                                                                            {val.images.map((img, ind) => {
                                                                                return (
                                                                                    <div className="image-table">
                                                                                        <Row>
                                                                                            <CloseButton
                                                                                                as={Col}
                                                                                                onClick={() => {
                                                                                                    handleDelete(img.id);
                                                                                                }}
                                                                                                className="ms-auto"
                                                                                            ></CloseButton>

                                                                                            {/* <CloseButton as={Col}  className="ms-auto"></CloseButton> */}
                                                                                        </Row>
                                                                                        <Row>
                                                                                            <img src={img.images_url} alt={ind} />
                                                                                        </Row>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </td>
                                            </tr>
                                        </>
                                    );
                                })}
                            </tbody>
                        </Table>

                        {project.length === 0 && (
                            <>
                                <h5>Ooops, Anda belum memiliki proyek pendanaan .</h5>
                                <Button
                                    onClick={() => {
                                        navigate("/investee/dashboard/project/form");
                                    }}
                                    variant="success"
                                >
                                    Tambah Proyek
                                </Button>
                            </>
                        )}
                    </div>
                </Col>
            </div>
            {/* </Container> */}
        </div>
    );
};

export default AllProjectInvestee;
