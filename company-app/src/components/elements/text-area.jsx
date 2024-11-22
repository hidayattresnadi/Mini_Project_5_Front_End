const TextArea = ({className = "form-control", id, value, onChange, placeholder, required, rows = 4 }) => {
    {className ? className : "form-control"}
    return (
        <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className= {className}
    />
    )
};

export default TextArea;
