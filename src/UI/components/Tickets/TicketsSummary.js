import Ticketaction from "./Ticketaction";
import Ticketbody from "./Ticketbody";
import TicketHeader from "./Ticketheader";
import Ticket from "./ticket";
import { Button } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const TicketSummary = (props) => {
    const navigate = useNavigate();
    const btnOnClickHandler = () => {
        navigate(`/tickets/${props.ticket._id}`);
    };

    return (
            <Ticket>
                <TicketHeader title={props.ticket.title} status={props.ticket.status} />
                <Ticketbody body={props.ticket.body}/>
                <Ticketaction>
                    <Button onClick={btnOnClickHandler}>
                        View
                    </Button>
                </Ticketaction>
            </Ticket>
    );
};

export default TicketSummary;