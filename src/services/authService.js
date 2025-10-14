

import { logout as logoutAction } from "../store/authSlice"; // adjust path to your authSlice
import store from "../store/store"; // your Redux store

export const getCurrentUser = async () => {
  let hasLoggedOut = false;
  try {
    console.log("Get current user called");
    
    // Get stored tokens from localStorage if available
    const accessToken = localStorage.getItem('accessToken');
    
    // First attempt
    let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/current-user`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { "Authorization": `Bearer ${accessToken}` })
      },
    });

    // If access token expired, call refresh-token and retry
    if (res.status === 401) {
      console.log("\nRefresh Access Token api called");
      
      // Get stored refresh token from localStorage if available
      const refreshToken = localStorage.getItem('refreshToken');
      
      const refreshRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/refresh-token`,
        {
          method: "POST",
          credentials: "include", // send refresh token cookie
          headers: {
            "Content-Type": "application/json",
            ...(refreshToken && { "Authorization": `Bearer ${refreshToken}` })
          },
          ...(refreshToken && { body: JSON.stringify({ refreshToken }) })
        }
      );

      if (refreshRes.ok) {
        // Store new tokens if they're returned
        const refreshData = await refreshRes.json();
        if (refreshData.data?.accessToken) {
          localStorage.setItem('accessToken', refreshData.data.accessToken);
        }
        if (refreshData.data?.refreshToken) {
          localStorage.setItem('refreshToken', refreshData.data.refreshToken);
        }
        
        // Retry with new token
        const newAccessToken = localStorage.getItem('accessToken');
        res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/current-user`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(newAccessToken && { "Authorization": `Bearer ${newAccessToken}` })
          },
        });
        return res;
      } else {
        // Clear tokens on refresh failure
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        throw new Error("Session expired. Please log in again.");
      }


      // Retry the original request
    }

    // if (!res.ok) return null;

    // const result = await res.json();
    // console.log("Result -> data", result.data);
    // return result.data;
  } catch (error) {
    throw new Error(
      500,
      "Something went wrong while getting info of the current user: " +
        error.message
    );
  }
};

// Add login function to store tokens in localStorage
export const login = async (credentials) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await res.json();
    
    // Store tokens in localStorage as fallback
    if (data.data.accessToken) {
      localStorage.setItem('accessToken', data.data.accessToken);
    }
    if (data.data.refreshToken) {
      localStorage.setItem('refreshToken', data.data.refreshToken);
    }
    
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async () => {
  let hasLoggedOut = false;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Logout failed on the server.");
    }

    // Clear localStorage tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Dispatch logout action to Redux store
    store.dispatch(logoutAction());
    hasLoggedOut = true; // Set the flag to true after successful logout
    return res;
  } catch (error) {
    throw new Error(
      "Something went wrong while logging out: " + error.message
    );
  }
};
