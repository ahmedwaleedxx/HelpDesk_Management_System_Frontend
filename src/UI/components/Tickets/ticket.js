const ticket = (props) => {
    return(
        <div className="flex flex-col rounded-xl bg-white overflow-hidden m-1 truncate text-ellipsis">
            {props.children}
        </div>
    );
};

export default ticket;