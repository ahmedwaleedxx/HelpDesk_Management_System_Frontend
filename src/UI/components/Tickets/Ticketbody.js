import React from 'react';

const Ticketbody = (props) => {
    return(
        <div className="max-w-md text-ellipsis" style={{
            height: "100%",
            padding: "20px 10px",
            paddingLeft: "1cm",
            borderTop: "1px solid #e2e8f0",
            borderBottom: "1px solid #e2e8f0",
            flex: "0 1 auto",
        }}>
            {props.body}
        </div>
    ); 
};

export default Ticketbody;