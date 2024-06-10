import React, { useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Réinitialiser les erreurs
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        username,
        password,
      });

      console.log('API Response:', response.data); // Debug: Vérifiez que la réponse contient bien le QR code en base64
      setQrCode(response.data.qrcode); // Stocker la chaîne base64 du QR code
      console.log('QR Code State:', response.data.qrCode); // Debug: Vérifiez que l'état est mis à jour
    } catch (error) {
      setError("Error during registration. Please try again.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {qrCode && (
        <div>
          <h3>Your QR Code</h3>
          <img src={qrCode} alt="QR Code" />
          <a href={qrCode} download="qrcode.png">
            Download QR Code
          </a>
        </div>
      )}
    </div>
  );
}

export default Register;
