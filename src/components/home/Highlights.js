import React from "react";
import Highlight from "./Highlight";

const data = [
  {
    image: "assets/img/icon/arrow-down.png",
    title: "Withdraw",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    image: "assets/img/icon/arrow-right.png",
    title: "Send Money",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    image: "assets/img/icon/card.png",
    title: "Cards",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    image: "assets/img/icon/exchange.png",
    title: "Exchange",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
];

const Highlights = () => {
  return (
    <div class="money-option-area">
      <div class="container">
        <div class="row justify-content-center">
          {data.map((item) => {
            const { image, title, desc } = item;
            return (
              <div class="col-lg-3 col-md-6">
                <Highlight image={image} title={title} desc={desc} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
