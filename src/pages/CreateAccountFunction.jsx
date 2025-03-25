import { useState } from "react";
import validator from "validator";
import { data } from "react-router-dom";
import supabase from "./supabase";
import "./CreateAccountStyle.css";

export default function CreateAccountFunction(props) {
  const setSignedIn = props.setSignedIn;

  const HashPassword = async (message) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convert hash to a hexadecimal string
    const pass = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return pass;
  };

  const [email, setEmail] = useState("email@example");
  const [password, setPassword] = useState("123");
  const [name, setName] = useState("user123");
  const [error, setError] = useState("");

  const SignUp = async (e) => {
    let emailInUse = false;
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
          emailInUse = true;
        }
      });
    } catch (err) {
      console.error("Unexpected error:", err);
    }

    // return error message to user if email is in use or password is under 8 characters
    if (emailInUse) {
      setError("This email is already in use");
      return;
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const hashedPass = await HashPassword(password);

    // adds the user to the user database
    const { error: signUpError } = await supabase
      .from("Users")
      .insert([{ email: email, password: hashedPass, name: name }]);

    if (signUpError) {
      console.error("Error signing up:", signUpError.message);
      setError("Error signing up: " + signUpError.message);
    } else {
      console.log("User signed up successfully");
      setSignedIn(true);
      // Store user information in local storage
      localStorage.setItem("user", JSON.stringify({ id, name, email }));
    }
  };

  return (
    <div className="profile-container">
      <div className="create-account-form-container">
        <form
          onSubmit={SignUp}
          name="create-account"
          action=""
          className="create-account-form"
        >
          <span className="create-account-span">
            <label className="label" htmlFor="">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              className=""
              type="text"
              name="Name"
              id="Name"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Enter a valid email")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </span>
          <span className="create-account-span">
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
          <span className="create-account-span">
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
      </div>
    </div>
  );
}
