import React from "react";
import "./styles/Modal.css";
import { useState } from "react";

function LoginModal({ isVisible, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    try {
      console.log(process.env.REACT_APP_HOST)
      const response = await fetch(process.env.REACT_APP_HOST+"/login", {
        //TEST USING POSTMAN
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userId", data.user.user_id);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("coachStatus", data.user.coach_status);
        onLoginSuccess(true, "", data.user);
        onClose();
      } else {
        setError(data.message || "Login Failed");
      }
    } catch (err) {
      console.log(err);
      setError("Network Error");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="signup-modal-backdrop" onClick={onClose}>
      <div
        className="signup-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleLogin}>
          <label htmlFor="email">EMAIL:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">PASSWORD:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">LOGIN</button>
          {error && <div className="error">{error}</div>}
          <button type="button" onClick={onClose}>
            BACK
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;