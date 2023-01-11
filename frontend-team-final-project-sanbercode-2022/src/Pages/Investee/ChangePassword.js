import axios from "axios";
import { useContext, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap"
import SidebarInvestee from "./Sidebar"
import { apiURL } from "../../Helpers/API";
import { UserContext } from "../../Context/UserContext";
import NavbarInvestee from "../../Components/Navbar/NavbarInvestee";

const ChangePassword = () => {
    const initialInput = { password: "", password_new: "", re_password_new: "" };

    const [user,] = useContext(UserContext)
    const [error, setError] = useState()
    const [success, setSucces] = useState("");

    const [input, setInput] = useState()

    const handleSubmit = (event) => {
        event.preventDefault();
        if (input.password_new !== input.re_password_new) {
            setError("Konfirmasi Password berbeda");
        } else {
            axios
                .post(`${apiURL}/change_password`, { password: input.password, password_new: input.password_new }, { headers: { Authorization: "Bearer " + user.token } })
                .then((res) => {
                    setSucces("Change Password Success");
                    setInput(initialInput);
                    setError();
                })
                .catch((err) => {
                    setError(err.response.data.error);
                });
        }
    };

    const handleChange = (event) => {
        let property = event.target.name;
        let value = event.target.value;
        setInput({ ...input, [property]: value });
    };
    return (
        <>
        <div>
            <NavbarInvestee/>
            <div className="flex-top">
                <Col md={3} className=" d-none d-md-block">
                    <SidebarInvestee />
                </Col>
                <Col>
                    <div className=" container ">
                        <div className="text-center row d-flex justify-content-center">
                            <Col md={8}>
                            
                            <h1 className="text-color" style={{ fontSize: "6rem" }}><i className="bi bi-key-fill"></i></h1>
                            <h4 className="mb-5 mt-3">Ganti Password</h4>
                            {error !== undefined && (
                                <Alert key="danger" variant="danger">
                                    {error}
                                </Alert>
                            )}
                            {success !== "" && (
                                <Alert key="success" variant="success">
                                    {success}
                                </Alert>
                            )}
                            <Form>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="4">
                                        Password Lama
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} required />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="4">
                                        Password Baru
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="password" placeholder="Password Baru" name="password_new" onChange={handleChange} required />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="4">
                                        Konfirmasi Password
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="password" placeholder="Re-Password Baru" name="re_password_new" onChange={handleChange} required />
                                    </Col>
                                </Form.Group>
                                <div className="mb-3 text-center">
                                    <Button className="mt-3 w-50" onClick={handleSubmit} variant="success" type="submit">
                                        Ganti Password
                                    </Button>
                                </div>
                            </Form>
                            </Col>
                        </div>
                    </div>
                </Col>


            </div>
        </div>
        </>
    )
}

export default ChangePassword