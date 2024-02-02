import { React, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import "react-toastify/dist/ReactToastify.css";
import connexion from "../services/connexion";
import "./signin.css";

function signin() {
  const { setConnected } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const showToastErrorMessage = (message) => {
    toast.error(message);
  };
  const showToastMessage = (message) => {
    toast.success(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await connexion.post("/login", formData);
      setConnected(response.data);
      showToastMessage("Bienvenido amigo");
      setTimeout(() => {
        navigate("/");
      }, 3000);
      console.info("Nouvel utilisateur connecté:", response.data);
    } catch (error) {
      showToastErrorMessage("le mail et le mot de passe ne correspondent pas.");
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
          Password
          <input
            placeholder="connection pass"
            type={showPassword ? "text" : "password"}
            name="hashpassword"
            value={formData.hashpassword}
            onChange={handleChange}
            required
          />
        </label>
        <div className="buttonsignup">
          <button
            className="play playmarg viewpass"
            type="button"
            onClick={handleTogglePassword}
          >
            {showPassword ? "Cacher password" : "Afficher password"}
          </button>
          <button type="submit" className="play playmarg">
            Sign'in
          </button>
        </div>
      </form>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default signin;
