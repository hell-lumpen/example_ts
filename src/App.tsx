import React, {useEffect} from 'react';
import './App.css';
import BookingList from "./BookingCard/BookingList";
import {BookingDetail} from "./models/bookingModels";
import BookingDetailCard from "./BookingCard/BookingDetailsCard";
import {AddingBookingContainer} from "./AddBookingContainer/AddingBookingContainer";
import LoginForm from "./LoginForm/LoginForm";
import TokenViewer from "./LoginForm/TokenViewer";
import {useAuthenticatedUserState} from "./contexts/authenticatedUserContext";
import {getToken, restoreAuthUserFromJWT} from "./services/authService";


const App: React.FC = () => {

    const cardsData = [{
        roomName: 'Лекторий IT-5', bookings: [{
            startTime: '10:00',
            endTime: '12:00',
            title: 'Введение в авиационную и ракетнокосмическую технику',
            owner: 'Иванов Иван Иванович',
            tags: [{label: 'Техника', color: '#add8e6'}, {label: 'Образование', color: '#98fb98'}],
        },],
    }, {
        roomName: 'Conference Room A', bookings: [{
            startTime: '14:30',
            endTime: '16:00',
            title: 'Митап по React',
            owner: 'Анна Сидорова',
            tags: [{label: 'React', color: '#87ceeb'}, {label: 'Образование', color: '#98fb98'}],
        },],
    }, {
        roomName: 'Meeting Room 2', bookings: [{
            startTime: '09:00',
            endTime: '10:30',
            title: 'Презентация нового продукта',
            owner: 'Петр Петрович',
            tags: [{label: 'Продукт', color: '#b0e0e6'}],
        },],
    }, {
        roomName: 'Training Room 1', bookings: [{
            startTime: '13:00',
            endTime: '15:00',
            title: 'Обучение по Python',
            owner: 'Елена Иванова',
            tags: [{label: 'Python', color: '#add8e6'}, {label: 'Образование', color: '#98fb98'}],
        },],
    }, {
        roomName: 'Innovation Center', bookings: [{
            startTime: '16:30',
            endTime: '18:00',
            title: 'Демонстрация новых технологий',
            owner: 'Мария Мариева',
            tags: [{label: 'Технологии', color: '#ffd700'}],
        },],
    }, // Additional bookingRoom with multiple bookings
        {
            roomName: 'Business Lounge', bookings: [{
                startTime: '10:30',
                endTime: '12:30',
                title: 'Бизнес-форум: Успех в цифровую эпоху',
                owner: 'Артем Артемов',
                tags: [{label: 'Бизнес', color: '#ffa07a'}, {label: 'Образование', color: '#98fb98'}],
            }, // Additional booking in the same room
                {
                    startTime: '14:00',
                    endTime: '15:30',
                    title: 'Развитие бизнеса в онлайн среде',
                    owner: 'Ольга Олегова',
                    tags: [{label: 'Бизнес', color: '#ffa07a'}, {label: 'Образование', color: '#98fb98'}],
                },],
        },];

    const bookingDetail: BookingDetail = {
        startTime: '14:00',
        endTime: '15:30',
        room: 'Погосян',
        title: 'Развитие бизнеса в онлайн среде',
        descriptions: 'Добро пожаловать на волнующее мероприятие, посвященное Развитию Бизнеса в Онлайн Среде! Здесь каждый участник обнаружит ключевые стратегии и инновационные подходы к успешному ведению бизнеса в цифровую эпоху. Погружаемся в мир виртуальных возможностей, делимся опытом с лучшими экспертами и создаем путь к успеху в онлайн пространстве. Готовы ли вы преобразить свой бизнес и поднять его на новый уровень? Присоединяйтесь к нам и давайте вместе писать историю цифрового успеха!',
        owner: 'Ольга Олегова',
        participants: ['Иванов Иван Иванович', 'Иванова Ивана Ивановна', 'М8О-410Б-20', 'М8О-411Б-20'],
        tags: [{label: 'Бизнес', color: '#ffa07a'}, {label: 'Образование', color: '#98fb98'}],
    }

    const [authenticatedUser, setAuthenticatedUser] = useAuthenticatedUserState();

    useEffect(() => {
        const token = getToken()
        if (!token) {
            console.log('Need login');
            return
        }
        setAuthenticatedUser(restoreAuthUserFromJWT(token));
    }, [])

    return (
        <div className='container'>
            <div className='left-column'>
                <h1>Навигационное меню</h1>
                <p>Content goes here</p>
            </div>
            <div className='middle-column'>
                <h1>Бронирования</h1>
                <AddingBookingContainer/>


                <BookingDetailCard {...bookingDetail}/>
                <BookingList bookingsGropedByRoom={cardsData}/>
                {!authenticatedUser && (
                    <LoginForm/>
                )}
                <BookingList bookingsGropedByRoom={cardsData}/>
            </div>
            <div className='right-column'>
                <h1>Todo и проекты</h1>
                <p>Content goes here</p>
                <TokenViewer/>
            </div>
        </div>
    );
};

export default App;
