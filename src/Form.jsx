import React, { useState } from "react";
import "./Form.css"; // Import your CSS file for styling

import { prodUrl } from "./config";


const Form = () => {
  const [loading, setLoading] = useState(false);

  // console.log(...clubs)

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("file", e.target.pic.files[0]);
    formData.append("regNo", e.target.regno.value);
    formData.append("group", e.target.group.value);
    formData.append("position", e.target.position.value);

    setLoading(true);
    fetch(prodUrl + "/organisers", {
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
    if (e.target.files[0]?.size > 1 * 1000 * 1024 && e.target.files[0]) {
      alert("File is too big! Please select a file smaller than 1 MB.!");
      e.target.value = null; //clear the input
      return false;
    }
  };

  return (
    <div className="form-div">
      <h1 className="form-heading">Shristi 2k24</h1>
      <h1 className="form-heading">Organisers</h1>
      <div className="form-container">
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
                  required
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
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="regno">Reg No:</label>
                <input
                  type="text"
                  name="regno"
                  id="regno"
                  placeholder="Enter Reg. Number e.g. 330/089"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="group">Group:</label>
                <input
                  type="text"
                  name="  "
                  id="group"
                  placeholder="Enter Your Group Name"
                  autoComplete="off"
                  required
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
                  required
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
