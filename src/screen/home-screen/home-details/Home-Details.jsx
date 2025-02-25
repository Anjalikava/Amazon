import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home-Details.css";
import productData from "../../../ToDaysDails.json";
import offers from "../../../TodayOffers.json";

export const HomeDetails = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleProductClick = (id, type) => {
    if (type === "deals") {
      navigate(`/product/${id}`); // Navigates to ProductDetails.js
    } else if (type === "offers") {
      navigate(`/offer/${id}`); // Navigates to OfferDetails.js
    }
  };

  return (
    <div className="homeDetails">
      {/* Today’s Deals Section */}
      <div className="homeDetailLongCard">
        <div className="homeDetailLongCardTitle">Today’s Deals</div>
        <div className="homeDetailLongCardItems">
          <div className="scrollDiv">
            {productData.map((item) => (
              <div
                className="homeDetailLongCardItem"
                key={item.id}
                onClick={() => handleProductClick(item.id, "deals")}
              >
                <img
                  className="homeDetailLongCardItemImg"
                  src={item.imageUrl}
                  alt={item.title}
                />
                <div className="homeDetailLongCardItemImgDetail">
                  <div className="homeDetailLongCardItemImgTopDetail">
                    <div className="homeDetailPercentageOff">{item.discount} Off</div>
                    <div className="limitedTimeDealhomeDetail">{item.deal}</div>
                  </div>
                  <div className="bottomHomeDetail">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today’s Offers Section */}
      <div className="homeDetailLongCard">
        <div className="homeDetailLongCardTitle">Today’s Offers</div>
        <div className="homeDetailLongCardItems">
          <div className="scrollDiv">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="homeDetailLongCardItem"
                onClick={() => handleProductClick(offer.id, "offers")}
              >
                <img
                  className="homeDetailLongCardItemImg"
                  src={offer.imageUrl}
                  alt={offer.description}
                />
                <div className="homeDetailLongCardItemImgDetail">
                  <div className="homeDetailLongCardItemImgTopDetail">
                    <div className="homeDetailPercentageOff">{offer.discount} Off</div>
                    <div className="limitedTimeDealhomeDetail">{offer.deal}</div>
                  </div>
                  <div className="bottomHomeDetail">{offer.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
