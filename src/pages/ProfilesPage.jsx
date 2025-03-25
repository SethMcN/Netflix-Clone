import React, { useState, useEffect } from "react";
import SignUpScreen from "./SignInScreen";
import ProfileCard from "./ProfileCard";
import ProfileSettingsPage from "./ProfileSettingsPage";
import supabase from "./supabase";
import "./ProfileScreenStyle.css";

export default function ProfilesPage(props) {
  const setActiveProfile = props.setActiveProfile;
  const { setSignedIn } = props;
  const [profiles, setProfiles] = useState([]);
  const [showSettingsPage, setShowSettingsPage] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          setUser(userData);

          const { data, error } = await supabase
            .from("Users")
            .select("profiles")
            .eq("id", userData.id)
            .single();

          if (error) {
            console.error("Error fetching profiles:", error);
            return;
          }

          if (data && data.profiles) {
            const profilesWithIds = data.profiles.map((profile) =>
              profile.id ? profile : { ...profile, id: generateId() }
            );
            setProfiles(profilesWithIds);
          } else if (userData.profiles) {
            const profilesWithIds = userData.profiles.map((profile) =>
              profile.id ? profile : { ...profile, id: generateId() }
            );
            setProfiles(profilesWithIds);
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    };

    fetchUserProfiles();
  }, []);

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleSettingsClick = () => {
    setShowSettingsPage(true);
    setSelectedProfile(null);
  };

  if (!localStorage.getItem("user")) {
    return <SignUpScreen setSignedIn={setSignedIn} />;
  }

  const handleProfileEdit = (profile, index) => {
    setSelectedProfile({ ...profile, index });
    setShowSettingsPage(true);
  };

  const handleUpdateProfile = async (updatedProfile) => {
    const newProfiles = [...profiles];

    if (selectedProfile && selectedProfile.index !== undefined) {
      newProfiles[selectedProfile.index] = {
        ...updatedProfile,
        id: selectedProfile.id || generateId(),
      };
    } else {
      newProfiles.push({
        ...updatedProfile,
        id: generateId(),
      });
    }

    setProfiles(newProfiles);

    if (user) {
      console.log("Updating profiles in database:", newProfiles);
      const { error } = await supabase
        .from("Users")
        .update({ profiles: newProfiles })
        .eq("id", user.id);

      if (error) {
        console.error("Error updating profiles in database:", error);
      }

      const updatedUser = { ...user, profiles: newProfiles };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    localStorage.setItem("userProfiles", JSON.stringify(newProfiles));
    setShowSettingsPage(false);
    setSelectedProfile(null);
  };

  const userName = user ? user.name : "";

  return (
    <div className="profiles-container">
      <h1>Hi {userName} who's watching?</h1>
      <div className="profiles">
        {profiles.map((profile, index) => (
          <ProfileCard
            key={profile.id || index}
            name={profile.name}
            image={profile.image}
            onEdit={() => handleProfileEdit(profile, index)}
            onClick={() => {
              setActiveProfile(profile); // Set the active profile
              localStorage.setItem(
                "currentProfile",
                JSON.stringify({
                  name: profile.name,
                  id: profile.id,
                  key: index,
                })
              );
            }}
          />
        ))}
        <div onClick={handleSettingsClick}>Add Profile</div>
      </div>
      {showSettingsPage && (
        <ProfileSettingsPage
          profile={selectedProfile}
          profiles={profiles}
          onSave={handleUpdateProfile}
          onCancel={() => {
            setShowSettingsPage(false);
            setSelectedProfile(null);
          }}
        />
      )}
    </div>
  );
}
