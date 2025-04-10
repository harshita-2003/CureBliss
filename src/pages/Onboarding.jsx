import { usePrivy } from '@privy-io/react-auth';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';

const Onboarding = () => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();
    const { user } = usePrivy();
    
    const { createUser, updateUser, fetchUserByEmail, currentUser } = useStateContext();

    useEffect(() => {
        const userEmail = user?.email?.address;
        if (userEmail) {
            fetchUserByEmail(userEmail);
        }
    }, [user, fetchUserByEmail]);

    useEffect(() => {
        if (currentUser) {
            setUsername(currentUser.username || '');
            setAge(currentUser.age ? currentUser.age.toString() : '');
            setLocation(currentUser.location || '');
        }
    }, [currentUser]);

    const handleOnboarding = async (e) => {
        e.preventDefault();

        const userEmail = user?.email?.address;
        if (!userEmail) {
            console.error("User email is missing!");
            return;
        }

        const userData = {
            username,
            age: parseInt(age, 10),
            location,
            createdBy: userEmail
        };

        if (currentUser) {
            // User exists, update details
            const updatedUser = await updateUser({ id: currentUser.id, ...userData });
            if (updatedUser) navigate('/profile');
        } else {
            // User does not exist, create new user
            const newUser = await createUser(userData);
            if (newUser) navigate('/profile');
        }
    };

    return (
        <div className="flex items-center justify-center bg-[#13131a]">
            <div className="w-full max-w-md rounded-xl bg-[#1c1c24] p-8 shadow-lg md:mt-10">
                <h2 className="mb-2 text-center text-5xl font-bold text-white">👋</h2>
                <h2 className="mb-6 text-center text-2xl font-bold text-white">
                    Welcome! Let's get started
                </h2>
                <form onSubmit={handleOnboarding}>
                    <div className="mb-4">
                        <label htmlFor="username" className="mb-2 block text-sm text-gray-300">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="age" className="mb-2 block text-sm text-gray-300">
                            Age
                        </label>
                        <input
                            id="age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="mb-2 block text-sm text-gray-300">
                            Location
                        </label>
                        <input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        {currentUser ? 'Update Profile' : 'Get Started'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Onboarding;
