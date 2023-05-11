/* eslint-disable react-hooks/exhaustive-deps */

import React, {useState, useEffect, useContext} from "react";
import TicketsList from "../UI/components/Tickets/TicketsList";
import Authcontext from "../store/Authcontext";
import { Navigate } from "react-router-dom";

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const authd = useContext(Authcontext);
    const jwt = authd.token || localStorage.getItem("token");

    useEffect(() => {
    const fetchTickets = async () => {
        try {
            const response = await fetch("https://supsys.azurewebsites.net/api/ticket/getUserTickets", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt
                }
            });
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.error);
            }
            setTickets(responseData.tickets);
        } catch (err) {
            console.log(err);
        }
    };
    fetchTickets();
}, []);

    if(authd.token === null && localStorage.getItem("token") === null){
        return <Navigate to="/login" />
    }
    if(tickets.length === 0){
        return (
            <div className="flex justify-center py-10">
                <h1 className="text-3xl font-bold">You have no tickets yet!</h1>
            </div>
        );
    }
    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            columnCount: "2",
        }}>
        <TicketsList tickets={tickets} />
        </div>
    );
};

export default MyTickets;