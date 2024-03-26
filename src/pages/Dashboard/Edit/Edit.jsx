import style from "./Edit.module.scss";

import { useEffect, useState } from "react";
// API
import api from "../../../api";
// sweetalert
import Swal from "sweetalert2";

export default function Edit() {
  const [clickedButton, setClickedButton] = useState(false);
  const [data, setData] = useState({
    gold: "0",
    silver: "0",
    diamond: "0",
    platinum: "0",
  });

  async function fetchData() {
    try {
      const res = await api.get(`api/prices`);
      // console.log(res.data[0]);
      setData(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function submitData(e) {
    e.preventDefault();
    setClickedButton(true);

    const formData = new FormData(document.getElementById("edit-form"));

    try {
      let res = await api.post(`api/prices/1?_method=PATCH`, formData);

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
              value={data.gold}
              onChange={(e) =>
                setData((prev) => ({ ...prev, gold: e.target.value }))
              }
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
              value={data.silver}
              onChange={(e) =>
                setData((prev) => ({ ...prev, silver: e.target.value }))
              }
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
              value={data.diamond}
              onChange={(e) =>
                setData((prev) => ({ ...prev, diamond: e.target.value }))
              }
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
              value={data.platinum}
              onChange={(e) =>
                setData((prev) => ({ ...prev, platinum: e.target.value }))
              }
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
