import TicketSummary from "./TicketsSummary";

const TicketsList = (props) => {
    return (
    <div className="flex justify-evenly rounded-2xl flex-wrap">
        {props.tickets.map((ticket) => (
            <TicketSummary key={ticket._id} ticket={ticket} />
        ))}
    </div>
    );
};

export default TicketsList;