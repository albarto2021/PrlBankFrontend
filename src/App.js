import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import TopBar from './components/shared/TopBar';
import Header from './components/shared/Header';
import NavBar from './components/shared/NavBar';
import Footer from './components/shared/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PasswordChangePage from './pages/PasswordChangePage';
import MyAccountsPage from './pages/MyAccountsPage';
import DeletedUser from './components/admin/DeletedUser';
import UserInfoPage from './pages/UserInfoPage';
import Users from './components/admin/Users';
import CustomerTransferPage from './pages/CustomerTransferPage';
import CreateAccountPage from './pages/CreateAccountPage';
import SingleUserDetails from './components/admin/SingleUserDetails';
import Accounts from './components/admin/Accounts';
import DisplayAllAccounts from './components/employee/DisplayAllAccounts';
import EditAccount from './components/employee/EditAccount';
import Logout from './components/logout/Logout';
import Deposit from './components/transaction/Deposit';
import Withdraw from './components/transaction/Withdraw';
import Transactions from './components/transaction/Transatcions';
import DisplayDashboard from './components/shared/DisplayDashboard';

const App = () => {
	return (
		<Router>
			<TopBar />
			<Header />
			<NavBar />
			<Switch>
				<Route
					path="/updatePassword"
					component={PasswordChangePage}
				/>
				<Route
					path="/admin/deletedUser"
					component={DeletedUser}
				/>
				<Route path="/register" component={RegisterPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/logout" component={Logout} />
				<Route path="/about" component={AboutUsPage} />
				<Route
					path="/admin/singleUserDetails"
					component={SingleUserDetails}
				/>
				<Route
					path="/admin/edituser"
					component={Accounts}
				/>
				<Route
					path="/myaccounts"
					component={MyAccountsPage}
				/>
				<Route
					path="/updateUserInfo"
					component={UserInfoPage}
				/>
				<Route path="/admin/allusers" component={Users} />
				<Route
					path="/displayaccounts"
					component={DisplayAllAccounts}
				/>
				<Route
					path="/editaccounts"
					component={EditAccount}
				/>
				<Route
					path="/transfer"
					component={CustomerTransferPage}
				/>
				<Route
					path="/createAccount"
					component={CreateAccountPage}
				/>
				<Route
					path="/moneyTransfer"
					component={CustomerTransferPage}
				/>
				<Route path="/deposit" component={Deposit} />
				<Route path="/withdraw" component={Withdraw} />
				<Route
					path="/transactions"
					component={Transactions}
				/>
				<Route
					path="/displaydashboard"
					component={DisplayDashboard}
				/>
				<Route path="/" component={HomePage} />
			</Switch>
			<Footer />
		</Router>
	);
};

export default App;
