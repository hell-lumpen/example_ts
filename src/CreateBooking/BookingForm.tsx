// BookingForm.tsx
import React, { useState } from 'react';
import AutocompleteInput from '../utils/AutocompleteInput'; // Замените на ваш компонент с автодополнением
import MultiSelectInput from '../utils/MultiSelectInput'; // Замените на ваш компонент с множественным выбором
import styles from './BookingForm.module.css';

interface BookingFormProps {
    onSubmit?: (formData: FormData) => void;
}

interface FormData {
    roomName: string;
    bookingDate: string;
    startTime: string;
    endTime: string;
    title: string;
    description: string;
    tags: string[];
    participants: string[];
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        roomName: '',
        bookingDate: '',
        startTime: '',
        endTime: '',
        title: '',
        description: '',
        tags: [],
        participants: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleTagChange = (selectedTags: string[]) => {
        setFormData((prevData) => ({ ...prevData, tags: selectedTags }));
    };

    const handleParticipantsChange = (selectedParticipants: string[]) => {
        setFormData((prevData) => ({ ...prevData, participants: selectedParticipants }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData)
        // onSubmit(formData);
    };

    return (
        <form className={styles.bookingForm} onSubmit={handleSubmit}>
            <label>
                Название аудитории:
                <AutocompleteInput
                    name="roomName"
                    value={formData.roomName}
                    onChange={handleChange}
                    options={['Auditorium A', 'Auditorium B', 'Auditorium C']} // Замените на ваши опции
                />
            </label>

            <label>
                Дата бронирования:
                <input
                    type="date"
                    name="bookingDate"
                    value={formData.bookingDate}
                    onChange={handleChange}
                />
            </label>

            <label>
                Время начала:
                <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                />
            </label>

            <label>
                Время окончания:
                <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                />
            </label>

            <label>
                Заголовок бронирования:
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </label>

            <label>
                Описание бронирования:
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </label>

            <label>
                <MultiSelectInput
                    name="tags"
                    value={formData.tags}
                    onChange={handleTagChange}
                    options={['Meeting', 'Presentation', 'Workshop']} // Замените на ваши опции
                />
            </label>

            <label>
                Выбор участников:
                <MultiSelectInput
                    name="participants"
                    value={formData.participants}
                    onChange={handleParticipantsChange}
                    options={['John Doe', 'Jane Smith', 'Bob Johnson']} // Замените на ваши опции
                />
            </label>

            <button type="submit">Создать бронирование</button>
        </form>
    );
};

export default BookingForm;