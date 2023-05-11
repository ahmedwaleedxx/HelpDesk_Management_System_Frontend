/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect,useState } from "react";
import { Navbar } from "flowbite-react";
import AutheContext from "../../store/Authcontext";
import logo from "../../images/Logo.png";

const Explore = () => {
    const authd = useContext(AutheContext);
    const [expire, setExpire] = useState(false);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await fetch("https://supsys.azurewebsites.net/api/user/getUser", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                const responseData = await response.json();

                if (!response.ok) {
                    if (responseData.error === "jwt expired") {
                        setExpire(true);
                        localStorage.removeItem("token");
                    } else {
                    throw new Error(responseData.message);
                    }
                }
            } catch (err) {
                console.log(err);
            }

        }
        if(localStorage.getItem('token') && expire === false){
            getCurrentUser();
            authd.login(localStorage.getItem('token'));
        }
        if(expire){
            authd.logout();
        }
    },[]);

    return (
        <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="/">
                <img src={logo} 
                    alt="Flowbite"
                    className="mr-2 h-20 sm:h-12"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Supsys
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="/help" className="font-semibold via-black">Help</Navbar.Link>
                {authd.token &&  <Navbar.Link href="/createticket" className="font-semibold via-black">Create Ticket</Navbar.Link>}         
                {!authd.token &&  <Navbar.Link href="/login" className="font-semibold via-black">Login</Navbar.Link>}
                {!authd.token &&  <Navbar.Link href="/signup" className="font-semibold via-black">Signup</Navbar.Link>}
                {authd.token &&  <Navbar.Link href="/mytickets" className="font-semibold via-black">My Tickets</Navbar.Link>}
                {authd.token &&  <Navbar.Link href="/myaccount" className="font-semibold via-black">My Account</Navbar.Link>}
                {authd.token &&  <Navbar.Link href="/logout" className="font-semibold via-black">Logout</Navbar.Link>}      
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Explore;