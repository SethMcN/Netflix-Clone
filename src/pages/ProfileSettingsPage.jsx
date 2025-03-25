import React, { useState, useEffect } from "react";

export default function ProfileSettingsPage(props) {
  const { profile, onSave, onCancel } = props;
  const images = ["Anteater", "Clown_Fish", "Rooster"];

  const [selectedImage, setSelectedImage] = useState(
    profile?.image || "Anteater"
  );
  const [profileName, setProfileName] = useState(profile?.name || "User");

  useEffect(() => {
    if (profile) {
      setSelectedImage(profile.image || "Anteater");
      setProfileName(profile.name || "User");
    }
  }, [profile]);

  const changeProfilePicture = (image) => {
    setSelectedImage(image);
  };

  const handleNameChange = (e) => {
    setProfileName(e.target.value);
  };

  const saveProfile = () => {
    const updatedProfile = {
      name: profileName,
      image: selectedImage,
      watchList: profile?.watchList || [],
    };

    onSave(updatedProfile);
  };

  return (
    <div className="profile-settings-container">
      <h1>Profile Settings</h1>
      <div className="profile-form">
        <button className="close-settings" onClick={onCancel}>
          Close
        </button>

        <div className="profile-name-section">
          <label htmlFor="profileName">Profile Name</label>
          <input
            type="text"
            id="profileName"
            value={profileName}
            onChange={handleNameChange}
            maxLength={20}
          />
        </div>

        <div className="profile-picture-section">
          <label>Choose Profile Picture</label>
          <div className="profile-images">
            {images.map((image) => (
              <img
                key={image}
                src={`/${image}.jpg`}
                alt={image}
                className={selectedImage === image ? "selected" : ""}
                onClick={() => changeProfilePicture(image)}
              />
            ))}
          </div>
        </div>

        <button className="save-profile" onClick={saveProfile}>
          Save Profile
        </button>
      </div>
    </div>
  );
}
