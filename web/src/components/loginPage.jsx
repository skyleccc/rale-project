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
                localStorage.setItem('userId',response.data.userId);
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
            <div className="relative top-[20vh] md:top-[22vh] bg-white p-5 md:p-10 w-full h-full">
               <div className="absolute left-[50%]">
               <div
                    className="absolute font-bold font-archivo-black text-[18vw] md:text-[13vw] tracking-tighter text-gray-200"
                    style={{
                        top: "20%", // Default for mobile
                        left: "50%",
                        transform: "translate(-50%, -50%) scaleX(1.4)"
                    }}>
                    LOGIN
                </div>
               </div>
    
                <form onSubmit={handleSubmit} className="bg-gray-200 z-10 flex flex-col p-3 md:p-5 mx-[5%] md:mx-[10%] gap-3 md:gap-4 rounded-xl md:rounded-2xl relative top-[7vh] md:top-[6vh] h-auto">
                    <div className="text-xl md:text-3xl font-bold mx-auto text-center">LOGIN TO YOUR EXISTING ACCOUNT</div>
    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 md:px-4 md:py-2 rounded-lg md:rounded-xl">
                            {error}
                        </div>
                    )}
    
                    <div>
                        <div className="text-base md:text-xl font-semibold">Email</div>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={userForm.email}
                            onChange={handleChanges}
                            className="p-2 md:p-3 w-full rounded-lg md:rounded-xl"
                            required
                        />
                    </div>
                    <div>
                        <div className="text-base md:text-xl font-semibold">Password</div>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={userForm.password}
                            onChange={handleChanges}
                            className="p-2 md:p-3 w-full rounded-lg md:rounded-xl"
                            required
                        />
                    </div>
    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`bg-gray-200 z-10 my-2 p-2 md:p-3 rounded-lg md:rounded-2xl w-1/2 md:w-1/3 mx-auto transition-colors
                            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                    >
                        <div className="text-base md:text-2xl p-2 md:p-3 rounded-lg md:rounded-xl bg-gray-300">
                            {isLoading ? "LOGGING IN..." : "LOGIN"}
                        </div>
                    </button>
    
                    <div className="w-full relative mx-auto grid justify-items-center">
                        <div className="text-sm md:text-base">Don't Have an Account?
                            <Link to="/registerPage" className="text-sky-600"> Sign Up</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default LoginPage;