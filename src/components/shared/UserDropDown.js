import React from "react";
import { Link } from "react-router-dom";

const UserDropDown = () => {

  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Login User
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <Link className="dropdown-item" to="/userinfo">
          My Accounts
        </Link>
        <Link className="dropdown-item" to="/">
          Transfer Money
        </Link>
        <hr className="dropdown-divider" />{" "}
        <Link className="dropdown-item" to="/userinfo">
          User Info
        </Link>
        <Link className="dropdown-item" to="/change-password">
          Change Password
        </Link>
        <Link className="dropdown-item" href="/">
          Log Out
        </Link>
      </div>
    </div>
  )
}

export default UserDropDown;