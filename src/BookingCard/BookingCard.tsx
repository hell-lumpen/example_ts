import React from 'react';
import styles from './BookingCard.module.css';
import {Booking} from "../models/bookingModels";

const BookingCard: React.FC<Booking> = (booking) => {

    return (
        <div className={styles['booking-card-wrapper']}>
            <div className={styles['time-block']}>
                <span> {booking.startTime.toLocaleTimeString()} </span>
                <br/>
                <span>&#8640;</span>
                <br/>
                <span> {booking.endTime.toLocaleTimeString()} </span>
            </div>
            <div className={styles['content-block']}>
                <div className={styles['booking-title']}>
                    {booking.title}
                </div>
                {booking.tags && booking.tags.length > 0 && (
                    <div className={styles['booking-tags']}>
                        {booking.tags.map((tag, index) => (
                            <div
                                key={index}
                                className={styles['booking-tag']}
                                style={{backgroundColor: tag.color}}
                            >
                                {tag.label}
                            </div>
                        ))}
                    </div>
                )}
                <div className={styles['booking-owner']}>
                    <span className={`material-icons ${styles['icon']}`}>person</span>
                    <span style={{background: '#3194b7', color: '#fff', borderRadius: '4px', padding: '5px'}}>{booking.owner.fullName}</span>
                </div>

                {booking.participants && (
                    <div className={styles['booking-tags']}>
                        <span className={`material-icons ${styles['icon']}`}>group</span>
                        {booking.participants.map((participant, index) => {
                            let backgroundColor;

                            if ('name' in participant) {
                                backgroundColor = '#FFD9EC'; // Розовый
                            } else if ('fullName' in participant) {
                                backgroundColor = '#B4E1D2'; // Зеленый
                            } else {
                                backgroundColor = '#E0E0E0';
                            }

                            return (
                                <div key={index} className={styles['booking-tag']} style={{ backgroundColor }}>
                                    {('name' in participant) ? participant.name : participant.fullName}
                                </div>
                                );
                        })}
                    </div>
                    )}
            </div>
        </div>
    );
};

export default BookingCard;