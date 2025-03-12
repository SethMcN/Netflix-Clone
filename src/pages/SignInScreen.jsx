import { React, useState, useEffect } from "react";
import "./ProfileScreenStyle.css";
import CreateAccountFunction from "./CreateAccountFunction"
import "./SignUpScreen.css"

export default function SignUpScreen(props) {

  const [screenOption,setScreenOption] = useState("option-screen")

  const [email, setEmail] = useState("email@example");
  const [password, setPassword] = useState("123");

  const setSignedIn = props.setSignedIn;

  if (screenOption == "create-account-screen"){
    return(<CreateAccountFunction setSignedIn={setSignedIn}/>)
  }

  if (screenOption == "option-screen"){
  return (
   <div className="sign-in-div">
    <form

      name="sign-in"
      action=""
      className="sign-in-form"
    >
        <span className="sign-in-input-span">
          <label className="label" htmlFor="">Password</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className=""
            type="text"
            name="email"
            id="email"
            required
            onInvalid={(e) => e.target.setCustomValidity('Enter a valid email')}
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </span>
        <span className="sign-in-input-span">
          <label className="label" htmlFor="">Password</label>
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

     
    </form>
    <button onClick={() => {setScreenOption("create-account-screen")}}><p>Create account</p></button>
   </div>
  );}
}
