import React from 'react';

import { Link } from 'react-router-dom';
// import UserDropDown from './UserDropDown';

const Navbar = () => {
	return (
		<>
			{/* <!-- navbar start --> */}

			<nav className="navbar navbar-area navbar-expand-lg  ">
				<div className="container nav-container ">
					{/* <div className="responsive-mobile-menu d-md-none  ">
						<button
							// className="menu toggle-btn  bg-dark d-block d-lg-none"
							className="menu toggle-btn  bg-dark d-inline "
							data-target="#banlank_main_menu"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="icon-left "></span>
							<span className="icon-right"></span>
						</button>
					</div> */}

					<div
						className="collapse navbar-collapse"
						id="banlank_main_menu"
					>
						<ul className="navbar-nav menu-open">
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/loans">Loans</Link>
							</li>
							<li>
								<Link to="/about">About Us</Link>
							</li>
							<li>
								<Link to="/services">Services</Link>
							</li>
							<li>
								<Link to="/contact">Contact</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			{/* <!-- navbar end --> */}
		</>
	);
};

export default Navbar;
