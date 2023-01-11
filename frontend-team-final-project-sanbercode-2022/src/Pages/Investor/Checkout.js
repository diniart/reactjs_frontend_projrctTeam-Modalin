import "../../Style/checkout.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import FooterComp from "../../Components/Footer/Footer";
import NavbarComp from "../../Components/Navbar/Navbar";
import { UserContext } from "../../Context/UserContext";
import { apiURL } from "../../Helpers/API";
import { Alert, Button, Table } from "react-bootstrap";
import formatter from "../../Helpers/Formatter";
import { useNavigate } from "react-router-dom";
import process from "../../Images/process.jpg";


const Checkout = () => {
	const [user] = useContext(UserContext);
	const [cartItems, setCartItems] = useState([]);
	const [shoppingCart, setShoppingCart] = useState({});
	const [error, setError] = useState();
	const [fetchTrigger, setFetchTrigger] = useState(true);

	let navigate = useNavigate();
	let totalpayment = 0;

	useEffect(() => {
		const fetchData = async () => {
			const cart = await axios.get(`${apiURL}/cart-order`, { headers: { Authorization: "Bearer " + user.token } });
			const result = cart.data.data;
			setShoppingCart(result[0].id);
			setCartItems(result[0].CartItems);
		};
		if (fetchTrigger) {
			fetchData();
			setFetchTrigger(false);
		}
	}, [user.token, fetchTrigger]);

	const handleCheckout = () => {
		// update status shopping cart "pending"
		axios
			.patch(`${apiURL}/cart/${shoppingCart}`, { payment_status: "pending" }, { headers: { Authorization: "Bearer " + user.token } })
			.then(async (res) => {
				// create new shopping cart with payment status "order"
				await axios.post(`${apiURL}/cart`, { payment_status: "order" }, { headers: { Authorization: "Bearer " + user.token } });
				navigate("/investor/activity");
			})
			.catch((err) => {
				setError(err.response.data.error);
			});
	};

	const handleDelete = (id) => {
		axios.delete(`${apiURL}/cartItems/${id}`, { headers: { Authorization: "Bearer " + user.token } }).then(() => {
			setFetchTrigger(true);
		});
	};

	return (
		<>
			<NavbarComp trigger={fetchTrigger} />
			<div className="checkout-container">
				<h1 className="mb-4">
					<i className="bi bi-cart4"></i> Keranjang Belanja
				</h1>
				{error !== undefined && (
					<Alert key="danger" variant="danger">
						{error}
					</Alert>
				)}
				<div className="checkout-contents flex-top">
					<div className="checkout-content p-sm-4 p-2">
						{/* <h2>Keranjang Belanja</h2> */}
						<Table striped bordered hover>
							<thead>
								<tr className="text-center">
									<th>No</th>
									<th>Gambar</th>
									<th>Nama Proyek</th>
									<th>Kontrak</th>
									<th>Harga saham</th>
									<th>Jumlah</th>
									<th>Total Harga</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody>
								{cartItems.length === 0 && (
									<tr>
										<th colSpan={7}>Oops, Maaf keranjang anda masih kosong</th>
									</tr>
								)}
								{cartItems.map((val, ind) => {
									let totalpay = val.projects.price * val.quantity;
									totalpayment += totalpay;
									return (
										<>
											<tr>
												<td>{ind + 1}</td>
												<td>
													<div className="images-table">
														{val.projects.images.length === 0 && (
															<img src={process} key={ind} alt={ind} />
														)}
														{val.projects.images.length > 0 && (
															<img src={val.projects.images[0].images_url} key={ind} alt={ind} />
														)}

													</div>
												</td>
												<td>{val.projects.name}</td>
												<td>{val.projects.duration} bulan</td>
												<td>{formatter.format(val.projects.price)}</td>
												<td>{val.quantity} unit</td>
												<td>{formatter.format(val.projects.price * val.quantity)}</td>
												<td>
													<Button
														variant="secondary"
														onClick={() => {
															handleDelete(val.id);
														}}
													>
														Hapus
													</Button>
												</td>
											</tr>
										</>
									);
								})}
								<tr>
									<th colSpan={6}>Total Pendanaan</th>
									<th>{formatter.format(totalpayment)}</th>
								</tr>
							</tbody>
						</Table>
						<div className="d-flex justify-content-end">
							<Button onClick={handleCheckout} className="background-color mt-3" variant="success">
								Checkout
							</Button>
						</div>
					</div>
				</div>
			</div>
			<FooterComp />
		</>
	);
};

export default Checkout;
