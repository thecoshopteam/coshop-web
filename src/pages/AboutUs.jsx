import React from "react";
import { useTheme } from "@mui/material/styles";

const AboutUs = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
        textAlign: `center`,
        margin: "20px",
        paddingBottom: "150px",
      }}
    >
      <h1 style={{ fontSize: "larger" }}>About Us</h1>
      <div style={{ margin: "auto", width: "fit-content" }}>
        <img
          src="https://media.licdn.com/dms/image/D5603AQEAiEa8P4zr6A/profile-displayphoto-shrink_800_800/0/1709835294815?e=1720656000&v=beta&t=C6kdnxxrt4tk0elYy-HoP0_VQxWm6jyR3VQ3oBMUjXQ"
          alt="Amna Tasneem"
          style={{ width: "100px", height: "100px", marginRight: "10px", borderRadius: "50%" }}
        />
      </div>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        <li style={{ margin: "10px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <a
            target="_blank"
            style={{ color: "#007bff" }}
            href="https://www.linkedin.com/in/amna-tasneem/"
          >
            Amna Tasneem
          </a>
        </li>
      </ul>
      <div style={{ margin: "auto", width: "fit-content" }}>
        <img
          src="https://media.licdn.com/dms/image/D5603AQGcK_bkANqX4A/profile-displayphoto-shrink_400_400/0/1681425255849?e=1720656000&v=beta&t=DpOltcW3VrVKWBb2RXB6bskaqL1ch3UoMqw7w2rsqXU"
          alt="Julian Rocha"
          style={{ width: "100px", height: "100px", marginRight: "10px", borderRadius: "50%" }}
        />
      </div>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        <li style={{ margin: "10px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <a
            target="_blank"
            style={{ color: "#007bff" }}
            href="https://www.linkedin.com/in/rochajulian/"
          >
            Julian Rocha
          </a>
        </li>
      </ul>
      <div style={{ margin: "auto", width: "fit-content" }}>
        <img
          src="/mato.png"
          alt="Mateusz Obrochta"
          style={{ width: "100px", height: "100px", marginRight: "10px", borderRadius: "50%" }}
        />
      </div>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        <li style={{ margin: "10px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <a
            target="_blank"
            style={{ color: "#007bff" }}
            href="https://www.linkedin.com/in/mateusz-obrochta-7281722b3/"
          >
            Mateusz Obrochta
          </a>
        </li>
      </ul>
      <div style={{ margin: "auto", width: "fit-content" }}>
        <img
          src="/mattb.jpg"
          alt="Matt Bilinski"
          style={{ width: "100px", height: "100px", marginRight: "10px", borderRadius: "50%" }}
        />
      </div>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        <li style={{ margin: "10px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <a
            target="_blank"
            style={{ color: "#007bff" }}
            href="https://www.linkedin.com/in/matt-bilinski-49362b295/"
          >
            Matt Bilinski
          </a>
        </li>
      </ul>
      <div style={{ margin: "auto", width: "fit-content" }}>
        <img
          src="https://media.licdn.com/dms/image/D5603AQFPlX6EF5wATA/profile-displayphoto-shrink_400_400/0/1667622087363?e=1720656000&v=beta&t=7gFASkXlMt0yY9VBBzieygvzwu8bqHQJz6hfS_8Od04"
          alt="Ivan Sanchez"
          style={{ width: "100px", height: "100px", marginRight: "10px", borderRadius: "50%" }}
        />
      </div>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        <li style={{ margin: "10px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <a
            target="_blank"
            style={{ color: "#007bff" }}
            href="https://www.linkedin.com/in/ivansanchez-/"
          >
            Ivan Sanchez
          </a>
        </li>
      </ul>
      <div style={{ margin: "auto", width: "fit-content" }}>
        <img
          src="https://media.licdn.com/dms/image/D5603AQGR1PJKZIYSUg/profile-displayphoto-shrink_400_400/0/1689086044156?e=1720656000&v=beta&t=qLPJQkp1vhql3t-so0ficnUQJkVpXP__T3MLxHn55nw"
          alt="Gabriel DaSilva"
          style={{ width: "100px", height: "100px", marginRight: "10px", borderRadius: "50%" }}
        />
      </div>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        <li style={{ margin: "10px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <a
            target="_blank"
            style={{ color: "#007bff" }}
            href="https://www.linkedin.com/in/gabriel-dasilva-244181283"
          >
            Gabriel DaSilva
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AboutUs;