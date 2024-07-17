'use client'

import {LocationFilter} from "@/components/filters/LocationFilter";
import {TransactionTypeFilter} from "@/components/filters/TransactionTypeFilter";
import {RoomFilter} from "@/components/filters/RoomFilter";
import {PriceFilter} from "@/components/filters/PriceFilter";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from 'next/navigation'
import useTranslations from "@/components/hooks/useTranslations";
import {Translations} from "@/types";
import {AreaFilter} from "@/components/filters/AreaFilter";
import {YearBuiltFilter} from "@/components/filters/YearBuiltFilter";

const toQuery = (filters: IFilter) => {
    const query: { [key: string]: string } = {};

    if (filters.transactionType) {
        query['transactionType'] = filters.transactionType;
    }

    if (filters.propertyType) {
        query['propertyType'] = filters.propertyType;
    }

    if (filters.locationFilter) {
        query['locationFilter'] = filters.locationFilter.join(',');
    }

    if (filters.roomFilter) {
        query['roomFilter'] = filters.roomFilter.map(room => room.toString()).join(',');
    }

    if (filters.priceFilter && filters.priceFilter.min && filters.priceFilter.max) {
        query['priceFilter'] = `${filters.priceFilter.min}-${filters.priceFilter.max}`;
    } else if (filters.priceFilter && filters.priceFilter.min) {
        query['priceFilter'] = `${filters.priceFilter.min}-`;
    } else if (filters.priceFilter && filters.priceFilter.max) {
        query['priceFilter'] = `-${filters.priceFilter.max}`;
    }

    if (filters.areaFilter && filters.areaFilter.min && filters.areaFilter.max) {
        query['areaFilter'] = `${filters.areaFilter.min}-${filters.areaFilter.max}`;
    } else if (filters.areaFilter && filters.areaFilter.min) {
        query['areaFilter'] = `${filters.areaFilter.min}-`;
    } else if (filters.areaFilter && filters.areaFilter.max) {
        query['areaFilter'] = `-${filters.areaFilter.max}`;
    }

    if (filters.yearBuiltFilter && filters.yearBuiltFilter.min && filters.yearBuiltFilter.max) {
        query['yearBuiltFilter'] = `${filters.yearBuiltFilter.min}-${filters.yearBuiltFilter.max}`;
    } else if (filters.yearBuiltFilter && filters.yearBuiltFilter.min) {
        query['yearBuiltFilter'] = `${filters.yearBuiltFilter.min}-`;
    } else if (filters.yearBuiltFilter && filters.yearBuiltFilter.max) {
        query['yearBuiltFilter'] = `-${filters.yearBuiltFilter.max}`;
    }

    return query;
}

export interface IFilter {
    transactionType?: 'buy' | 'rent';
    propertyType?: 'house' | 'apartment' | 'commercial';
    locationFilter?: string[];
    roomFilter?: number[]
    priceFilter?: { min?: number; max?: number };
    areaFilter?: { min?: number; max?: number };
    yearBuiltFilter?: { min?: number; max?: number };
}

export interface FilterProps {
    filters: IFilter;
    setFilters: (filters: IFilter) => void;
    translations: Translations;
}

export default function Filters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initTransactionType = searchParams.get('transactionType');
    // const initPropertyType = searchParams.get('propertyType');
    const initLocationFilter = searchParams.get('locationFilter');
    const initRoomFilter = searchParams.get('roomFilter');
    const initPriceFilter = searchParams.get('priceFilter');
    const initAreaFilter = searchParams.get('areaFilter');
    const initYearBuiltFilter = searchParams.get('yearBuiltFilter');

    const translations = useTranslations();

    const [filters, setFilters] = useState<IFilter>({
        transactionType: initTransactionType === 'buy' || initTransactionType === 'rent' ? initTransactionType : undefined,
        // propertyType: initPropertyType === 'house' || initPropertyType === 'apartment' || initPropertyType === 'commercial' ? initPropertyType : undefined,
        locationFilter: initLocationFilter ? initLocationFilter.split(',') : undefined,
        roomFilter: initRoomFilter ? initRoomFilter.split(',').map(Number) : undefined,
        priceFilter: initPriceFilter ? {
            min: parseInt(initPriceFilter.split('-')[0]),
            max: parseInt(initPriceFilter.split('-')[1])
        } : undefined,
        areaFilter: initAreaFilter ? {
            min: parseInt(initAreaFilter.split('-')[0]),
            max: parseInt(initAreaFilter.split('-')[1])
        } : undefined,
        yearBuiltFilter: initYearBuiltFilter ? {
            min: parseInt(initYearBuiltFilter.split('-')[0]),
            max: parseInt(initYearBuiltFilter.split('-')[1])
        } : undefined
    });


    useEffect(() => {
        applyFilters();
    }, [filters]);

    const applyFilters = () => {
        const query = new URLSearchParams(toQuery(filters)).toString();
        router.push('?' + query + (query ? `&_=d` : `_=d`));
    };

    return (
        <div className={`grid lg:grid-cols-5 grid-cols-1 gap-x-3 gap-y-6 z-20 text-sm`}>
            <div className={`md:col-span-2`}>
                <TransactionTypeFilter filters={filters} setFilters={setFilters} translations={translations}/>
            </div>
            {/*<PropertyTypeFilter filters={filters} setFilters={setFilters}/>*/}

            <div className={`lg:col-span-2`}>
                <LocationFilter filters={filters} setFilters={setFilters} translations={translations}/>
            </div>

            <div className={`lg:col-span-2`}>
                <RoomFilter filters={filters} setFilters={setFilters} translations={translations}/>
            </div>

            <div className={`lg:col-span-2`}>
                <PriceFilter filters={filters} setFilters={setFilters} translations={translations}/>
            </div>

            <div className={`lg:col-span-2`}>
                <AreaFilter filters={filters} setFilters={setFilters} translations={translations}/>
            </div>

            <div className={`lg:col-span-2`}>
                <YearBuiltFilter filters={filters} setFilters={setFilters} translations={translations}/>
            </div>
        </div>
    )
}