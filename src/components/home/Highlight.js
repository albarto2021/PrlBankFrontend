import React from "react";

const Highlight = (props) => {
  return (
    <div class="single-work mt-0 text-center">
      <div class="work-icon">
        <img class="" src={props.image} alt="icon" />
      </div>
      <h5>
        <a href="#">{props.title}</a>
      </h5>
      <p>{props.desc}</p>
      <a class="angle-btn" href="#">
        <img src="assets/img/icon/angle-left-round.png" alt="icon" />
      </a>
    </div>
  );
};

export default Highlight;
