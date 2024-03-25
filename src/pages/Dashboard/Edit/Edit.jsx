import style from "./Edit.module.scss";

import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// API
import api from "../../../api";
// MUI icon
import IconButton from "@mui/material/IconButton";
// sweetalert
import Swal from "sweetalert2";
// useContext
// import { TrigerContext } from "../../context/trigerProvider";

export default function Edit() {
  // useContext
  //   const { triger, setTriger } = useContext(TrigerContext);
  //
  const nav = useNavigate();

  const [clickedButton, setClickedButton] = useState(false);

  async function fetchData() {
    try {
      const res = await api.get(`api/cards`);
      // console.log(res.data);
      //   setTitle(res.data.title);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    // document.getElementsByTagName("form")[0].reset();
    fetchData();
  }, []);

  async function submitData(e) {
    e.preventDefault();
    setClickedButton(true);

    const formData = new FormData(document.getElementById("edit-form"));

    try {
      let res = await api.post(`api/cards/1?_method=PATCH`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: function (progressEvent) {
          let progress = (progressEvent.loaded / progressEvent.total) * 100;

          console.log(progress);

          if (progress === 100) {
            setTimeout(() => {
              setClickedButton(false);

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
              }).then(() => {
                nav("/dashboard");
              });
            }, 3000);
          }
        },
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
          Edit Price
        </h1>
        {/* form */}
        <form onSubmit={submitData} id="edit-form">
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
                "Edit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
