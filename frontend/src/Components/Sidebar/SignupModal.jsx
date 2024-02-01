import React, { useState } from "react";
import CoachSurvey from "../Surveys/CoachSurvey";
import ClientSurvey from "../Surveys/ClientSurvey";
import "./styles/SignupModal.css";

function SignupModal({ isVisible, onClose, onSignupSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    role: "client", // Default to CLIENT
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCoachSurvey, setShowCoachSurvey] = useState(false);
  const [showClientSurvey, setShowClientSurvey] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    formData.state=formData.state.toUpperCase()
    try {
      const response = await fetch(process.env.REACT_APP_HOST+"/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Account created:", data);
        localStorage.setItem("userId", data.userID);
        localStorage.setItem("role", formData.role);
        onSignupSuccess(formData);
        if (formData.role === "coach") {
          setShowCoachSurvey(true);
        } else if (formData.role === "client") {
          setShowClientSurvey(true);
        }
      } else {
        setError(
          data.message ||
            "An error occurred while creating the account. User already registered"
        );
      }
    } catch (error) {
      setError("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSurveyClose = () => {
    setShowCoachSurvey(false);
    setShowClientSurvey(false);
    onClose();
  };

  if (!isVisible && !showCoachSurvey && !showClientSurvey) return null;

  return (
    <>
      {showCoachSurvey && <CoachSurvey onClose={handleSurveyClose} />}
      {showClientSurvey && <ClientSurvey onClose={handleSurveyClose} />}
      {!showCoachSurvey && !showClientSurvey && (
        <div className="signup-modal-backdrop" onClick={onClose}>
          <div
            className="signup-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder="*FIRST NAME"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="*LAST NAME"
                required
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="*EMAIL"
                required
                onChange={handleChange}
              />
              <input
                type="password" 
                name="password"
                placeholder="*PASSWORD"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="*PHONE NUMBER"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="streetAddress"
                placeholder="*STREET ADDRESS"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="*CITY"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="*STATE (ABBR.)"
                required
                onChange={handleChange} 
              />
              <input
                type="text"
                name="zipCode"
                placeholder="*ZIP CODE"
                required
                onChange={handleChange}
              />

              <select name="role" required onChange={handleChange}>
                <option value="client">client</option>
                <option value="coach">coach</option>
              </select>

              <button type="submit" disabled={isLoading}>
                {isLoading ? "Registering..." : "REGISTER"}
              </button>
              {error && <div className="error-message">{error}</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SignupModal;