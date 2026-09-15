const TextInputWithLabel = ({ 
    elementId, 
    labelText, 
    onChange,
    onBlur, 
    ref, 
    value,
    maxLength,
 }) => {
    return (
        <>
            <label htmlFor={elementId}>{labelText}</label>
            <input 
                ref={ref} 
                type="text"
                id={elementId}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                maxLength={maxLength}
            />
        </>
    );
};

export default TextInputWithLabel;