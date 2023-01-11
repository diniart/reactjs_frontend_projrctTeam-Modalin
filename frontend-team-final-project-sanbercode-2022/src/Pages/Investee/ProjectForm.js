import "../../Style/dashboardInvestee.css"

import { Alert, Button, Form, Col } from "react-bootstrap"
import SidebarInvestee from "./Sidebar"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "../../Context/UserContext"
import { useNavigate, useParams } from "react-router-dom"

import { apiURL } from "../../Helpers/API"
import NavbarInvestee from "../../Components/Navbar/NavbarInvestee"

const ProjectForm = () => {
    let { id } = useParams()

    const initialInput = { name: "", margin: 0, duration: 0, periode: 0, description: "", quantity: 0, price: 0, category_id: "", dueDate: "" }

    const [user,] = useContext(UserContext)
    const [category, setCategory] = useState([])
    const [input, setInput] = useState(initialInput)
    const [error, setError] = useState()
    const [currentId, setCurrentId] = useState(null)
    let navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const category = await axios.get(`${apiURL}/category`)
            const result = category.data.data
            if (id) {
                const resData = await axios.get(`${apiURL}/projects/${id}`)
                const inputed = resData.data.data
                let { name, margin, duration, periode, description, quantity, price, category_id, dueDate } = inputed
                setInput({ name, margin, duration, periode, description, quantity, price, category_id, dueDate: dueDate.substring(0, 10) })
                setCurrentId(id)
            }
            setCategory(result)
        }
        fetchData()
    }, [id])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (currentId !== null) {
            // Edit
            axios.patch(`${apiURL}/projects/${currentId}`, input, { headers: { Authorization: "Bearer " + user.token } }
            )
                .then((res) => {
                    navigate('/investee/dashboard/projects')
                    setInput(initialInput)
                })
                .catch((err) => {
                    setError(err.response.data.error)
                })

        } else {
            //  
            axios.post(`${apiURL}/projects`, input, { headers: { Authorization: "Bearer " + user.token } }
            )
                .then((res) => {
                    navigate('/investee/dashboard/projects')
                    setInput(initialInput)
                })
                .catch((err) => {
                    setError(err.response.data.error)
                })
        }
    }

    console.log("category", category)
    console.log("currentId", currentId)

    const handleChange = (event) => {
        console.log("eve", event)
        let value = event.target.value
        let name = event.target.name
        if (name === "duration") {
            value = parseInt(value)
        } else if (name === "margin") {
            value = parseInt(value)
        } else if (name === "periode") {
            value = parseInt(value)
        } else if (name === "price") {
            value = parseInt(value)
        } else if (name === "quantity") {
            value = parseInt(value)
        }
        setInput({ ...input, [name]: value })
    }


    return (
        <>
            <div>
                <NavbarInvestee />
                <div className="flex-top">
                    <Col md={3} className=" d-none d-md-block" >
                        <SidebarInvestee />
                    </Col>
                    <Col>
                        <div className="investee-container mt-2 p-5 text-color">
                            {!id && (
                                <h3 className="mb-5"><i class="bi bi-building"></i> Tambah Proyek Baru</h3>
                            )}
                            {id && (
                                <h3 className="mb-5"><i class="bi bi-building"></i> Edit Proyek </h3>
                            )}
                            <div className="form-project m-4">
                                {error !== undefined && (
                                    <Alert key="danger" variant="danger">{error}</Alert>
                                )}
                                <Form>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Nama Proyek</Form.Label>
                                        <Form.Control onChange={handleChange} value={input.name} name="name" type="text" placeholder="Masukkan nama proyek " />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Deskripsi Proyek</Form.Label>
                                        <Form.Control onChange={handleChange} value={input.description} name="description" as="textarea" type="text" placeholder="Masukkan deskripsi proyek " />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Kategori Proyek</Form.Label>
                                        <Form.Select onChange={handleChange} value={input.category_id} name="category_id" aria-label="Default select example">
                                            <option>Pilih Kategori Proyek</option>
                                            {category.map((cat) => {
                                                return (
                                                    <>
                                                        <option value={cat.id}>{cat.category}</option>
                                                    </>)
                                            })}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Durasi Kontrak (bulan)</Form.Label>
                                        <Form.Control onChange={handleChange} value={input.duration} name="duration" type="number" placeholder="contoh : 12 bulan" />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Margin Proyek (per tahun)</Form.Label>
                                        <Form.Control onChange={handleChange} value={input.margin} name="margin" type="number" placeholder="contoh : 18%" />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Periode Margin (bulan)</Form.Label>
                                        <Form.Control onChange={handleChange} value={input.periode} name="periode" type="number" placeholder="contoh : 3 bulan" />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Harga Saham (per unit) </Form.Label>
                                        <Form.Control onChange={handleChange} value={input.price} name="price" type="number" placeholder="Rp. 1.000.000" />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Jumlah Saham Diterbitkan</Form.Label>
                                        <Form.Control onChange={handleChange} value={input.quantity} name="quantity" type="number" placeholder="contoh : 100 unit saham" />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Tanggal Akhir Penerimaan Dana</Form.Label>
                                        <Form.Control onChange={handleChange} value={input.dueDate} name="dueDate" type="date" />
                                    </Form.Group>

                                    {/* 
                                <Form.Group className="mb-4">
                                    <Form.Label>Total Dana Proyek</Form.Label>
                                    <Form.Control onChange={handleChange} name="total" type="number" placeholder="Automatic Calculation (harga saham * jumlah unit) contoh : Rp. 100.000.000" />
                                </Form.Group> */}
                                    {!id && (
                                        <Button onClick={handleSubmit} variant="success">Tambah Proyek</Button>
                                    )}
                                    {id && (
                                        <Button onClick={handleSubmit} variant="success">Edit Proyek</Button>
                                    )}

                                </Form>

                            </div>
                        </div>
                    </Col>
                </div>

            </div>
        </>
    )
}

export default ProjectForm