import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "../Pages/Public/Homepage";
import RegisterpageAdmin from "../Pages/admin/RegisterpageAdmin";
import Loginpage from "../Pages/Public/Loginpage";
import Register from "../Pages/Public/Register";
import ProjectForm from "../Pages/Investee/ProjectForm";
import ProjectDetail from "../Pages/Public/ProjectDetail";
import AllProjectInvestee from "../Pages/Investee/AllProject";
import Project from "../Pages/Public/project";
import InvesteeProfile from "../Pages/Investee/Profile";
import InvesteeProfileForm from "../Pages/Investee/ProfileForm";
import DashboardInvestor from "../Pages/Investor/DashboardInvestor";
import { AccountDash } from "../Pages/Investor/AccountDash";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import About from "../Pages/Public/About";
import Checkout from "../Pages/Investor/Checkout";
import AccountForm from "../Pages/Investor/AccountForm";
import PublicProfile from "../Pages/Public/PublicProfile";
import ChangePassword from "../Pages/Investee/ChangePassword";
import PageNotFound from "../Pages/Public/404";
import UnauthorizedPage from "../Pages/Public/401";
import { ActivityDash } from "../Pages/Investor/ActivityDash";

import AdminProfileForm from "../Pages/admin/adminProfileForm";
import AdminProfile from "../Pages/admin/profilAdmin";
import DashboardAdmin from "../Pages/admin/dashboardAdmin";
import InvestorDashboardAdmin from "../Pages/admin/investorDashboardAdmin";
import ProjectsDashboardAdmin from "../Pages/admin/projectDashboardAdmin";
import CategoryDashboardAdmin from "../Pages/admin/category";
import FormCategoryDashboardAdmin from "../Pages/admin/categoryForm";
import InvesteeDashboardAdmin from "../Pages/admin/investeeDashboardAdmin";
import { PortofolioDash } from "../Pages/Investor/PortofolioDash";
import ScrollToTop from "../Components/ScrollToTop";
import Installment from "../Pages/Investee/Installment";
import TransactionInvestee from "../Pages/Investee/Transaction";
import TransactionAdmin from "../Pages/admin/transaction";
import DashboardInvestee from "../Pages/Investee/Dashboard";
import DisbursementRequest from "../Pages/admin/disbursement";
import HelpPage from "../Pages/Public/HelpPage";

