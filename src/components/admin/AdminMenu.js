import React from 'react';
import Button from '@material-ui/core/Button';
// import MenuIcon from "@material-ui/icons/Menu";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router';
import { useStateValue } from '../../StateProvider';
import { toast } from 'react-toastify';

const AdminMenu = () => {
	const history = useHistory();
	const [{ userInfo }, dispatch] = useStateValue();
	console.log(userInfo);

	const id1 = userInfo.userDAO.userId;
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleOnClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const showDashboard = () => {
		history.push('/displaydashboard');
		setAnchorEl(null);
	};

	const handleManageUsers = () => {
		history.push('/admin/allusers');
		setAnchorEl(null);
	};
	// const handleUpdatePassword = () => {
	//   history.push("/updatePassword/"+id1);
	//   setAnchorEl(null);
	// };
	const handleCreateAccount = () => {
		history.push('/createAccount');
		setAnchorEl(null);
	};
	const handleCustomerTransfer = () => {
		history.push('/moneyTransfer/' + id1);
		setAnchorEl(null);
	};
	const handleDisplayAccounts = () => {
		history.push('/displayaccounts');
		setAnchorEl(null);
	};
	const handleDisplayTransactions = () => {
		if (userInfo.userDAO.accounts.length == 0) {
			toast.warning('You need to have an account first');
			setAnchorEl(null);
		} else {
			history.push('/transactions');
			setAnchorEl(null);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div class="mx-auto ">
			<Button
				aria-controls="user-menu"
				aria-haspopup="true"
				className="menu text-white h6 font-weight-bold"
				onClick={handleOnClick}
			>
				{/* <MenuIcon className="menu" /> */}
				ADMIN MENU
			</Button>
			<Menu
				id="user-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={showDashboard}>
					Dashoard
				</MenuItem>
				<MenuItem onClick={handleManageUsers}>
					Manage Users
				</MenuItem>
				<MenuItem onClick={handleCreateAccount}>
					Create Account
				</MenuItem>
				<MenuItem onClick={handleCustomerTransfer}>
					Money Transfer
				</MenuItem>
				<MenuItem onClick={handleDisplayAccounts}>
					Display Accounts
				</MenuItem>
				{/* <MenuItem onClick={handleUpdatePassword}>Update Password</MenuItem> */}
				<MenuItem onClick={handleDisplayTransactions}>
					Display Transactions
				</MenuItem>
			</Menu>
		</div>
	);
};

export default AdminMenu;
