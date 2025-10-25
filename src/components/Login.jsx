// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { login as authLogin } from "../store/authSlice";
// import { Button, Input, Logo } from "./index";
// import { useDispatch } from "react-redux";
// // import authService from "../appwrite/auth";
// import { useForm } from "react-hook-form";

// class ApiError extends Error {
//   constructor(statusCode, message = "Something went wrong") {
//     super(message);
//     this.statusCode = statusCode;
//     this.message = message;
//     this.success = false;
//     this.errors = [];
//   }
// }

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [error, setError] = useState("");
//   console.log("Error: ", error)

//   const login = async (data) => {
//     setError("");
//     try {
//       console.log("Login function called with data:", data);
//       console.log("Attempting to send login request to:", `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`);
//       console.log("Request options:", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data),
//       });
//       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`, {
//         method: "POST",
//         credentials: "include",
//         headers:{
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data),
//       })
//       console.log("Login request response:", res);
//       const result = await res.json();
//       console.log("Login request result:", result);
//       setError(result.message)
//       if(!res.ok){
//         throw new ApiError( result.message || "Login failed!!!")
//       }
//       dispatch(authLogin({ user: result.user, token: result.token }));

//       navigate('/')
//       return res
//       .status(200)

//     } catch (error) {
//       setError(error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-indigo-50 to-white px-4">
//       <div className="mx-auto w-full max-w-md bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
//         { /* Logo */ }
//         <div className="mb-6 flex justify-center">
//           <span className="inline-block w-full max-w-[90px]">
//             <Logo width="100%" />
//           </span>
//         </div>

//         {/* Heading */}
//         <h2 className="text-center text-2xl font-bold text-gray-900">
//           Sign in to your account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Don&apos;t have an account?{" "}
//           <Link
//             to="/signup"
//             className="font-semibold text-indigo-600 hover:underline transition-colors duration-200"
//           >
//             Sign Up
//           </Link>
//         </p>

//         {/* Error message */}
//         {error && (
//           <p className="text-red-500 mt-6 text-center text-sm font-medium">
//             {error}
//           </p>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit(login)} className="mt-6">
//           <div className="space-y-5">
//             <Input
//               label="Email"
//               placeholder="Enter your email"
//               type="email"
//               error={errors.email?.message}
//               {...register("email", {
//                 required: "Email is required",
//                 validate: {
//                   matchPattern: (value) =>
//                     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                     "Enter a valid email address",
//                 },
//               })}
//             />

//             <Input
//               label="Password"
//               type="password"
//               placeholder="Enter your password"
//               error={errors.password && "Password is required"}
//               {...register("password", {
//                 required: true,
//               })}
//             />

//             <Button
//               type="submit"
//               className="w-full shadow-md hover:shadow-lg transition-all duration-200"
//             >
//               Sign In
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { login as authLogin } from "../store/authSlice";
// import { Button, Input, Logo } from "./index";
// import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";

// class ApiError extends Error {
//   constructor(statusCode, message = "Something went wrong") {
//     super(message);
//     this.statusCode = statusCode;
//     this.message = message;
//     this.success = false;
//     this.errors = [];
//   }
// }

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError: setFieldError,
//     clearErrors,
//   } = useForm();
//   const [generalError, setGeneralError] = useState("");

//   const login = async (data) => {
//     clearErrors(); // Clear previous field errors
//     setGeneralError(""); // Clear previous general errors

//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`,
//         {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       const result = await res.json();

//       if (!res.ok) {
//         // Backend sends meaningful messages like:
//         // "User does not exist" or "Invalid user credentials"
//         if (result.message.includes("does not exist")) {
//           setFieldError("email", { type: "manual", message: result.message });
//         } else if (result.message.includes("credentials")) {
//           setFieldError("password", { type: "manual", message: result.message });
//         } else {
//           setGeneralError(result.message || "Login failed!");
//         }
//         return;
//       }