const AppRoutes = () => {
	const [user] = useContext(UserContext);
	const InvesteeRoute = ({ children }) => {
		if (!user) {
			return <Navigate to="/page/401" />;
		} else if (user.role !== "investee") {
			return <Navigate to="/page/401" />;
		} else {
			return children;
		}
	};

	const InvestorRoute = ({ children }) => {
		if (!user) {
			return <Navigate to="/page/401" />;
		} else if (user.role !== "investor") {
			return <Navigate to="/page/401" />;
		} else {
			return children;
		}
	};

	const AdminRoute = ({ children }) => {
		if (!user) {
			return <Navigate to="/page/401" />;
		} else if (user.role !== "admin") {
			return <Navigate to="/page/404" />;
		} else {
			return children;
		}
	};

	return (
		<BrowserRouter>
			<ScrollToTop>
				<Routes>
					{/* Public Routes */}
					<Route path="/" element={<Homepage />} />
					<Route path="/about" element={<About />} />
					<Route path="/help" element={<HelpPage />} />

					<Route path="/login" element={<Loginpage />} />

					<Route path="/register" element={<Register />} />
					<Route path="/projects" element={<Project />} />
					<Route path="/project/detail/:id" element={<ProjectDetail />} />

					<Route path="/profile/:id" element={<PublicProfile />} />

					{/* Admin Routes */}
					<Route path="/admin/register" element={<RegisterpageAdmin />} />
					<Route
						path="/admin/dashboard"
						element={
							<AdminRoute>
								<DashboardAdmin />
							</AdminRoute>
						}
					/>
					<Route
						path="/admin/dashboard/projects"
						element={
							<AdminRoute>
								<ProjectsDashboardAdmin />
							</AdminRoute>
						}
					/>
					<Route
						path="/admin/dashboard/category"
						element={
							<AdminRoute>
								<CategoryDashboardAdmin />
							</AdminRoute>
						}
					/>
					<Route
						path="/admin/dashboard/category/form/:id"
						element={
							<AdminRoute>
								<FormCategoryDashboardAdmin />
							</AdminRoute>
						}
					/>
					<Route
						path="/admin/dashboard/category/form"
						element={
							<AdminRoute>
								<FormCategoryDashboardAdmin />
							</AdminRoute>
						}
					/>
					<Route
						path="/admin/dashboard/transaction"
						element={
							<AdminRoute>
								<TransactionAdmin />
							</AdminRoute>
						}
					/>

					<Route
						path="/admin/dashboard/pencairan"
						element={
							<AdminRoute>
								<DisbursementRequest />
							</AdminRoute>
						}
					/>

					<Route
						path="/admin/dashboard/investee"
						element={
							<AdminRoute>
								<InvesteeDashboardAdmin />
							</AdminRoute>
						}
					/>
					<Route
						path="/admin/dashboard/investor"
						element={
							<AdminRoute>
								<InvestorDashboardAdmin />
							</AdminRoute>
						}
					/>
					<Route
						path="/admin/dashboard/profile"
						element={
							<AdminRoute>
								<AdminProfile />
							</AdminRoute>
						}
					/>

					<Route
						path="/admin/dashboard/profile/form"
						element={
							<AdminRoute>
								<AdminProfileForm />
							</AdminRoute>
						}
					/>

					{/* Investee Routes */}
					<Route
						path="/investee/transaction"
						element={
							<InvesteeRoute>
								<TransactionInvestee />
							</InvesteeRoute>
						}
					/>

					<Route
						path="/investee/dashboard"
						element={
							<InvesteeRoute>
								<DashboardInvestee />
							</InvesteeRoute>
						}
					/>

					<Route
						path="/investee/dashboard/installment"
						element={
							<InvesteeRoute>
								<Installment />
							</InvesteeRoute>
						}
					/>

					<Route
						path="/investee/dashboard/project/form"
						element={
							<InvesteeRoute>
								<ProjectForm />
							</InvesteeRoute>
						}
					/>
					<Route
						path="/investee/dashboard/project/:id/form"
						element={
							<InvesteeRoute>
								<ProjectForm />
							</InvesteeRoute>
						}
					/>

					<Route
						path="/investee/dashboard/projects"
						element={
							<InvesteeRoute>
								<AllProjectInvestee />
							</InvesteeRoute>
						}
					/>

					<Route
						path="/investee/dashboard/profile"
						element={
							<InvesteeRoute>
								<InvesteeProfile />
							</InvesteeRoute>
						}
					/>

					<Route
						path="/investee/dashboard/profile/form"
						element={
							<InvesteeRoute>
								<InvesteeProfileForm />
							</InvesteeRoute>
						}
					/>

					<Route
						path="/investee/changepassword"
						element={
							<InvesteeRoute>
								<ChangePassword />
							</InvesteeRoute>
						}
					/>

					{/* Investor Routes */}
					<Route
						path="/investor/dashboard"
						element={
							<InvestorRoute>
								<DashboardInvestor />
							</InvestorRoute>
						}
					/>

					<Route
						path="/investor/account"
						element={
							<InvestorRoute>
								<AccountDash />
							</InvestorRoute>
						}
					/>

					<Route
						path="/investor/portofolio"
						element={
							<InvestorRoute>
								<PortofolioDash />
							</InvestorRoute>
						}
					/>

					<Route
						path="/investor/activity"
						element={
							<InvestorRoute>
								<ActivityDash />
							</InvestorRoute>
						}
					/>

					<Route
						path="/investor/checkout"
						element={
							<InvestorRoute>
								<Checkout />
							</InvestorRoute>
						}
					/>

					<Route
						path="/investor/account/form"
						element={
							<InvestorRoute>
								<AccountForm />
							</InvestorRoute>
						}
					/>

					{/* If false url return to homepage */}
					<Route path="*" element={<Navigate to="/page/404" replace />} />

					<Route path="/page/404" element={<PageNotFound />} />

					<Route path="/page/401" element={<UnauthorizedPage />} />
				</Routes>
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default AppRoutes;
