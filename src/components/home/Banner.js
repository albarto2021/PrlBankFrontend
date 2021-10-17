import React from "react";

const Banner = () => {
  return (
    <div className="banner-area style-one">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="assets/img/banner/1.png"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h4>Best Banking Service</h4>
              <p>
                We are very fast to provide Banking services. Please check
                included multiple feature & Investment plan .
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="assets/img/banner/2.png"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h4>We can help you achieve your goals!</h4>
              <p>
                Online banking can save you a lot of time and effort, you can
                undertake most transactions from the comforts of your home.{" "}
              </p>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>{" "}
    </div>
  );
};

export default Banner;
