import style from "./Home.module.scss";
// Logo
import logo from "../../assets/images/logo.png";

import gold from "../../assets/images/gold.png";
import silver from "../../assets/images/silver.webp";
import diamond from "../../assets/images/diamond.png";
import platinum from "../../assets/images/platinum.webp";

export default function Home() {
  return (
    <div className={style.container}>
      <div className={style.logo_box}>
        <img src={logo} alt="logo" />
      </div>

      <h1>Metals Prices</h1>

      <div className={style.gold}>
        <img src={gold} alt="gold" />
        <h2>Gold</h2>
        <h2>$99</h2>
      </div>

      <div className={style.small_circle_box}>
        <div className={style.silver}>
          <div>
            <img src={silver} alt="gold" />
          </div>
          <h3>Silver</h3>
          <h3>$49</h3>
        </div>

        <div className={style.silver}>
          <div>
            <img src={diamond} alt="gold" />
          </div>
          <h3>Diamond</h3>
          <h3>$139</h3>
        </div>

        <div className={style.silver}>
          <div>
            <img src={platinum} alt="gold" />
          </div>
          <h3>Platinum</h3>
          <h3>$25</h3>
        </div>
      </div>
    </div>
  );
}
