import React, { useState, ChangeEvent } from 'react';
import styles from './Input.module.css';

interface InputProps {
    placeholder: string;
    type: string;
    inputValueState?: [string, React.Dispatch<React.SetStateAction<string>>];
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showClearButton?: boolean;
    validate?: (value: string) => boolean;
}

const Input: React.FC<InputProps> = ({
                                         placeholder,
                                         type,
                                         inputValueState = ['', () => {}],
                                         onChange,
                                         showClearButton,
                                         validate,
                                     }) => {

    const [inputValue, setInputValue] = inputValueState;
    const [isValid, setValid] = useState(true);

    const handleClearClick = () => {
        setInputValue('');
    };

    return (
        <div className={styles.inputContainer}>
            <input
                className={isValid ? styles.validInput : styles.invalidInput}
                placeholder={placeholder}
                type={type}
                value={inputValue}
                onChange={(e) => {
                    onChange(e);
                    validate && setValid(validate(inputValue));
                }}
            />
            {showClearButton && (
                <button className={styles.clearButton} onClick={handleClearClick}>
                    &times;
                </button>
            )}
        </div>
    );
};

export default Input;
