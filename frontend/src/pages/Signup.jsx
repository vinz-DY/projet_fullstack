import { React, useState } from "react";
import axios from "axios";
import "./signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    hashpassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        formData
      );
      console.info("Nouvel utilisateur ajouté:", response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
    }
  };

  return (
    <div className="signupBigContainer">
      <form onSubmit={handleSubmit}>
        <label className="signupCtn">
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="signupCtn">
          Password
          <input
            type="password"
            name="hashpassword"
            value={formData.hashpassword}
            onChange={handleChange}
            required
          />
        </label>
        <label className="signupCtn">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <div>
          <button type="submit" className="play playmarg">
            Sign'up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