//       // If login is successful
//       dispatch(authLogin({ user: result.user, token: result.token }));
//       navigate("/");
//     } catch (error) {
//       console.error("Login error:", error);
//       setGeneralError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-indigo-50 to-white px-4">
//       <div className="mx-auto w-full max-w-md bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
//         {/* Logo */}
//         <div className="mb-6 flex justify-center">
//           <span className="inline-block w-full max-w-[90px]">
//             <Logo width="100%" />
//           </span>
//         </div>

//         {/* Heading */}
//         <h2 className="text-center text-2xl font-bold text-gray-900">
//           Sign in to your account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Don&apos;t have an account?{" "}
//           <Link
//             to="/signup"
//             className="font-semibold text-indigo-600 hover:underline transition-colors duration-200"
//           >
//             Sign Up
//           </Link>
//         </p>

//         {/* General error */}
//         {generalError && (
//           <p className="text-red-500 mt-4 text-center text-sm font-medium">
//             {generalError}
//           </p>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit(login)} className="mt-6">
//           <div className="space-y-5">
//             <Input
//               label="Email"
//               placeholder="Enter your email"
//               type="email"
//               error={errors.email?.message}
//               {...register("email", {
//                 required: "Email is required",
//                 validate: {
//                   matchPattern: (value) =>
//                     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                     "Enter a valid email address",
//                 },
//               })}
//             />

//             <Input
//               label="Password"
//               type="password"
//               placeholder="Enter your password"
//               error={errors.password?.message}
//               {...register("password", {
//                 required: "Password is required",
//               })}
//             />

//             <Button
//               type="submit"
//               className="w-full shadow-md hover:shadow-lg transition-all duration-200"
//             >
//               Sign In
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { login as authLogin } from "../store/authSlice";
// import { Button, Input, Logo } from "./index";
// import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError: setFieldError,
//     clearErrors,
//   } = useForm();
//   const [generalError, setGeneralError] = useState("");
//   console.log("\nGeneral error inside login.jsx:", generalError)

//   const login = async (data) => {
//     clearErrors(); // clear previous field errors
//     setGeneralError(""); // clear previous general errors

//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`,
//         {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         }
//       );

//       const result = await res.json();

//       if (!res.ok) {
//         // Map backend errors to fields
//         const errorMsg = result.message || result.error;
//         if (errorMsg.includes("does not exist")) {
//           setFieldError("email", {
//             type: "manual",
//             message: "The user doesn't exist",
//           });
//         } else if (
//           errorMsg.includes("credentials") ||
//           errorMsg.includes("password")
//         ) {
//           setFieldError("password", {
//             type: "manual",
//             message: "Password is incorrect",
//           });
//         } else {
//           setGeneralError("Login failed!");
//         }
//         return;
//       }

//       // Successful login
//       dispatch(authLogin({ user: result.user, token: result.token }));
//       navigate("/");
//     } catch (err) {
//       console.error("Login error:", err);
//       setGeneralError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-indigo-50 to-white px-4">
//       <div className="mx-auto w-full max-w-md bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
//         {/* Logo */}
//         <div className="mb-6 flex justify-center">
//           <span className="inline-block w-full max-w-[90px]">
//             <Logo width="100%" />
//           </span>
//         </div>

//         {/* Heading */}
//         <h2 className="text-center text-2xl font-bold text-gray-900">
//           Sign in to your account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Don&apos;t have an account?{" "}
//           <Link
//             to="/signup"
//             className="font-semibold text-indigo-600 hover:underline transition-colors duration-200"
//           >
//             Sign Up
//           </Link>
//         </p>

//         {/* General error */}
//         {generalError && (
//           <p className="text-red-500 mt-4 text-center text-sm font-medium">
//             {generalError}
//           </p>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit(login)} className="mt-6">
//           <div className="space-y-5">
//             <Input
//               label="Email"
//               placeholder="Enter your email"
//               type="email"
//               error={errors.email?.message}
//               {...register("email", {
//                 required: "Email is required",
//                 validate: (value) =>
//                   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                   "Enter a valid email address",
//               })}
//             />

