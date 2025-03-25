import { React, useState, useEffect } from "react";
import "./ProfileScreenStyle.css";
import CreateAccountFunction from "./CreateAccountFunction";
import "./SignUpScreen.css";
import supabase from "./supabase";
import validator from "validator";

export default function SignUpScreen(props) {
  const [screenOption, setScreenOption] = useState("option-screen");
  const [email, setEmail] = useState("email@example");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");

  const setSignedIn = props.setSignedIn;

  const CheckPassword = async (message) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);

    // Convert hash to a hexadecimal string
    const encryptedPass = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", email)
      .single();

    if (encryptedPass == data.password) {
      setSignedIn(data.id);
      const id = data.id;
      const name = data.name;
      const email = data.email;

      // Store user information in local storage
      localStorage.setItem("user", JSON.stringify({ id, name, email }));
    } else {
      setError("Incorrect password");
    }
  };

  const signIn = async (e) => {
    let emailExists = false;
    e.preventDefault();

    if (!validator.isEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // fetch email addresses from the users database
    try {
      const { data, error } = await supabase.from("Users").select("email");

      // check if email is in use
      data.forEach((element) => {
        if (element.email === email) {
          emailExists = true;
        }
      });
    } catch (err) {
      console.error("Unexpected error:", err);
    }

    if (!emailExists) {
      console.log("no email");
      return setError("Email doesn't exists ");
    }

    CheckPassword(password);
  };

  if (screenOption == "create-account-screen") {
    return <CreateAccountFunction setSignedIn={setSignedIn} />;
  }

  if (screenOption == "option-screen") {
    return (
      <div className="sign-in-div">
        <form
          onSubmit={signIn}
          name="sign-in"
          action=""
          className="sign-in-form"
        >
          <span className="sign-in-input-span">
            <label className="label" htmlFor="">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className=""
              type="text"
              name="email"
              id="email"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Enter a valid email")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </span>
          <span className="sign-in-input-span">
            <label className="label" htmlFor="">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className=""
              type="password"
              name="password"
              id="password"
              required
            />
          </span>

          <input id="sign-in-button" type="submit" value="Sign in" />
          <span>{error && <p className="error-message">{error}</p>}</span>
        </form>
        <button
          onClick={() => {
            setScreenOption("create-account-screen");
          }}
        >
          <p>Create account</p>
        </button>
      </div>
    );
  }
}
