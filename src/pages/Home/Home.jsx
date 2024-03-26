// Sass
import style from "./Home.module.scss";
// React
import { useEffect, useState } from "react";
// Logo
import logo from "../../assets/images/logo.png";
// Images
import gold from "../../assets/images/gold.png";
import silver from "../../assets/images/silver.webp";
import diamond from "../../assets/images/diamond.png";
import platinum from "../../assets/images/platinum.webp";
//  API
import api from "../../api";

export default function Home() {
  const [data, setData] = useState(null);

  async function fetchData() {
    try {
      const res = await api.get(`api/prices`);
      setData(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData(); // Call initially to fetch data

    const interval = setInterval(() => {
      fetchData();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval); // Cleanup function to clear interval
  }, []);

  return (
    <div className={style.container}>
      <div className={style.logo_box}>
        <img src={logo} alt="logo" />
      </div>

      <h1>Metals Prices</h1>

      <div className={style.gold}>
        <img src={gold} alt="gold" />
        <h2>Gold</h2>
        <h2>${data?.gold}</h2>
      </div>

      <div className={style.small_circle_box}>
        <div className={style.silver}>
          <div>
            <img src={silver} alt="gold" />
          </div>
          <h3>Silver</h3>
          <h3>${data?.silver}</h3>
        </div>

        <div className={style.silver}>
          <div>
            <img src={diamond} alt="gold" />
          </div>
          <h3>Diamond</h3>
          <h3>${data?.diamond}</h3>
        </div>

        <div className={style.silver}>
          <div>
            <img src={platinum} alt="gold" />
          </div>
          <h3>Platinum</h3>
          <h3>${data?.platinum}</h3>
        </div>
      </div>
    </div>
  );
}
