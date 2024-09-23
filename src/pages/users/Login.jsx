import React from "react";
import "../../../public/css/login.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="img-login">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" />
      </div>
      <form class="form-login">
        <p class="form-title">Sign in to your account</p>
        <div class="input-container">
          <input type="email" placeholder="Enter email" />
          <span></span>
        </div>
        <div class="input-container">
          <input type="password" placeholder="Enter password" />
        </div>
        <button type="submit" class="submit">
          Sign in
        </button>

        <p class="signup-link">
          No account?
          <a href="/register">Sign up</a>
        </p>
      </form>
    </div>
  );
}
