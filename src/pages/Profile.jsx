import React, { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { db } from "../utils/dbConfig";
import { Users } from "../utils/schema";
import { eq } from "drizzle-orm";
import LoadingPage from "./LoadingPage";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {
    const { user } = usePrivy();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!user || !user.email) return;

            try {
                const userData = await db.select().from(Users).where(eq(Users.createdBy, user.email.address));
                
                if (userData.length > 0) {
                    setProfileData(userData[0]);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [user]);

    return (
        <div className="flex justify-center items-center h-[80vh]">
            {profileData ? (
                <ProfileCard
                    username={profileData.username}
                    age={profileData.age}
                    email={profileData.createdBy}
                    location={profileData.location}
                />
            ) : (
                <LoadingPage />
            )}
        </div>
    );
};

export default Profile;
