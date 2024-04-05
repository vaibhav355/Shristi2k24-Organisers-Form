import React, { useState } from "react";
import "./Form.css"; // Import your CSS file for styling

import { prodUrl } from "./config";

const Form = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("image", e.target.pic.files[0]);
    formData.append("regNo", e.target.regno.value);
    formData.append("group", e.target.group.value);
    formData.append("position", e.target.position.value);

    setLoading(true);
    fetch(prodUrl + "/orgnisers", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };


  const handleOnChange = (e) => {
    if (e.target.files[0].size > 1 * 1000 * 1024 && e.target.files[0]) {
      alert("File is too big! Please select a file smaller than 1 MB.!");
      e.target.value = null; //clear the input
      return false;
    }
  };

  return (
    <div className="form-div">
    <div className="form-container">
      <h1 className="form-heading">About</h1>
      <div className="card">
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="pic">Image:</label>
              <input
                type="file"
                accept="image/*"
                id="pic"
                name="pic"
                onChange={handleOnChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="regno">Reg No:</label>
              <input
                type="text"
                name="regno"
                id="regno"
                placeholder="Enter Registration Number"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="group">Group:</label>
              <input
                type="text"
                name="group"
                id="group"
                placeholder="Enter Your Group"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position:</label>
              <input
                type="text"
                name="position"
                id="position"
                placeholder="Enter Your Position"
                autoComplete="off"
              />
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
      {loading && (
        <div className="backdrop">
          <div className="loader">Loading...</div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Form;
