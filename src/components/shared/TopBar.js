import React from "react";

const TopBar = () => {
  return (
    <div className="topbar-area">
      <div className="container">
        <div className="row">
          <div className="col-md-6 align-self-center">
            <div className="topbar-left text-md-left text-center">
              <p>
                <i className="fa fa-map-marker"></i>908 Radic Road, NewYork,
                USA.
              </p>
            </div>
          </div>
          <div className="col-md-6 text-md-right text-center">
            <div className="topbar-right">
              <p>
                <i className="fa fa-twitter"></i>
              </p>
              <p>
                <i className="fa fa-facebook"></i>
              </p>
              <p>
                <i className="fa fa-instagram"></i>
              </p>
              <p>
                <i className="fa fa-youtube"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
