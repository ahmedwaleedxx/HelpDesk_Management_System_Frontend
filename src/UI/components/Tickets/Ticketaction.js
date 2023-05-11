const Ticketaction = (props) => {
    return(
        <div style={{
            height: "100%",
            padding: "20px 15px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
        }}>
            {props.children}
        </div>
    ); 
};

export default Ticketaction;