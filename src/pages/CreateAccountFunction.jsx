import { useState } from 'react'
import validator from 'validator';
import { data } from 'react-router-dom';
import supabase from './supabase';

const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const URL = import.meta.env.VITE_SUPABASE_URL;

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
    e.preventDefault();

    if (!validator.isEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("Users")
        .select("*")

      console.log("All emails in database:", data);
      
    } catch (err) {
      console.error("Unexpected error:", err);
    }

    console.log("email: ", email);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const hashedPass = await HashPassword(password);

    const { error: signUpError } = await supabase
      .from("Users")
      .insert([{ email: email, password: hashedPass, name: name }]);

    if (signUpError) {
      console.error("Error signing up:", signUpError.message);
      setError("Error signing up: " + signUpError.message);
    } else {
      console.log("User signed up successfully");
      setSignedIn(true);
    }
  };

  return (
    <div className="profile-container">
      <h1>Create account:</h1>
      <div className="form-container">
        <form
          onSubmit={SignUp}
          name="sign-in"
          action=""
          className="sign-up-form"
        >
          <ul>
            <li>
              <p>Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                className="form-item"
                type="text"
                name="name"
                id="name"
              />
            </li>
            <li>
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="form-item"
                type="text"
                name="email"
                id="email"
                required
                onInvalid={(e) => e.target.setCustomValidity('Enter a valid email')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
            </li>
            <li>
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-item"
                type="password"
                name="password"
                id="password"
                required
              />
            </li>
            <li>
              <input id="sign-up-button" type="submit" value="Submit" />
            </li>
          </ul>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  )
}
