import logo from "./logo.svg";

import React, { useState } from "react";
import "./App.css";
import { GoogleLogin } from "react-google-login";

function App() {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

  const responseGoogle = (response) => {
    setToken(response.tokenId);
  };

  const loadFromApi = async () => {
    const response = await fetch("https://localhost:5001/WeatherForecast", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setData(data);
  };

  return (
    <>
      <GoogleLogin
        clientId="138613313862-odj3isr6t5e9j8t5u2qr02991mkrrdks.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      {token && (
        <button onClick={() => loadFromApi()}>Hämta data från api</button>
      )}
      {data.length > 0 && data.map((item) => <p>{item.temperatureC}</p>)}
    </>
  );
}

export default App;
