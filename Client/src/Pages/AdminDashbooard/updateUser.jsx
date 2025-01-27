import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./update.css";
import { useParams, useNavigate } from "react-router-dom";
import AdminMenu from '../../Components/AdminMenu/AdminMenu';

const updateUser = () => {
    const navigate = useNavigate();

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


    const params = useParams();
    console.log("params single product response id in backend: ", params);


    const getSingleUserData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/v1/get-single-user/${params.id}`
            );
            console.log("get single data response in backend: ", response?.data);
            // if (response.status == 201) {
            //     toast.success(response?.data?.message);
            // } else {
            //     toast.error(response?.data?.message);
            // }
        } catch (error) {
            console.error("GET SINGLE DATA", error);
        }
    };

    useEffect(() => {
        getSingleUserData();
    }, [params.id]);


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (!params.id) {
                throw new Error("Invalid product ID");
            }
            const updateResponse = await axios.put(
                `http://localhost:8080/api/v1/update-single-user/${params.id}`,
                formData
            );
            console.log(
                "update single product in backend updateResponse :",
                updateResponse
            );
            if (updateResponse.status === 200) {
                toast.success(updateResponse.data.message); // Assuming you have a toast.success method
                navigate("/dashboard/admin/users"); // Navigate to home page upon successful update
            } else {
                toast.error("Failed to update product");
            }
        } catch (error) {
            toast.error(error.message);
            console.error("update error :", error);
        }
    };

    return (
        <div style={{ minHeight: "100vh" }}>
            <br />
            <br />
            <form onSubmit={submitHandler} className="form-container">
                <h2>Update user</h2>

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
                    Update
                </button>
            </form>
            <br />
            <br />
            <br />
        </div>
    )
}

export default updateUser
