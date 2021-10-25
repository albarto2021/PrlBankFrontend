import React from "react";
import { Link } from "react-router-dom";
import UserDropDown from "./UserDropDown";
import Login from "../login/Login";
import UserMenu from "../user/UserMenu";
import { useStateValue } from "../../StateProvider";
import AdminMenu from "../admin/AdminMenu";
import EmployeeMenu from "../employee/EmployeeMenu";
import Logout from "../logout/Logout";
import { Button } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";

const Header = () => {
  const [{ userInfo }, dispatch] = useStateValue();

  let curr;
  if (userInfo) {
    curr = userInfo.userDAO;
  }

  return (
    <>
      {/* <!-- header-area start --> */}
      <div className="header-area d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-md-3 align-self-center">
              <div className="logo">
                <Link to={"/"}>
                  <img src="assets\img\logo.png" alt="img" />
                </Link>
              </div>
            </div>
            <div className="col-lg-9 col-md-12 text-lg-right text-center">
              <div className="media d-sm-inline-flex m-0">
                <div className="media-left align-self-center">
                  <img src="assets/img/icon/phone.png" alt="phone" />
                </div>
                <div className="media-body text-left">
                  <p>Free Call To Us:</p>
                  <p>+5 (87) 8695-312</p>
                </div>
              </div>
              <div className="media d-sm-inline-flex">
                <div className="media-left align-self-center">
                  <img src="assets/img/icon/clock.png" alt="phone" />
                </div>
                <div className="media-body text-left">
                  <p>Open Time: </p>
                  <p>Mon-Sat (10 AM - 6 PM)</p>
                </div>
              </div>
              {!userInfo && (
                <span id="account" className="btn btn-round">
                  {/*                   <UserDropDown/>
                   */}
                  <div>
                    <Link to="/register">Register</Link> &nbsp; | &nbsp;
                    <span className="header__lineOne">Hello </span>
                    <Link to="/login">Signin</Link>
                  </div>{" "}
                  {/* <Link to="/register">Register</Link> &nbsp; | &nbsp;
                <span className="header__lineOne">Hello </span>
                <Link to="/login">Signin</Link> */}
                </span>
              )}
              {userInfo && (
                <div class="row">
                  {/*Below Div is for Greetings */}
                  <div class="row mx-auto">
                    <div className="header__greeting">
                      <div className="header__option">
                        <div className="header__lineOne">Welcome</div>
                        <div className="header__lineTwo">
                          {userInfo.userDAO.firstName}{" "}
                          {userInfo.userDAO.lastName}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*Greetings div got completed */}
                  {/* Div for Logout Starts here */}
                  {userInfo && curr.isAdmin && <AdminMenu />}
                  {userInfo && curr.isEmployee && <EmployeeMenu />}
                  {userInfo && !curr.isAdmin && !curr.isEmployee && (
                    <UserMenu />
                  )}
                  <div>
                    <Link to="/logout" className="header__link mx-auto">
                      <div className="header__option">
                        <span className="header__lineOne"></span>
                        <span className="header__lineTwo">Logout</span>
                      </div>
                    </Link>
                  </div>
                  {/* Div for Logout Completed here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- header-area end --> */}
    </>
  );
};

export default Header;
