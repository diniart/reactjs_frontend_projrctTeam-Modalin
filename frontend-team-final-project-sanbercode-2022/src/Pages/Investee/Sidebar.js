import "../../Style/sidebarInvestee.css"

import { useContext } from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"

const SidebarInvestee = () => {
    const [, setUser] = useContext(UserContext)
    let navigate = useNavigate()
    return (
        <>
            {/* <div className="background-content"></div> */}
            <div className="sidebar-investee background-color sticky-top  text-white p-5">

                {/* <h1 onClick={() => { navigate("/") }} className="text-center" style={{ cursor: "pointer" }}>Modal.in</h1> */}

                <div className="sidebar-menu">
                    <h4><i className="bi bi-speedometer"></i> Dashboard</h4>
                    <Button onClick={() => { navigate("/investee/dashboard") }} className="button-shape" variant="light" size="md" >Dashboard</Button>

                    <h4> <i className="bi bi-building"></i> Proyek</h4>
                    <Button onClick={() => { navigate("/investee/dashboard/projects") }} className="button-shape" variant="light" size="md">Semua Proyek</Button>
                    <Button onClick={() => { navigate("/investee/dashboard/project/form") }} className="button-shape" variant="light" size="md">Tambah Proyek</Button>

                    <h4> <i className="bi bi-building"></i> Transaksi</h4>
                    <Button onClick={() => { navigate("/investee/transaction") }} className="button-shape" variant="light" size="md">Riwayat Transaksi</Button>
                    <Button onClick={() => { navigate("/investee/dashboard/installment") }} className="button-shape" variant="light" size="md">Tagihan Proyek Berjalan</Button>

                    <h4><i className="bi bi-person-lines-fill"></i> Akun</h4>
                    <Button onClick={() => { navigate("/investee/dashboard/profile") }} className="button-shape" variant="light" size="md">Profil Saya</Button>
                    <Button onClick={() => { navigate("/investee/changepassword") }} className="button-shape" variant="light" size="md">Ganti Password</Button>

                    <Button onClick={() => { setUser(null); localStorage.clear(); navigate("/") }} className="button-shape" variant="light" size="md">Log Out</Button>

                </div>

            </div>
        </>

    )
}

export default SidebarInvestee