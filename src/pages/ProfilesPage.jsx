import React, { useState, useEffect } from "react";
import SignUpScreen from "./SignInScreen";
import supabase from "./supabase";
import "./ProfileScreenStyle.css";

export default function ProfilesPage({ setSignedIn }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setName(parsedUser.name || "");
      setProfileUrl(parsedUser.profile_url || "");
    }
  }, []);

  if (!localStorage.getItem("user")) {
    return <SignUpScreen setSignedIn={setSignedIn} />;
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user || !user.id) {
      setMessage("User information is missing. Please sign in again.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("Users")
        .update({ name, profile_url: profileUrl })
        .eq("id", user.id);

      if (error) throw error;

      // Update local storage
      const updatedUser = { ...user, name, profile_url: profileUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(`Error updating profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <h1>Edit Profile</h1>

      <div className="profile-container">
        <div className="profile-picture">
          <img
            src={
              profileUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            }
            alt="Profile"
          />
        </div>

        <form onSubmit={handleUpdateProfile} className="profile-form">
          <div className="form-group">
            <label>Profile Picture URL</label>
            <input
              type="text"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="Enter image URL"
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          {message && (
            <p
              className={
                message.includes("Error") ? "error-message" : "success-message"
              }
            >
              {message}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
