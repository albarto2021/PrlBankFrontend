import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserMenu from '../user/UserMenu';
import { useStateValue } from '../../StateProvider';
import AdminMenu from '../admin/AdminMenu';
import EmployeeMenu from '../employee/EmployeeMenu';

const Header = () => {
	const [{ userInfo }, dispatch] = useStateValue();

	let curr;
	if (userInfo) {
		curr = userInfo.userDAO;
	}

	return (
		<>
			<Container className="header-area  d-lg-block p-0  ">
				<Row className="d-flex justify-content-around">
					<Col className="col-9 col-sm-6 col-md-3  mt-3 mb-2 mx-2 d-flex justify-content-center justify-content-md-start">
						<Link to={'/'}>
							<img
								style={{
									marginTop: '10px',
									width: '100%',
									minWidth: '170px',
									maxWidth: '190px',
								}}
								src="assets\img\logo.png"
								alt="img"
							/>
						</Link>
					</Col>

					<Col
						// md={{ span: 3, offset: 1 }}
						className=" px-0  d-none d-md-inline-flex justify-content-center ms-2"
					>
						<div className="">
							<Col
								className="col-auto  media  d-md-inline-flex mx-1 px-1 "
								style={{
									marginTop: '22px',
									paddingLeft: '55px',
									maxWidth: '250px',
								}}
							>
								<div className="media-left align-self-center ">
									<img
										src="assets/img/icon/phone.png"
										alt="phone"
										style={{
											widht: '30px',
											height: '30px',
										}}
									/>
								</div>
								<div className="media-body text-left ">
									<p style={{ fontSize: '12px' }}>
										Free Call To Us:
									</p>
									<p style={{ fontSize: '12px' }}>
										+5 (87) 8695-312
									</p>
								</div>
							</Col>

							<Col
								className="col-auto media d-md-inline-flex"
								style={{
									marginTop: '19px',
									marginLeft: '5px',
									paddingRight: '10px',
									maxWidth: '270px',
								}}
							>
								<div className="media-left align-self-center">
									<img
										src="assets/img/icon/clock.png"
										alt="phone"
										style={{
											widht: '32px',
											height: '32px',
										}}
									/>
								</div>
								<div className="media-body text-left">
									<p style={{ fontSize: '12px' }}>
										Open Time:{' '}
									</p>
									<p style={{ fontSize: '12px' }}>
										Mon-Sat (10 AM - 6 PM)
									</p>
								</div>
							</Col>
						</div>
					</Col>

					{!userInfo && (
						<Col
							className="	h-25 
										col-9 
										col-sm-6 
										col-md-3 
										d-flex 
										justif-content-md-end 
										justify-content-center 
										px-sm-2 
										px-3 
										mt-sm-4 "
						>
							<span
								id="account"
								className="  btn btn-round   "
								style={{
									width: '100%',
									minWidth: '180px',
									maxWidth: '190px',
									height: '40px',
									lineHeight: '35px',
								}}
							>
								<div>
									<Link to="/register" className="h6 ">
										Register
									</Link>
									&nbsp; | &nbsp;
									{/* <span className="header__lineOne">Hello </span> */}
									<Link to="/login" className="h6 my-1">
										Signin
									</Link>
								</div>{' '}
							</span>
						</Col>
					)}

					{userInfo && (
						<Col
							className="col-7 col-sm-6 col-md-3  px-md-2 px-3 mt-md-1 "
							style={{
								marginTop: '25px',
								width: '100%',
								minWidth: '170px',
								minHeight: '100px',
								maxHeight: '150px',
							}}
						>
							<div
								id="account"
								className="  btn btn-round   mb-2 mt-md-2"
								style={{
									width: '100%',
									minWidth: '200px',
									maxWidth: '210px',
									height: '60px',
									lineHeight: '35px',
								}}
							>
								<div className="h6 my-1 ">Welcome</div>
								<div className="h6 my-1">
									{userInfo.userDAO.firstName}{' '}
									{userInfo.userDAO.lastName}
								</div>
							</div>

							<div
								id="account"
								className=" h6 btn btn-round d-flex justify-content-around "
								style={{
									width: '100%',
									minWidth: '200px',
									maxWidth: '210px',
									height: '60px',
									lineHeight: '52px',
								}}
							>
								{userInfo && curr.isAdmin && <AdminMenu />}
								{userInfo && curr.isEmployee && (
									<EmployeeMenu />
								)}
								{userInfo &&
									!curr.isAdmin &&
									!curr.isEmployee && <UserMenu />}{' '}
								<Link
									to="/logout"
									className="header__link h6 mx-auto pt-3"
								>
									| Logout
								</Link>
							</div>
						</Col>
					)}
				</Row>
			</Container>
			{/* <!-- header-area end --> */}
		</>
	);
};

export default Header;
