import React from "react";
import "./OtherServices.css";

function OtherServices() {
  return (
    <div className="other-services">
      <h2 className="other-services-header">Other Services</h2>
      <div className="other-services-container">
        <div className="other-service">
          <a href="#">
            <img
              src="../images/places-visit.jpg"
              alt="Places to visit"
              className="other-service-image"
            />
            <p className="other-service-name">Places to visit</p>
          </a>
        </div>
        <div className="other-service">
          <a href="">
            <img
              src=".\images\tour-guide.jpg"
              alt="Service 2"
              className="other-service-image"
            />
            <p className="other-service-name">Tour Guides</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default OtherServices;

