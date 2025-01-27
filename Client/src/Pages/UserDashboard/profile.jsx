import React, { useState, useEffect } from 'react'
import UserDashboard from './UserDashboard'
import { useAuth } from '../../Components/Context-Api/Auth';
import './Profile.css';  // Import custom CSS for styling

const Profile = () => {
    const [auth] = useAuth();
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (auth.user && auth.user.email) {
            setEmail(auth.user.email);
        }
    }, [auth.user]);

    return (
        <UserDashboard>
            <div className="profile-container">
                <div className="profile-card">
                    <h1>Welcome, <span className="profile-name">{auth?.user?.name || 'User'}</span></h1>
                    <p className="profile-email">Your Email: <span>{email}</span></p>

                </div>
            </div>
        </UserDashboard>
    );
}

export default Profile;
