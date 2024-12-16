import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    email: "",
    username: "",
    password: "",
    userFirstName: "",
    userLastName: "",
    phonenumber: "" // Note: This field isn't shown in the DB schema but keeping it if needed
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!userForm.userFirstName.trim()) newErrors.userFirstName = "First name is required";
    if (!userForm.userLastName.trim()) newErrors.userLastName = "Last name is required";
    if (!userForm.username.trim()) newErrors.username = "Username is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userForm.email)) {
      newErrors.email = "Invalid email format";
    }

    if (userForm.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(userForm.phonenumber)) {
      newErrors.phonenumber = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      // 1. Register the user with exact field names matching DB schema
      const registerResponse = await axios.post("http://localhost:8590/user/register", {
        email: userForm.email,
        username: userForm.username,
        password: userForm.password,
        userFirstName: userForm.userFirstName,  // Changed from firstname to userFirstName
        userLastName: userForm.userLastName,    // Changed from lastname to userLastName
        phoneNumber: userForm.phonenumber       // Kept if still needed by API
      });

      if (registerResponse.status === 200) {
        // 2. Login the user
        const loginResponse = await axios.post("http://localhost:8590/user/login", {
          email: userForm.email,
          password: userForm.password
        });

        if (loginResponse.status === 200) {
          const { token, userID } = loginResponse.data;
          localStorage.setItem("token", token);
      
          try {
            const cartToken = localStorage.getItem('token');
            const cartResponse = await axios.post(
              "http://localhost:8590/shoppingCart/add",
              {},  
              {
                headers: {
                  'Authorization': `${cartToken}`
                }
              }
            );

            if (cartResponse.status === 200) {
              console.log("Shopping cart initialized successfully");
            }
          } catch (cartError) {
            console.error("Shopping cart initialization failed:", cartError.response?.data || cartError.message);
            // You might want to show this error to the user
            setErrors(prev => ({
              ...prev,
              submit: "Account created but shopping cart initialization failed. Please try again later."
            }));
          }

          // 4. Navigate to front page
          navigate("/frontPage");
        }
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setErrors({
        submit: error.response?.data?.error || "Registration failed. Please try again."
      });
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="relative bg-white p-10 w-full h-full">
        <div
          className="absolute font-bold font-archivo-black text-[12vw] tracking-tighter text-gray-200"
          style={{
            top: "15%",
            left: "49%",
            transform: "translate(-50%, -50%) scaleX(1.4)",
            whiteSpace: "nowrap",
          }}
        >
          REGISTER
        </div>
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-200 z-10 flex flex-col p-5 mx-[10%] gap-4 rounded-2xl relative top-[16vh] h-auto">
            <div className="text-3xl font-bold mx-auto">CREATE A NEW ACCOUNT</div>
  
            {/* First Name */}
            <div>
              <div className="text-lg font-semibold">First Name</div>
              <input
                type="text"
                placeholder="First Name"
                name="userFirstName"
                value={userForm.userFirstName}
                onChange={handleChanges}
                className={`p-2 w-full rounded-xl ${errors.userFirstName ? 'border-red-500' : ''}`}
              />
              {errors.userFirstName && <span className="text-red-500 text-sm">{errors.userFirstName}</span>}
            </div>
  
            {/* Last Name */}
            <div>
              <div className="text-lg font-semibold">Last Name</div>
              <input
                type="text"
                placeholder="Last Name"
                name="userLastName"
                value={userForm.userLastName}
                onChange={handleChanges}
                className={`p-2 w-full rounded-xl ${errors.userLastName ? 'border-red-500' : ''}`}
              />
              {errors.userLastName && <span className="text-red-500 text-sm">{errors.userLastName}</span>}
            </div>
  
            {/* Username and Password (Responsive) */}
            <div className="flex flex-col sm:flex-row w-full gap-7">
              <div className="w-full sm:w-1/2">
                <div className="text-lg font-semibold">Username</div>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={userForm.username}
                  onChange={handleChanges}
                  className={`p-2 w-full rounded-xl ${errors.username ? 'border-red-500' : ''}`}
                />
                {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
              </div>
  
              <div className="w-full sm:w-1/2">
                <div className="text-lg font-semibold">Password</div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={userForm.password}
                    onChange={handleChanges}
                    className={`p-2 w-full rounded-xl ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>
            </div>
  
            {/* Email Address and Phone Number (Responsive) */}
            <div className="flex flex-col sm:flex-row w-full gap-7">
              <div className="w-full sm:w-1/2">
                <div className="text-lg font-semibold">Email Address</div>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={userForm.email}
                  onChange={handleChanges}
                  className={`p-2 w-full rounded-xl ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>
  
              <div className="w-full sm:w-1/2">
                <div className="text-lg font-semibold">Phone Number</div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phonenumber"
                  value={userForm.phonenumber}
                  onChange={handleChanges}
                  className={`p-2 w-full rounded-xl ${errors.phonenumber ? 'border-red-500' : ''}`}
                />
                {errors.phonenumber && <span className="text-red-500 text-sm">{errors.phonenumber}</span>}
              </div>
            </div>
  
            {/* Submit Error */}
            {errors.submit && (
              <div className="text-red-500 text-center mt-4">{errors.submit}</div>
            )}
  
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gray-300 z-10 my-2 p-3 grid justify-items-center gap-2 rounded-2xl w-full md:w-1/3 mx-auto relative h-auto hover:bg-gray-400 transition-colors"
            >
              <div className="text-2xl">REGISTER</div>
            </button>
  
            {/* Already have an Account Link */}
            <div className="w-full relative left-7 md:left-0 mx-auto grid justify-items-center">
              <div>
                Already Have an Account?{" "}
                <Link to="/loginPage" className="text-sky-600">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export default RegisterPage;