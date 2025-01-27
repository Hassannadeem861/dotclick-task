import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./User.css";

import AdminDashboard from './AdminDashboard';
const baseUrl = "http://localhost:8080"

const Users = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
        answer: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [user, setUser] = useState([]);

    // GET ALL DATA API CALL
    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/v1/get-all-users"
            );
            setUser(response.data.data);
        } catch (error) {
            toast.error(error.message); // Use error.message instead of response.data.message
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    // POST ALL DATA API CALL
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/api/v1/register`, formData);
            setFormData({
                email: "",
                password: "",
                role: "",
                answer: "",
            });
            if (response.status == 201) {
                toast.success(response?.data?.message);
            } else {
                toast.error(response?.data?.message);
            }
            fetchUsers();
        } catch (error) {
            console.error("create error", error.message);
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    // DELETE ALL DATA API CALL
    const deleteProduct = async (id) => {
        try {
            if (!id) {
                throw new Error("Invalid product ID");
            }
            const response = await axios.delete(
                `http://localhost:8080/api/v1/delete-single-user/${id}`
            );
            console.log("delete response in backend: ", response.data); // API se aya hua response
            if (response.status == 201) {
                toast.success(response?.data?.message);
            } else {
                toast.error(response?.data?.message);
            }
            fetchUsers();
        } catch (error) {
            toast.error(error.message); // Use error.message instead of response.data.message
            console.error("delete error", error);
        }
    };

    // TOGGLE SUSPEND/UNSUSPEND
    const toggleSuspend = async (id, isSuspended) => {
        try {
            const endpoint = isSuspended
                ? `${baseUrl}/api/v1/user/unsuspend/${id}`
                : `${baseUrl}/api/v1/user/suspend/${id}`;

            const response = await axios.post(endpoint);
            if (response.status === 200) {
                toast.success(`User ${isSuspended ? "Unsuspended" : "Suspended"} Successfully!`);
                fetchUsers(); // Refresh user data
            }
        } catch (error) {
            toast.error("Error toggling suspension!");
        }
    };


    let navigate = useNavigate();
    return (
        <AdminDashboard>
            <div className="crud">
                <br />
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="Enter role"
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="answer">Answer:</label>
                        <input
                            type="text"
                            name="answer"
                            value={formData.answer}
                            onChange={handleChange}
                            placeholder="Enter answer"
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>

                <br />
                <br />
                <br />
                <br />

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Role</th>

                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Suspend/Unsuspend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user?.map((item) => (
                            <tr key={item.id}>
                                <td>{item?.id}</td>
                                <td>{item?.email}</td>
                                <td>{item?.role}</td>

                                <td>
                                    <button style={{ backgroundColor: "green", color: "white" }} onClick={() => {
                                        navigate(`/admin/users/update/${item.id}`);
                                    }}>
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        style={{ backgroundColor: "red", color: "white" }}
                                        onClick={() => deleteProduct(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => toggleSuspend(item.id, item.isSuspended)}
                                        style={{
                                            backgroundColor: item.isSuspended ? "red" : "green",
                                            color: "white",

                                        }}
                                    >
                                        {item.isSuspended ? "Unsuspend" : "Suspend"}S
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </AdminDashboard>
    );
};

export default Users;
