import React from 'react'
import SignUpScreen from './SignInScreen'

export default function ProfilesPage(props) {

    const { signedIn, setSignedIn } = props;

    if (!signedIn) {
        return <SignUpScreen setSignedIn={setSignedIn} />;}

    else{
    return (
    <div>ProfilesPage</div>
  )}
}
