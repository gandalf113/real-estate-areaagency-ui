import {LanguageType} from "@/types";
import Filters from "@/components/filters/Filters";
import translations from "@/app/translations";
import ListingsWithMap from "@/components/ListingsWithMap";

interface HomePageProps {
    params: {lang: LanguageType}
    searchParams: ListingsQueryParams;
}

export default async function Home({params, searchParams}: HomePageProps) {

    const t = translations[params.lang];

    const currentPage = Number.parseInt(searchParams.page || '1');
    const {listings, totalPages, pins} = await findListings({...searchParams, page: currentPage.toString()}, params.lang);

    return (
        <>
            {/*<div className={`px-8 pt-4 pb-16 flex flex-col`}>*/}
            {/*    <Filters/>*/}
            {/*</div>*/}
            <main className="overflow-x-clip pb-8">
                <ListingsWithMap
                    listings={listings}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    lang={params.lang}
                    pins={pins}
                />
            </main>
        </>
    );
}

interface ListingsQueryParams {
    page?: string;
    limit?: string;
    transactionType?: string;
    propertyType?: string;
    location?: string;
    minRooms?: string;
    maxRooms?: string;
    minPrice?: string;
    maxPrice?: string;
}

async function findListings(search: ListingsQueryParams = {}, lang: string) {
    const params = {
        lang,
        ...search
    }
    const queryParams = Object.keys(params)
        .map(key => {
            const value = (params as any)[key];
            return value !== undefined ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : '';
        })
        .filter(param => param !== '')
        .join('&');

    const listingsUrl = process.env.API_BASE_URL + `/listings?` + queryParams;
    const pinsUrl = process.env.API_BASE_URL + `/pins?` + queryParams;

    const [listingsRes, pinsRes] = await Promise.all([
        fetch(listingsUrl, {next: {revalidate: 900}}),
        fetch(pinsUrl, {next: {revalidate: 900}})
    ]);

    if (!listingsRes.ok || !pinsRes.ok) {
        throw new Error('Failed to fetch data');
    }

    const listingsData = await listingsRes.json();
    const pinsData = await pinsRes.json();

    return {
        listings: listingsData.listings,
        totalPages: listingsData.totalPages,
        pins: pinsData.pins
    };
}
