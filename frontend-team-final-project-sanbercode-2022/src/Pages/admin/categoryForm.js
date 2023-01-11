import SidebarAdmin from "./sidebarAdmin";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { apiURL } from "../../Helpers/API";
import NavbarAdmin from "../../Components/Navbar/NavbarAdmin";

const FormCategoryDashboardAdmin = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  let initialForm = { category: "" };
  const [user] = useContext(UserContext);
  const [input, setInput] = useState(initialForm);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${apiURL}/category/${id}`);
      let { category } = result.data.data;
      setInput({ category });
      setCurrentId(id);
    };

    if (id !== undefined) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentId !== null) {
      // edit
      axios.patch(`${apiURL}/category/${currentId}`, input, { headers: { Authorization: "Bearer " + user.token } }).then(() => {
        navigate("/admin/dashboard/category");
      });
    } else {
      // new
      axios.post(`${apiURL}/category`, input, { headers: { Authorization: "Bearer " + user.token } }).then(() => {
        navigate("/admin/dashboard/category");
      });
    }
    setInput(initialForm);
  };

  const handleChange = (event) => {
    let val = event.target.value;
    let name = event.target.name;
    setInput({ ...input, [name]: val });
  };
  return (
    <div style={{ backgroundColor: "GhostWhite" }}>
      <NavbarAdmin />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "25vw", height: "auto" }}>
          <SidebarAdmin />
        </div>

        <div className="mt-3" style={{ display: "flex", flexDirection: "column", width: "99%" }}>
          <div style={{ width: "100%", height: "auto", marginBottom: "5vh" }}>
            {/* <Link style={{ TextDecoder: "none", color: "black", marginLeft: "100vh" }} to="/">
							<h1 style={{ marginLeft: "91%" }}>
								<i className="bi bi-house"></i>
							</h1>
						</Link> */}
            <h1 style={{ marginLeft: "3vw", marginTop: "1vw" }}>
              <i className="bi bi-person"></i> Tambah/Edit Kategori
            </h1>

            <div className="shadow" style={{ marginLeft: "3vw", marginTop: "3vw", width: "91%", backgroundColor: "white", height: "auto", paddingTop: "2vw", paddingBottom: "2vw" }}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" style={{ marginLeft: "3vw", marginRight: "3vw" }}>
                  <Form.Label>Nama Category</Form.Label>
                  <Form.Control onChange={handleChange} value={input.category} name="category" type="text" placeholder="Masukkan nama proyek " />
                </Form.Group>
                <Button variant="success" style={{ marginLeft: "3vw" }} onClick={handleSubmit} value="submit">Submit</Button>
                <Button variant="warning" style={{ marginLeft: "3vw" }} onClick={() => { navigate("/admin/dashboard/category") }} >Cancel</Button>
              </Form>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FormCategoryDashboardAdmin
