import React, {useEffect, useState} from 'react';
import './App.css';
import BookingList from "./BookingCard/BookingList";
import {BookingDetail, BookingRoom, BookingsByRoom} from "./models/bookingModels";
import LoginForm from "./LoginForm/LoginForm";
import TokenViewer from "./LoginForm/TokenViewer";
import {useAuthenticatedUserState} from "./contexts/authenticatedUserContext";
import {deleteToken, restoreAuthUserFromJWT} from "./services/authService";
import NotificationPopup from "./NotificationPopup/NotificationPopup";
import { AddingBookingContainer } from './AddBookingContainer/AddingBookingContainer';
import BookingDetailCard from "./BookingCard/BookingDetailsCard";
import Popup from "./PopupComponent/Popup";

const App: React.FC = () => {

    const sampleBookings: BookingsByRoom[] = [
        {
            room: {id: 1, name: "Conference Room A"},
            bookings: [
                {
                    startTime: new Date("2023-12-01T10:00:00Z"),
                    endTime: new Date("2023-12-01T11:30:00Z"),
                    title: "Team Meeting",
                    descriptions: "Discuss project updates",
                    owner: {id: 101, fullName: "John Doe"},
                    participants: [
                        {id: 102, fullName: "Jane Smith"},
                        {id: 103, fullName: "Bob Johnson"},
                    ],
                    tags: [
                        {id: 201, label: "Important", color: "#FF5733", shortLabel: "IMP"},
                    ],
                },
            ],
        },
        {
            room: {id: 2, name: "Meeting Room B"},
            bookings: [
                {
                    startTime: new Date("2023-12-02T14:00:00Z"),
                    endTime: new Date("2023-12-02T15:30:00Z"),
                    title: "Client Presentation",
                    descriptions: "Present new product features",
                    owner: {id: 104, fullName: "Alice Johnson"},
                    participants: [
                        {id: 105, fullName: "Charlie Brown"},
                        {id: 106, fullName: "Eva White"},
                    ],
                    tags: [
                        {id: 202, label: "Client", color: "#3366FF", shortLabel: "CLT"},
                        {id: 203, label: "Presentation", color: "#33FF57", shortLabel: "PRES"},
                    ],
                },
            ],
        },
        {
            room: {id: 3, name: "Team Collaboration Room"},
            bookings: [
                {
                    startTime: new Date("2023-12-03T09:00:00Z"),
                    endTime: new Date("2023-12-03T11:00:00Z"),
                    title: "Project Kickoff",
                    descriptions: "Start of a new project",
                    owner: {id: 107, fullName: "David Miller"},
                    participants: [
                        {id: 108, fullName: "Emily Turner"},
                        {id: 109, fullName: "Mark Davis"},
                        {id: 110, name: "Development Team"},
                    ],
                    tags: [
                        {id: 204, label: "Kickoff", color: "#FF3366", shortLabel: "KOFF"},
                        {id: 205, label: "Team", color: "#33CCFF", shortLabel: "TM"},
                    ],
                },
            ],
        },];

    // const bookingDetail: BookingDetail = {
    //     startTime: '14:00',
    //     endTime: '15:30',
    //     room: 'Погосян',
    //     title: 'Развитие бизнеса в онлайн среде',
    //     descriptions: 'Добро пожаловать на волнующее мероприятие, посвященное Развитию Бизнеса в Онлайн Среде! Здесь каждый участник обнаружит ключевые стратегии и инновационные подходы к успешному ведению бизнеса в цифровую эпоху. Погружаемся в мир виртуальных возможностей, делимся опытом с лучшими экспертами и создаем путь к успеху в онлайн пространстве. Готовы ли вы преобразить свой бизнес и поднять его на новый уровень? Присоединяйтесь к нам и давайте вместе писать историю цифрового успеха!',
    //     owner: 'Ольга Олегова',
    //     participants: ['Иванов Иван Иванович', 'Иванова Ивана Ивановна', 'М8О-410Б-20', 'М8О-411Б-20'],
    //     tags: [{label: 'Бизнес', color: '#ffa07a'}, {label: 'Образование', color: '#98fb98'}],
    // }

    const [authenticatedUser, setAuthenticatedUser] = useAuthenticatedUserState();

    useEffect(() => {
        setAuthenticatedUser(restoreAuthUserFromJWT());
    }, [])

    const [isLoginFormOpen, setLoginFromOpen] = useState(!authenticatedUser);

    return (
        <div className='container'>
            {/*<NotificationPopup duration={1000}/>*/}
            <NotificationPopup />
            <div className='left-column'>
                <h1>Навигационное меню</h1>
                <p>Content goes here</p>
            </div>
            <div className='middle-column'>
                <h1>Бронирования</h1>
                <AddingBookingContainer/>


                {/*<BookingDetailCard {...bookingDetail}/>*/}
                <BookingList bookingsGropedByRoom={sampleBookings}/>
                {!authenticatedUser ? (
                    <>
                        <h2>Авторизация</h2>
                        <Popup isOpen={isLoginFormOpen}
                               onClose={() => setLoginFromOpen(false)}
                               contentComponent={<LoginForm/>}/>
                    </>
                ) : (
                    <BookingList bookingsGropedByRoom={sampleBookings}/>
                )}
            </div>
            <div className='right-column'>
                <h1>Todo и проекты</h1>
                <p>Content goes here</p>
                <button onClick={() => {
                    setAuthenticatedUser(undefined);
                    deleteToken();
                }}>Выйти
                </button>

                {authenticatedUser && (
                    <TokenViewer/>
                )}
            </div>
        </div>
    );
};

export default App;
