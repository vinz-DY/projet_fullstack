import { React, useState } from "react";
import connexion from "../services/connexion";
import "./signin.css";

function signin() {
  const [formData, setFormData] = useState({
    email: "",
    hashpassword: "",
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
      const response = await connexion.post("/login", formData);
      console.info("Nouvel utilisateur connecté:", response.data);
    } catch (error) {
      console.error("Erreur lors de connexion de l'utilisateur:", error);
    }
  };

  return (
    <div className="signinBigContainer">
      <form className="signinForm" onSubmit={handleSubmit}>
        <label className="signinCtn">
          Email
          <input
            placeholder="Ex: mario@nintendo.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="signinCtn">
          password
          <input
            placeholder="connection pass"
            type="password"
            name="hashpassword"
            value={formData.hashpassword}
            onChange={handleChange}
            required
          />
        </label>
        <div>
          <button type="submit" className="play playmarg">
            Sign'in
          </button>
        </div>
      </form>
    </div>
  );
}

export default signin;
