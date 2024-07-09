'use client'

import {LocationFilter} from "@/components/filters/LocationFilter";
import {TransactionTypeFilter} from "@/components/filters/TransactionTypeFilter";
import {RoomFilter} from "@/components/filters/RoomFilter";
import {PriceFilter} from "@/components/filters/PriceFilter";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from 'next/navigation'

const toQuery = (filters: IFilter) => {
    const query: { [key: string]: string } = {};

    if (filters.transactionType) {
        query['transactionType'] = filters.transactionType;
    }

    if (filters.propertyType) {
        query['propertyType'] = filters.propertyType;
    }

    if (filters.locationFilter) {
        query['locationFilter'] = filters.locationFilter;
    }

    if (filters.roomFilter) {
        query['roomFilter'] = filters.roomFilter.map(room => room.toString()).join(',');
    }

    if (filters.priceFilter && filters.priceFilter.min && filters.priceFilter.max) {
        query['priceFilter'] = `${filters.priceFilter.min }-${filters.priceFilter.max}`;
    } else if (filters.priceFilter && filters.priceFilter.min) {
        query['priceFilter'] = `${filters.priceFilter.min }-`;
    } else if (filters.priceFilter && filters.priceFilter.max) {
        query['priceFilter'] = `-${filters.priceFilter.max}`;
    }

    return query;
}

export interface IFilter {
    transactionType?: 'buy' | 'rent';
    propertyType?: 'house' | 'apartment' | 'commercial';
    locationFilter?: string;
    roomFilter?: number[]
    priceFilter?: { min?: number; max?: number };
}

export interface FilterProps {
    filters: IFilter;
    setFilters: (filters: IFilter) => void;
    applyFilters: (newFilter: IFilter) => void;
}

export default function Filters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initTransactionType = searchParams.get('transactionType');
    // const initPropertyType = searchParams.get('propertyType');
    const initLocationFilter = searchParams.get('locationFilter');
    const initRoomFilter = searchParams.get('roomFilter');
    const initPriceFilter = searchParams.get('priceFilter');

    const [filters, setFilters] = useState<IFilter>({
        transactionType: initTransactionType === 'buy' || initTransactionType === 'rent' ? initTransactionType : undefined,
        // propertyType: initPropertyType === 'house' || initPropertyType === 'apartment' || initPropertyType === 'commercial' ? initPropertyType : undefined,
        locationFilter: initLocationFilter ? initLocationFilter : undefined,
        roomFilter: initRoomFilter ? initRoomFilter.split(',').map(Number) : undefined,
        priceFilter: initPriceFilter ? {
            min: parseInt(initPriceFilter.split('-')[0]),
            max: parseInt(initPriceFilter.split('-')[1])
        } : undefined
    });


    useEffect(() => {
        router.push('/?' + new URLSearchParams(toQuery(filters)).toString());
    }, [filters]);

    const applyFilters = () => {
        router.push('/?' + new URLSearchParams(toQuery(filters)).toString());
    };

    return (
        <div className={`grid sm:grid-cols-5 grid-cols-3 gap-x-3 gap-y-3 z-20`}>
            <TransactionTypeFilter filters={filters} setFilters={setFilters} applyFilters={applyFilters}/>
            {/*<PropertyTypeFilter filters={filters} setFilters={setFilters}/>*/}
            <LocationFilter filters={filters} setFilters={setFilters} applyFilters={applyFilters}/>
            
            <div className={`hidden  md:block`}>
                <RoomFilter filters={filters} setFilters={setFilters} applyFilters={applyFilters}/>
            </div>

            <div className={`hidden md:block col-span-2`}>
                <PriceFilter filters={filters} setFilters={setFilters} applyFilters={applyFilters}/>
            </div>

            {/*<button*/}
            {/*    className={`text-white  px-12 rounded-sm bg-[#FF0000]`}*/}
            {/*    onClick={applyFilters}*/}
            {/*>*/}
            {/*    Szukaj*/}
            {/*</button>*/}

        </div>
    )
}