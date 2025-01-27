import React from 'react';
import UserMenu from '../../Components/UserMenu/UserMenu.jsx';
import { useAuth } from '../../Components/Context-Api/Auth';
import './UserDashboard.css'; // Import your custom CSS file

const AdminDashboard = ({ children }) => {
    const [auth] = useAuth();

    return (
        <div>
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3">
                    <UserMenu />
                </div>

                {/* Main Content */}
                <div className="col-md-9">
                    {children}
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
