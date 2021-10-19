import React from "react";
import Button from "@material-ui/core/Button";
// import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router";
import { useStateValue } from "../../StateProvider";

const UserMenu = () => {
  const history = useHistory();
  const [{userInfo}, dispatch] = useStateValue();

  console.log(userInfo);

  const id1=userInfo.userDAO.userId;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

//   const showDashboard = () => {
//     history.push("/user");
//     setAnchorEl(null);
//   };

  const handleUserInfoUpdate = () => {
    history.push("/updateUserInfo/"+id1);
    setAnchorEl(null);
  };
  const handleUpdatePassword = () => {
    history.push("/updatePassword/"+id1);
    setAnchorEl(null);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div class="mx-auto">
      <Button
        aria-controls="user-menu"
        aria-haspopup="true"
        className="menu"
        onClick={handleOnClick}
      >
        {/* <MenuIcon className="menu" /> */}
        Actions
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={showDashboard}>Dashoard</MenuItem> */}
        <MenuItem onClick={handleUserInfoUpdate}>Update User Info</MenuItem>
        <MenuItem onClick={handleUpdatePassword}>Update Password</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;