export interface IListing {
    id: number;
    crm_id: string;
    status: string;
    transaction: string;
    title: string;
    description: string;
    areaTotal: string;
    price: string;
    deposit: string;
    lon: string;
    lat: string;
    city_name: string;
    street_name: string;
    precinct_name: string;
    apartment_room_number: number;
    floor_number: number;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    company_name: string;
    available_date: string;
    add_date: string;
    created_at: string;
    images: {
        id: number;
        url: string;
    }[];
}
