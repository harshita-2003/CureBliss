import React from "react";

const LoadingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
                <img
                    src="https://cdnl.iconscout.com/lottie/premium/thumb/loader-dot-dark-point-animation-6790347-5577789.gif"
                    alt="Loading"
                    className="w-32 h-32 animate-pulse rounded-full border-gray-300"
                />
                <h2 className="text-lg font-semibold text-gray-700 mt-4">Fetching your profile...</h2>
            </div>
        </div>
    );
};

export default LoadingPage;