//             <Input
//               label="Password"
//               type="password"
//               placeholder="Enter your password"
//               error={errors.password?.message}
//               {...register("password", {
//                 required: "Password is required",
//               })}
//             />

//             <Button
//               type="submit"
//               className="w-full shadow-md hover:shadow-lg transition-all duration-200"
//             >
//               Sign In
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { login as authLogin } from "../store/authSlice";
// import { Button, Input, Logo } from "./index";
// import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//     clearErrors,
//   } = useForm();
//   const [generalError, setGeneralError] = useState("");

//   const login = async (data) => {
//     clearErrors(); // clear previous field errors
//     setGeneralError(""); // clear previous general errors

//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`,
//         {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         }
//       );

//       const result = await res.json();

//       if (!res.ok) {
//         const msg = result.message || result.error || "Login failed";

//         // Map backend messages to fields
//         if (msg.toLowerCase().includes("does not exist")) {
//           setError("email", { type: "manual", message: "The user doesn't exist" });
//         } else if (msg.toLowerCase().includes("credentials") || msg.toLowerCase().includes("password")) {
//           setError("password", { type: "manual", message: "Password is incorrect" });
//         } else {
//           setGeneralError(msg);
//         }
//         return;
//       }

//       // Successful login
//       dispatch(authLogin({ user: result.user, token: result.token }));
//       navigate("/");
//     } catch (err) {
//       console.error("Login error:", err);
//       setGeneralError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-indigo-50 to-white px-4">
//       <div className="mx-auto w-full max-w-md bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
//         {/* Logo */}
//         <div className="mb-6 flex justify-center">
//           <span className="inline-block w-full max-w-[90px]">
//             <Logo width="100%" />
//           </span>
//         </div>

//         {/* Heading */}
//         <h2 className="text-center text-2xl font-bold text-gray-900">
//           Sign in to your account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Don&apos;t have an account?{" "}
//           <Link to="/signup" className="font-semibold text-indigo-600 hover:underline transition-colors duration-200">
//             Sign Up
//           </Link>
//         </p>

//         {/* General error */}
//         {generalError && (
//           <p className="text-red-500 mt-4 text-center text-sm font-medium">
//             {generalError}
//           </p>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit(login)} className="mt-6">
//           <div className="space-y-5">
//             <Input
//               label="Email"
//               placeholder="Enter your email"
//               type="email"
//               error={errors.email?.message}
//               {...register("email", {
//                 required: "Email is required",
//                 validate: (value) =>
//                   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Enter a valid email address",
//               })}
//             />

//             <Input
//               label="Password"
//               type="password"
//               placeholder="Enter your password"
//               error={errors.password?.message}
//               {...register("password", {
//                 required: "Password is required",
//               })}
//             />

//             <Button
//               type="submit"
//               className="w-full shadow-md hover:shadow-lg transition-all duration-200"
//             >
//               Sign In
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = [];
  }
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Login response:", result);

      // ✅ Fix: show backend message correctly
      if (!res.ok) {
        // result.message exists -> show in UI
        setError(result.message || "Login failed!");
        throw new ApiError(res.status, result.message || "Login failed!");
      }

      // ✅ Success: dispatch and navigate
      dispatch(authLogin({ user: result.user, token: result.token }));
      navigate("/");

    } catch (err) {
      // ✅ Fix: handle all error types safely
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="mx-auto w-full max-w-md bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[90px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:underline transition-colors duration-200"
          >
            Sign Up
          </Link>
        </p>

        {/* ✅ Show backend error */}
        {error && (
          <p className="text-red-500 mt-6 text-center text-sm font-medium">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-6">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Enter a valid email address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password && "Password is required"}
              {...register("password", {
                required: true,
              })}
            />

            <Button
              type="submit"
              className="w-full shadow-md hover:shadow-lg transition-all duration-200"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
