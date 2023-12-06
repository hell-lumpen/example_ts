// AutocompleteInput.tsx
import React, { useState } from 'react';

interface AutocompleteInputProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    options: string[];
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ name, value, onChange, options }) => {
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toLowerCase();
        const filtered = options.filter((option) => option.toLowerCase().includes(inputValue));
        setFilteredOptions(filtered);
        onChange(e);
    };

    const handleOptionClick = (option: string) => {
        setFilteredOptions([]);
        onChange({ target: { name, value: option } } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div>
            <input
                type="text"
                name={name}
                value={value}
                onChange={handleInputChange}
            />
            <ul>
                {filteredOptions.map((option, index) => (
                    <li key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AutocompleteInput;