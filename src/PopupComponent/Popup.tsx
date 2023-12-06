import React, { FC, useEffect, useState } from 'react';
import styles from './Popup.module.css';
import LoginForm from "../LoginForm/LoginForm";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    contentComponent: React.ReactElement;
}

const Popup: FC<PopupProps> = ({ isOpen, onClose, contentComponent }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const timeout = setTimeout(() => {
                setIsVisible(true);
                }, 50);

            return () => clearTimeout(timeout);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsVisible(false);

        const timeout = setTimeout(() => {
            onClose();
            }, 300);

        return () => clearTimeout(timeout);
    };

    return (
        <>
        {isOpen && (
            <div className={`${styles.overlay} ${isVisible ? styles.visible : ''}`} onClick={handleClose}>
                <div className={`${styles.popup} ${isVisible ? styles.show : ''}`} onClick={(e) => e.stopPropagation()}>
                    <>
                        <button className={styles.closeButton} onClick={handleClose}>
                            &times;
                        </button>
                        {contentComponent}
                    </>
                </div>
            </div>
            )}
        </>
        );
};

export default Popup;