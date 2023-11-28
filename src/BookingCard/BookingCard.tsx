import React from 'react';
import styles from './BookingCard.module.css';
import {Booking} from "../models/bookingModels";

const BookingCard: React.FC<Booking> = (booking) => {

    return (
        <div className={styles['booking-card-wrapper']}>
            <div className={styles['time-block']}>
                <span> {booking.startTime} </span>
                <br/>
                <span>&#8640;</span>
                <br/>
                <span> {booking.endTime} </span>
            </div>
            <div className={styles['content-block']}>
                <div className={styles['booking-title']}>
                    {booking.title}
                </div>
                {/*<div className={styles['booking-room']}>*/}
                {/*    <span className={`material-icons ${styles['icon']}`}>location_on</span> {bookingRoom}*/}
                {/*</div>*/}
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
                    <span className={`material-icons ${styles['icon']}`}>person</span> {booking.owner}
                </div>
            </div>
        </div>
    );
};

export default BookingCard;