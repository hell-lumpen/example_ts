export interface Tag {
    label: string;
    color: string
}

export interface Booking {
    startTime: string;
    endTime: string;
    title: string;
    owner: string;
    tags: Tag[];
}

export interface BookingDetail {
    startTime: string;
    endTime: string;
    title: string;
    descriptions: string;
    room: string;
    owner: string;
    participants: string[];
    tags: Tag[];
}

export interface BookingRoom {
    roomName: string;
    bookings: Booking[];
}