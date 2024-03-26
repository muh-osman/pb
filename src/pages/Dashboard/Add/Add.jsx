// SASS
import style from "./Add.module.scss";
// React
import { useState } from "react";
// API
import api from "../../../api";
// sweetalert
import Swal from "sweetalert2";

export default function Add() {
  const [clickedButton, setClickedButton] = useState(false);

  async function submitData(e) {
    e.preventDefault();
    setClickedButton(true);

    const formData = new FormData(document.getElementById("add-form"));

    try {
      await api.post(`api/prices`, formData);

      // Reset the form after submission
      document.getElementsByTagName("form")[0].reset();

      // Stop button animation
      setClickedButton(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "All changes saved",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      setClickedButton(false);
      // Handle network errors
      console.error(err);
      // Display an error message to the user
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    }
  }

  return (
    <div className={style.container}>
      <div className={style.box}>
        <h1
          style={{
            color: "#757575",
            marginBottom: "16px",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Add Price
        </h1>
        {/* form */}
        <form onSubmit={submitData} id="add-form">
          {/* Gold */}
          <div className="mb-3">
            <label htmlFor="gold" className="form-label">
              Gold:
            </label>
            <input
              type="number"
              name="gold"
              className="form-control"
              id="gold"
              required
            />
          </div>

          {/* Silver */}
          <div className="mb-3">
            <label htmlFor="silver" className="form-label">
              Silver:
            </label>
            <input
              type="number"
              name="silver"
              className="form-control"
              id="silver"
              required
            />
          </div>

          {/* Diamond */}
          <div className="mb-3">
            <label htmlFor="diamond" className="form-label">
              Diamond:
            </label>
            <input
              type="number"
              name="diamond"
              className="form-control"
              id="diamond"
              required
            />
          </div>

          {/* Platinum */}
          <div className="mb-3">
            <label htmlFor="platinum" className="form-label">
              Platinum:
            </label>
            <input
              type="number"
              name="platinum"
              className="form-control"
              id="platinum"
              required
            />
          </div>

          {/* Submit button */}
          <div className={style.btn_box}>
            <button
              type="submit"
              className="btn btn-primary mt-2"
              style={{ width: "60px" }}
            >
              {clickedButton ? (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
