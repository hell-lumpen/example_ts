import React from 'react';
import {BookingRoom} from "../models/bookingModels";
import BookingCard from "./BookingCard";
import styles from "./BookingList.module.css";


interface BookingListProps {
    bookingsGropedByRoom: BookingRoom[];
}

const BookingList: React.FC<BookingListProps> = ({bookingsGropedByRoom}) => {
    return (
        <div className={styles['booking-list-container']}>
            {bookingsGropedByRoom.map((room, index) => (
                <div className={styles['booking-room-container']} key={index}>
                    <h2>{room.roomName}</h2>
                    <div className={styles['bookings-room-data']}>
                        {room.bookings.map((booking, bookingIndex) => (
                            <BookingCard key={bookingIndex} {...booking} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookingList;
