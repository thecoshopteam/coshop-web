import React from 'react';
import { useTheme } from '@mui/material/styles';

const AboutUs = () => {
  const theme = useTheme();
  return (
    <div style={{ backgroundColor: theme.palette.background.default, textAlign: `center`, margin: "20px"}}>
      <h1 style={{ fontSize: "larger" }}>About Us</h1>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        <li style={{ margin: "10px 0" }}>
          <a
            target="_blank"
            style={{ color: "#007bff" }}
            href="https://www.linkedin.com/in/amna-tasneem/"
          >
            Amna Tasneem
          </a>
        </li>
        <li style={{ margin: "10px 0" }}>
          <a
            target="_blank"
            style={{ color: "#007bff" }}
            href="https://www.linkedin.com/in/rochajulian/"
          >
            Julian Rocha
          </a>
        </li>
        <li style={{ margin: "10px 0" }}>
          <a
            target="_blank"
            style={{ color: "#007bff" }}
            href="https://www.linkedin.com/in/mateusz-obrochta-7281722b3/"
          >
            Mateusz Obrochta
          </a>
        </li>
        <li style={{ margin: "10px 0" }}>
          <a
            target="_blank"
            style={{ color: "#007bff" }}
            href="https://www.linkedin.com/in/matt-bilinski-49362b295/"
          >
            Matt Bilinski
          </a>
        </li>
        <li style={{ margin: "10px 0" }}>
          <a
            target="_blank"
            style={{ color: "#007bff" }}
            href="https://www.linkedin.com/in/ivansanchez-/"
          >
            Ivan Sanchez
          </a>
        </li>
        <li style={{ margin: "10px 0" }}>
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
