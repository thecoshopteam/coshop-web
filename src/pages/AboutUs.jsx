import React from 'react';

const AboutUs = () => {
  return (
    <div style ={{textAlign: `center`, margin: '20px'}}>
    <h1 style={{color: '#333', fontSize: 'larger'}}>About Us</h1>
    <ul style={{listStyleType: 'none', padding:'0'}}>
      <li style={{margin: '10px 0'}}><a style={{color: '#007bff'}}href="https://linkedin.com/your-user-name">Member 1</a></li>
      <li style={{margin: '10px 0'}}><a style={{color: '#007bff'}}href="https://linkedin.com/your-user-name">Member 2</a></li>
      <li style={{margin: '10px 0'}}><a style={{color: '#007bff'}}href="https://linkedin.com/your-user-name">Member 3</a></li>
      <li style={{margin: '10px 0'}}><a style={{color: '#007bff'}}href="https://www.linkedin.com/in/matt-bilinski-49362b295/">Matt Bilinski</a></li>
      <li style={{margin: '10px 0'}}><a style={{color: '#007bff'}}href="https://linkedin.com/your-user-name">Member 5</a></li>
      <li style={{margin: '10px 0'}}><a style={{color: '#007bff'}}href="https://linkedin.com/your-user-name">Member 6</a></li>
    </ul>
  </div>
  );
};

export default AboutUs;
