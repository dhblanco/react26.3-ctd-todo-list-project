const TextInputWithLabel = ({ elementId, labelText, onChange, ref, value }) => {
    return (
        <>
            <label htmlFor={elementId}>{labelText}</label>
            <input 
                ref={ref} 
                type="text"
                id={elementId}
                name={elementId}
                value={value}
                onChange={onChange}
            />
        </>
    );
};

export default TextInputWithLabel;