import FooterComp from "../../Components/Footer/Footer"
import NavbarComp from "../../Components/Navbar/Navbar"
import NotAuthorized from "../../Images/401.png"
const UnauthorizedPage = () => {
    return (
        <div>
            <NavbarComp />
            <div className="flex-center" style={{ height: "85vh" }}>
                <img src={NotAuthorized} alt="401" style={{ objectFit: "contain", width: "85vw" }} />
            </div>
            <FooterComp />
        </div>
    )
}

export default UnauthorizedPage