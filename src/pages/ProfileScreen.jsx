import {React, useState, useEffect} from 'react';
import './ProfileScreenStyle.css';
import { createClient } from '@supabase/supabase-js';

const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const URL = import.meta.env.VITE_SUPABASE_URL;

export default function Profiles() {
  
  const HashPassword = async (message) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    // Convert hash to a hexadecimal string
    const pass =  Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    console.log(pass)
    return pass
  }

  const [email,setEmail] = useState("email@example")
  const [password, setPassword] = useState("123")
  const [name,setName] = useState("user123")

  const supabase = createClient(URL, API_KEY);

  const SignUp = async (e) => {
    e.preventDefault()

    const hashedPass = await HashPassword(password)
    setPassword(hashedPass)

    const { error } = await supabase

      .from('Users')
      .insert([{email: email, password:password, name: name }]);

    if (error) {
      console.error('Error signing up:', error.message);
    } else {
      console.log('User signed up successfully');
    }
  };

  return (
    <div className='profile-container'>
      <h1>Profiles</h1>
      <div className='form-container'>
        <form onSubmit={SignUp} name='sign-in' action="" className='sign-up-form'>
          <ul>
            <li><p>Name</p><input onChange={(e) => setName(e.target.value)} className="form-item" type="text" name="name" id="name"/></li>
            <li><p>Email</p><input onChange={(e) => setEmail(e.target.value)} className="form-item" type="text" name="email" id="email" required /></li>
            <li><p>Password</p><input onChange={(e) => setPassword(e.target.value)} className="form-item" type="password" name="password" id="password" required /></li>
            <li><input type="submit" value="Submit"/></li>
          </ul>
        </form>
      </div>
    </div>
  );
}
