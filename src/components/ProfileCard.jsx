import React from "react";

const ProfileCard = ({ username, age, email, location }) => {
    return (
        <div className="flex flex-col items-center bg-gray-800 text-white rounded-lg shadow-lg p-6 max-w-sm mx-auto gap-y-3">
            {/* Profile Image */}
            <div className="relative w-24 h-24">
                <img
                    src="https://th.bing.com/th/id/OIP.jS5TpucdX1Y0lo3Nw6lf7wHaHV?w=505&h=500&rs=1&pid=ImgDetMain"
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-pink-500"
                />
            </div>

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

