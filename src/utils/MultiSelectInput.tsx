// MultiSelectInput.tsx
import React from 'react';

interface MultiSelectInputProps {
    name: string;
    value: string[];
    onChange: (selected: string[]) => void;
    options: string[];
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({ name, value, onChange, options }) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        onChange(selectedOptions);
    };

    return (
        <select
            name={name}
            value={value}
            onChange={handleSelectChange}
            multiple
        >
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default MultiSelectInput;