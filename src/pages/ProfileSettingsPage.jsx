import React from 'react'

export default function ProfileSettingsPage() {

    const images = ["Anteater","Clown_Fish","Rooster"]

    const changeProfilePicture = () => {
        console.log('change profile picture')
    }

  return (
    <div className='profile-settings-container'>
        <h1>Profile Settings</h1>
        <span>
            <label htmlFor="">Change Profile Picture</label>
            {images.map(image => <img src={`/${image}.jpg`} onClick={changeProfilePicture} />)}
        </span>
    </div>
    
  )
}
