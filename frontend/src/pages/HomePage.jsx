import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import "./homepage.css";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="body">
        <div className="centrediv">
          <div>
            <div className="login_register">
              <span
                className={`loginlabel ${activeTab === "login" ? "active" : ""}`}
                onClick={() => handleTabClick("login")}
                style={{
                  backgroundImage:
                    activeTab === "login"
                      ? "linear-gradient(to right, rgb(26, 40, 83), rgb(30,68,157),white)"
                      : "none",
                }}
              >
                Login
              </span>
              <span
                className={`registerlabel ${
                  activeTab === "register" ? "active" : ""
                }`}
                onClick={() => handleTabClick("register")}
                style={{
                  backgroundImage:
                    activeTab === "register"
                      ? "linear-gradient(to right, rgb(26, 40, 83), rgb(30,68,157), white)"
                      : "none",
                }}
              >
                Register
              </span>
            </div>
            {activeTab === "login" && <LoginPage />}
            {activeTab === "register" && <RegisterPage />}
          </div>
        </div>
      </div>
    </div>
  );
}
