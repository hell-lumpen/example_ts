import './AddBookingContainer.css'

export const AddingBookingContainer = () => {
    return (
        <div className='new-booking-container'>
            <div style={{fontSize:'18px', fontWeight:'900'}}>Создание брони</div>
            <div className='new-booking-room'>
                Аудитория:
                <select
                    className={'new-booking-selectBox'}

                    name='roomId'
                    // value={newBookingFormData.roomId}
                    // onChange={handleInputChange}
                >
                    <option value='default'>...</option>
                    {/*{audiences.map((room) => (*/}
                    {/*    <option key={room.id} value={room.id}>*/}
                    {/*        {room.name}*/}
                    {/*    </option>*/}
                    {/*))}*/}
                </select>
            </div>


            <div className='new-booking-datetime-date'>
                Дата бронирования:
                <input
                    className={'new-booking-selectBox'}
                    type='date'
                    name='date'
                    // value={newBookingFormData.date}
                    // onChange={handleInputChange}
                />
            </div>

            <div className='new-booking-datetime'>


                <div className='new-booking-datetime-start'>
                        Начало:
                        <input
                            className={'new-booking-selectBox'}
                            type='time'
                            name='startTime'
                            // value={newBookingFormData.startTime}
                            // onChange={handleInputChange}
                        />
                </div>

                <div className='new-booking-datetime-end'>
                        Окончание:
                        <input
                            className={'new-booking-selectBox'}
                            type='time'
                            name='endTime'
                            // value={newBookingFormData.endTime}
                            // onChange={handleInputChange}
                        />
                </div>
            </div>

            <div className='new-booking-description'>
                Описание:
                <textarea
                    className='new-booking-form-textarea'
                    name='description'
                    // value={newBookingFormData.description}
                    // onChange={handleInputChange}
                />
            </div>

            <div className='new-booking-buttons'>
                <button className='new-booking-button-accept'>Забронировать</button>
                <button className='new-booking-button-cancel'>Отмена</button>
            </div>
        </div>

    );
}