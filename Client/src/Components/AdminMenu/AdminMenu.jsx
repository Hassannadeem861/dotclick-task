

import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminPanel.css'; // Import your custom CSS file

const AdminPanel = () => {
    return (
        <div className="container mt-5">
            <div className="card shadow admin-card">
                <div className="card-body">
                    <h4 className="card-title mb-3 text-center">ADMIN PANEL</h4>
                    <div className="list-group">
                        <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
                            USERS
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;










