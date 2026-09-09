import { useLocation, useNavigate, } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function RequireAuth() {
    /* Create a RequireAuth function component that accepts children as props

    Use useAuth() to get the current authentication status
    Use useLocation() to capture the current page location
    Use useNavigate() to programmatically navigate to the login page

    In a useEffect hook, check if the user is not authenticated:
    If not authenticated, navigate to '/login' and pass the current location in state for preservation
    This allows users to return to their intended destination after logging in
    
    Return a loading message while redirecting if not authenticated
    Return the children components if the user is authenticated*/
};

export default RequireAuth;