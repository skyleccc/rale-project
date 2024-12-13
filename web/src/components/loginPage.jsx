import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
    const navigate = useNavigate();
    const [userForm, setUserForm] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            console.log(userForm);
            const response = await axios.post('http://localhost:8590/user/login', userForm, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/frontPage');
            } else {
                setError('Login failed: ' + response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error logging in. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-screen overflow-hidden">
            <div className="relative bg-white p-10 w-full h-full">
                <div
                    className="absolute font-bold font-archivo-black text-[13vw] tracking-tighter text-gray-200"
                    style={{
                        top: "24%",
                        left: "49%",
                        transform: "translate(-50%, -50%) scaleX(1.4)",
                        whiteSpace: "nowrap",
                    }}>
                    LOGIN
                </div>

                <form onSubmit={handleSubmit} className="bg-gray-200 z-10 flex flex-col p-5 mx-[10%] gap-4 rounded-2xl relative top-[25vh] h-auto">
                    <div className="text-3xl font-bold mx-auto">LOGIN TO YOUR EXISTING ACCOUNT</div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-xl">
                            {error}
                        </div>
                    )}

                    <div>
                        <div className="text-xl font-semibold">Email</div>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={userForm.email}
                            onChange={handleChanges}
                            className="p-3 w-full rounded-xl"
                            required
                        />
                    </div>
                    <div>
                        <div className="text-xl font-semibold">Password</div>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={userForm.password}
                            onChange={handleChanges}
                            className="p-3 w-full rounded-xl"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`bg-gray-200 z-10 my-2 p-3 rounded-2xl w-1/3 mx-auto transition-colors
                            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                    >
                        <div className="text-2xl p-3 rounded-xl bg-gray-300">
                            {isLoading ? "LOGGING IN..." : "LOGIN"}
                        </div>
                    </button>
                    <div className="w-full relative mx-auto grid justify-items-center">
                    <div>Don't Have an Account?
                    <Link to="/registerPage" className="text-sky-600 "> Sign Up</Link></div>
                </div>
                </form>

               
            </div>
        </div>
    );
}

export default LoginPage;