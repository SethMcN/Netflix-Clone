import React from 'react'
import { useNavigate } from "react-router-dom";

export default function ProfileCard(props) {

  const image = props.image;
  const name = props.name;
  const navigate = useNavigate();

  const profileClick = () => {
    navigate(`/`)
  }
  

  return (
    <div onClick={profileClick} className='profile-card'>
      <img src={`/${image}.jpg`} />
      <h2>{name}</h2>
    </div>
  )
}
