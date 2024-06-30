export interface IListing {
    id: number;
    crm_id: string;
    title: string;
    description: string;
    areaTotal: string;
    price: string;
    lon: string;
    lat: string;
    created_at: string;
    images: {
        id: number;
        url: string;
    }[];
}