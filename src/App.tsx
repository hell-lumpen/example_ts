import React, {useEffect, useState} from 'react';
import ApiService, {ApiResult, ApiServiceBuilder} from './apiService';

export interface Booking {
    id: number
    bookingGroupId: any
    room: Room
    owner: Owner
    staff: any[]
    groups: any[]
    startTime: string
    endTime: string
    description: string
    tag: Tag
    createdAt: any
}

export interface Room {
    roomId: number
    roomName: string
    capacity: number
    hasComputers: boolean
    hasProjector: boolean
    isCathedral: boolean
}

export interface Owner {
    userId: number
    username: string
    phoneNumber: string
    fullName: string
    password: string
    isAccountLocked: boolean
    role: string
    enabled: boolean
    accountNonLocked: boolean
    authorities: Authority[]
    credentialsNonExpired: boolean
    accountNonExpired: boolean
}

export interface Authority {
    authority: string
}

export interface Tag {
    id: number
    fullName: string
    shortName: string
    color: string
}

const MyComponent: React.FC = () => {
    const [apiResult, setApiResult] = useState<ApiResult<Booking>>({
        isLoading: false,
        isError: false,
        data: null,
        error: undefined
    });

    // useEffect(() => {
    //   (async () => {
    //     const apiService = ApiServiceBuilder.builder('http://localhost:8080')
    //         .withHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQVRPUiIsImZ1bGxOYW1lIjoi0JjRgNCx0LjRgtGB0LrQuNC5INCY0LvRjNGPINCh0LXRgNCz0LXQtdCy0LjRhyIsInN1YiI6InVzZXJuYW1lMyIsImlhdCI6MTcwMDMxMzUyNSwiZXhwIjoxNzAwOTE4MzI1fQ.9WV0PBzZvNnTk5DGYz2f7Oq6ZG-Sn1ImiQH4NNtizIs')
    //         .build();
    //
    //     const response = await apiService.get<Booking>('/api/bookings/1');
    //     setApiResult(response);
    //   })();
    // }, []);

    const fetchData = async () => {
        const apiService = ApiServiceBuilder.builder('http://localhost:8080')
            .withHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQVRPUiIsImZ1bGxOYW1lIjoi0JjRgNCx0LjRgtGB0LrQuNC5INCY0LvRjNGPINCh0LXRgNCz0LXQtdCy0LjRhyIsInN1YiI6InVzZXJuYW1lMyIsImlhdCI6MTcwMDMxMzUyNSwiZXhwIjoxNzAwOTE4MzI1fQ.9WV0PBzZvNnTk5DGYz2f7Oq6ZG-Sn1ImiQH4NNtizIs')
            .build();

        const response = await apiService.get<Booking>('/api/bookings/112');

        if (response.isLoading) {
            // Handle loading state (e.g., show a loading spinner)
            console.log('Loading...');
        } else {
            // Check for errors and handle the result
            if (response.isError) {
                console.error('Error:', response.error?.detail);
            } else {
                console.log('Data:', response.data);
            }
        }
        setApiResult(response);
    };

    return (
        <div>
            <button onClick={fetchData}>Fetch Data</button>
            {apiResult.isLoading && <p>Loading...</p>}
            {apiResult.isError && <p>Error loading data {JSON.stringify(apiResult.error)}</p>}
            {apiResult.data && (
                <div>
                    <p>Data:</p>
                    <p>
                        {JSON.stringify(apiResult.data)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyComponent;
