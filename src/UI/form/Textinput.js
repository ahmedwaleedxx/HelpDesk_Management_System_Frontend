const TextInput = (props) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-white">{props.label}</label>
            <input
                type={props.type}
                placeholder={props.placeholder}
                {...props.register(props.label, props.validation)}
            />
        </div>
    );
};

export default TextInput;