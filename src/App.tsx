import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import BookingList from "./BookingCard/BookingList";
import {BookingDetail, BookingRoom} from "./models/bookingModels";
import Input from "./utils/Input";
import BookingDetailCard from "./BookingCard/BookingDetailsCard";


const MyComponent: React.FC = () => {

    const cardsData = [
        {
            roomName: 'Лекторий IT-5',
            bookings: [
                {
                    startTime: '10:00',
                    endTime: '12:00',
                    title: 'Введение в авиационную и ракетнокосмическую технику',
                    owner: 'Иванов Иван Иванович',
                    tags: [{label: 'Техника', color: '#add8e6'}, {label: 'Образование', color: '#98fb98'}],
                },
            ],
        },
        {
            roomName: 'Conference Room A',
            bookings: [
                {
                    startTime: '14:30',
                    endTime: '16:00',
                    title: 'Митап по React',
                    owner: 'Анна Сидорова',
                    tags: [{label: 'React', color: '#87ceeb'}, {label: 'Образование', color: '#98fb98'}],
                },
            ],
        },
        {
            roomName: 'Meeting Room 2',
            bookings: [
                {
                    startTime: '09:00',
                    endTime: '10:30',
                    title: 'Презентация нового продукта',
                    owner: 'Петр Петрович',
                    tags: [{label: 'Продукт', color: '#b0e0e6'}],
                },
            ],
        },
        {
            roomName: 'Training Room 1',
            bookings: [
                {
                    startTime: '13:00',
                    endTime: '15:00',
                    title: 'Обучение по Python',
                    owner: 'Елена Иванова',
                    tags: [{label: 'Python', color: '#add8e6'}, {label: 'Образование', color: '#98fb98'}],
                },
            ],
        },
        {
            roomName: 'Innovation Center',
            bookings: [
                {
                    startTime: '16:30',
                    endTime: '18:00',
                    title: 'Демонстрация новых технологий',
                    owner: 'Мария Мариева',
                    tags: [{label: 'Технологии', color: '#ffd700'}],
                },
            ],
        },
        // Additional bookingRoom with multiple bookings
        {
            roomName: 'Business Lounge',
            bookings: [
                {
                    startTime: '10:30',
                    endTime: '12:30',
                    title: 'Бизнес-форум: Успех в цифровую эпоху',
                    owner: 'Артем Артемов',
                    tags: [{label: 'Бизнес', color: '#ffa07a'}, {label: 'Образование', color: '#98fb98'}],
                },
                // Additional booking in the same room
                {
                    startTime: '14:00',
                    endTime: '15:30',
                    title: 'Развитие бизнеса в онлайн среде',
                    owner: 'Ольга Олегова',
                    tags: [{label: 'Бизнес', color: '#ffa07a'}, {label: 'Образование', color: '#98fb98'}],
                },
            ],
        },
    ];

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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('Input value changed:', e.target.value);
    };

    const isValid = (value: string) => {
        // Пример простой валидации: значение не должно быть пустым
        return value.trim() !== '';
    };

    const getBookingData = (): BookingRoom[] => {
        for (let i = 0; i < 1000000000; i++) {
            i = i + 1 - 1
        }
        return cardsData;
    }

    const [bookingData, setBookingData] = useState<BookingRoom[]>([]);

    useEffect(() => {
        const fetchedBookingData: BookingRoom[] = getBookingData();
        setBookingData(fetchedBookingData)
    }, [])

    const [inputValue, setInputValue] = useState('');


    return (
        // <div className='App'>
        //     <div className='wrapper'>
        //         <div>
        //             <Input
        //                 placeholder="Поиск по названию, ФИО, тегу"
        //                 type="text"
        //                 inputValueState={[inputValue, setInputValue]}
        //                 onChange={(e) => {
        //                     setInputValue(e.target.value)
        //                 }}
        //                 showClearButton={true}
        //             />
        //             {inputValue && (<span>Вы ввели: {inputValue}</span>)}
        //         </div>
        //         <BookingList bookingsGropedByRoom={bookingData}/>
        //     </div>
        // </div>
        <div className='container'>
            <div className='left-column'>
                <h1>Навигационное меню</h1>
                <button className='nav-unit'>Профиль</button>
                <button className='nav-unit'>Бронирования аудиторий</button>
                <button className='nav-unit'>Инвентаризация</button>
                <button className='nav-unit'>Задачи</button>
                <button className='nav-unit'>Администрирование</button>
            </div>
            <div className='middle-column'>
                <h1>Бронирования</h1>
                <div className='booking-control-container'>
                    <div className='search-input-button-container'>
                        <div>
                            <Input
                                placeholder="Поиск по названию, ФИО, тегу"
                                type="text"
                                inputValueState={[inputValue, setInputValue]}
                                onChange={(e) => {
                                    setInputValue(e.target.value)
                                }}
                                showClearButton={true}
                            />
                        </div>
                        <div>
                            <button>Создать бронирование</button>
                        </div>
                    </div>
                </div>
                <BookingDetailCard {...bookingDetail}/>
                <BookingList bookingsGropedByRoom={bookingData}/>
            </div>
            <div className='right-column'>
                <h1>Todo и проекты</h1>
                <p>Content goes here</p>
            </div>
        </div>
    );
};

export default MyComponent;
