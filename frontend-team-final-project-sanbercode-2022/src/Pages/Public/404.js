import FooterComp from "../../Components/Footer/Footer"
import NavbarComp from "../../Components/Navbar/Navbar"
import NotFound from "../../Images/404.jpg"
const PageNotFound = () => {
    return (
        <div>
            <NavbarComp />
            <div className="flex-center" style={{ height: "85vh" }}>
                <img className="" src={NotFound} alt="404" style={{ objectFit: "contain", width: "60vw" }} />
            </div>
            <FooterComp />
        </div>
    )
}

export default PageNotFound