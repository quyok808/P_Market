import React from "react";
import "../../../public/css/register.css";

export default function Register() {
  return (
    <div className="login-container">
      <div className="img-login">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" />
      </div>

      <form class="form-register">
        <p class="title-register">Register </p>
        <p class="message-register">
          Signup now and get full access to our app.{" "}
        </p>
        <div class="flex">
          <label>
            <input
              required=""
              placeholder=""
              type="text"
              className="input-register"
            />
            <span>Firstname</span>
          </label>

          <label>
            <input
              required=""
              placeholder=""
              type="text"
              className="input-register"
            />
            <span>Lastname</span>
          </label>
        </div>

        <label>
          <input
            required=""
            placeholder=""
            type="email"
            className="input-register"
          />
          <span>Email</span>
        </label>

        <label>
          <input
            required=""
            placeholder=""
            type="password"
            className="input-register"
          />
          <span>Password</span>
        </label>
        <label>
          <input
            required=""
            placeholder=""
            type="password"
            className="input-register"
          />
          <span>Confirm password</span>
        </label>
        <button class="submit">Submit</button>
        <p class="signin">
          Already have an acount ? <a href="/login">Signin</a>{" "}
        </p>
      </form>
    </div>
  );
}
