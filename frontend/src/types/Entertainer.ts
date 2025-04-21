export interface Entertainer {
    entertainerID?: number; // Optional when creating
    entStageName: string;
    entSSN: string;
    entStreetAddress: string;
    entCity: string;
    entState: string;
    entZipCode: string;
    entPhoneNumber: string;
    entWebPage: string;
    entEmailAddress: string;
    dateEntered: string;
}

export interface EntertainerSummary {
    entertainerID: number;
    entStageName: string;
    timesBooked: number;
    lastBookingDate: string;
}
