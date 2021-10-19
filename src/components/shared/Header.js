import React from 'react';
import { Link } from 'react-router-dom';
import UserDropDown from './UserDropDown';
import Login from '../login/Login';
import UserMenu from '../user/UserMenu';
import { useStateValue } from '../../StateProvider';
import AdminMenu from '../admin/AdminMenu';
import EmployeeMenu from '../employee/EmployeeMenu';

const Header = () => {
  
  const [{userInfo}, dispatch] = useStateValue();

  let curr;
  if(userInfo){
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
              <span id="account" className="btn btn-round">
                {/*                   <UserDropDown/>
                 */}
                 {userInfo && curr.isAdmin && <AdminMenu/>}
                 {userInfo && curr.isEmployee && <EmployeeMenu/>}
                 {userInfo && !curr.isAdmin && !curr.isEmployee && <UserMenu />}
                <Link to="/register">Register</Link> &nbsp; | &nbsp;
                <span className="header__lineOne">Hello </span>
                <Link to="/login">Signin</Link>
              
                
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- header-area end --> */}
    </>
  );
};

export default Header;
