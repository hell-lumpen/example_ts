import React from 'react';
import styles from './BookingDetailsCard.module.css';
import {Booking, BookingDetail} from "../models/bookingModels";

const BookingDetailCard: React.FC<BookingDetail> = (bookingDetail) => {

    return (
        <div className={styles['booking-card-wrapper']}>
            <div className={styles['time-block']}>
                <span> {bookingDetail.startTime} </span>
                <br/>
                <span>&#8640;</span>
                <br/>
                <span> {bookingDetail.endTime} </span>
            </div>
            <div className={styles['content-block']}>
                <div className={styles['booking-title']}>
                    {bookingDetail.title}
                </div>
                <div className={styles['booking-room']}>
                    <span className={`material-icons ${styles['icon']}`}>location_on</span> {bookingDetail.room}
                </div>
                <div className={styles['booking-tags']}>
                    {bookingDetail.tags.map((tag, index) => (
                        <div
                            key={index}
                            className={styles['booking-tag']}
                            style={{backgroundColor: tag.color}}
                        >
                            {tag.label}
                        </div>
                    ))}
                </div>
                <div className={styles['booking-owner']}>
                    <span className={`material-icons ${styles['icon']}`}>person</span> {bookingDetail.owner}
                </div>
                <div className={styles['booking-participants']}>
                    <span className={`material-icons ${styles['icon']}`}>groups</span>
                    {bookingDetail.participants.map((participant, index) => (
                        <div
                            key={index}
                            className={styles['booking-owner']}
                        >
                            {participant}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookingDetailCard;