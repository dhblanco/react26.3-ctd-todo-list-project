import { useState, useEffect } from "react";

// function receives
//  value -> what we're watching
//  delay -> how long to wait
function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
    
        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);

    return debounceValue;
};

export default useDebounce;