import React, {useEffect, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import Authcontext from "../store/Authcontext";
import { Spinner, Alert } from "flowbite-react";
import { BsPatchCheckFill } from "react-icons/bs";

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}
const Logout = () => {
    const [successMessage, setSuccessMessage] = useState([]);
    const authCtx = useContext(Authcontext);
    const navigate = useNavigate();
    useEffect(() => {
        authCtx.logout();
        localStorage.removeItem("token");
        setSuccessMessage("You are logged out Succesfully! You are going to be redirected to the home page.");
        timeout(3000);
        navigate("/");
    }, [authCtx, navigate]);


    return (
        <div>
            <Spinner 
                size="large"
            />
            <Alert color="success" icon={BsPatchCheckFill}>
                {successMessage + "👋Bye Bye👋"}
            </Alert>
        </div>
    );
};

export default Logout;