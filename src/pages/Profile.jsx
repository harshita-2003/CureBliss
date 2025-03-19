import React, { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { db } from "../utils/dbConfig";
import { Users } from "../utils/schema";
import { eq } from "drizzle-orm";

const Profile = () => {
    const { user } = usePrivy();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!user || !user.email) return;

            try {
                const userData = await db.select().from(Users).where(eq(Users.createdBy, user.email.address));
                
                if (userData.length > 0) {
                    setProfileData(userData[0]); // Assuming unique email constraint
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [user]);

    return (
        <div>
            <h2>Profile</h2>
            {profileData ? (
                <div>
                    <p><strong>Username:</strong> {profileData.username}</p>
                    <p><strong>Age:</strong> {profileData.age}</p>
                    <p><strong>Location:</strong> {profileData.location}</p>
                    <p><strong>Email:</strong> {profileData.createdBy}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
