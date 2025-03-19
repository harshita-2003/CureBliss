import React, { useState } from "react";

const ProfileCard = ({ username, age, email, location }) => {

    const storedImage = localStorage.getItem("profileImage");

    const [profileImage, setProfileImage] = useState(
        storedImage || "https://th.bing.com/th/id/OIP.jS5TpucdX1Y0lo3Nw6lf7wHaHV?w=505&h=500&rs=1&pid=ImgDetMain"
    );

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setProfileImage(imageUrl);
                localStorage.setItem("profileImage", imageUrl);
            };
            reader.readAsDataURL(file); // Convert image to Base64
        }
    };

    const triggerFileInput = () => {
        document.getElementById("imageUpload").click();
    };

    return (
        <div className="flex flex-col items-center bg-gray-800 text-white rounded-lg shadow-lg p-6 max-w-sm mx-auto gap-y-3">
            {/* Profile Image */}
            <div className="w-24 h-24">
                <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-pink-500"
                />
            </div>

            {/* Hidden File Input */}
            <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
            />

            {/* Choose Profile Button */}
            <button 
                onClick={triggerFileInput} 
                className="mt-2 border-2 border-pink-400 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600 transition">
                Choose Profile
            </button>

            <h2 className="text-lg font-semibold mt-4">{username}</h2>
            <p className="text-sm text-gray-400">{email}</p>
            <p className="text-sm mt-1">{location} | Age: {age}</p>

            <div className="bg-pink-500 text-white text-sm py-2 px-4 rounded-full mt-4">
                Have a great Health buddy !!
            </div>
        </div>
    );
};

export default ProfileCard;
