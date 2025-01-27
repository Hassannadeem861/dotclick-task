import React from 'react';
import AdminMenu from '../../Components/AdminMenu/AdminMenu';
import { useAuth } from '../../Components/Context-Api/Auth';
import './AdminDashboard.css';

const AdminDashboard = ({ children }) => {
    const [auth] = useAuth();

    return (
        <div>
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3">
                    <AdminMenu />
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
