import React, { useState } from 'react'
import SignUpScreen from './SignInScreen'
import ProfileCard from './ProfileCard';
import ProfileSettingsPage from './ProfileSettingsPage';
import './ProfileScreenStyle.css'

export default function ProfilesPage(props) {

    const {signedIn, setSignedIn } = props;
    const [profiles, setProfiles] = useState([{image:"Anteater",name:"dave",watchList:["matrix"]},{image:"Rooster",name:"bob",watchList:["superman"]}]);
    const [showSettingsPage, setShowSettingsPage] = useState(false);

    const handleSettingsClick = () =>{
      setShowSettingsPage(true)
    }

    if (signedIn) {
        return <SignUpScreen setSignedIn={setSignedIn} />;
    } 
    
      return (
          <div className='profiles-container'>
            <h1>Hi {} who's watching?</h1>
            <div className='profiles'>
              {profiles.map(profile => (
                <ProfileCard 
                  key={profile.name} 
                  name={profile.name} 
                  image={profile.image} 
                />
              ))}
              <div>Add Profile</div>
              <div>Add Profile</div>
              <div onClick={handleSettingsClick}>settings</div>
            </div>
            {showSettingsPage && <ProfileSettingsPage />}
          </div>
        );
    }