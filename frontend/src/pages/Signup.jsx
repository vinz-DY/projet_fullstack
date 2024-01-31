import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import connexion from "../services/connexion";
import "./signup.css";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const showToastErrorMessage = (message) => {
    toast.error(message);
  };

  const showToastSuccessMessage = () => {
    toast.success("Super, tu fais partie des nôtres !");
  };

  const showToastPasswordMismatchMessage = () => {
    toast.error("Les mots de passe ne correspondent pas.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.hashpassword.length < 5) {
      showToastErrorMessage(
        "Le mot de passe doit avoir au moins 5 caractères."
      );
      return;
    }

    if (formData.hashpassword !== formData.confirmPassword) {
      showToastPasswordMismatchMessage();
      return;
    }

    try {
      const response = await connexion.post("/users", formData);
      console.info("Nouvel utilisateur ajouté:", response.data);
      showToastSuccessMessage();
    } catch (error) {
      showToastErrorMessage("Cet utilisateur existe déjà.");
    }
  };

  return (
    <div className="signupBigContainer">
      <form className="signupForm" onSubmit={handleSubmit}>
        <label className="signupCtn">
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
        <label className="signupCtn">
          New password
          <input
            placeholder="Be original"
            type={showPassword ? "text" : "password"}
            name="hashpassword"
            value={formData.hashpassword}
            onChange={handleChange}
            required
          />
        </label>
        <label className="signupCtn">
          Confirm password
          <input
            placeholder="just copy"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <div>
          <button
            className="play playmarg"
            type="button"
            onClick={handleTogglePassword}
          >
            {showPassword ? "Cacher password" : "Afficher password"}
          </button>
          <button type="submit" className="play playmarg">
            Sign'up
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
