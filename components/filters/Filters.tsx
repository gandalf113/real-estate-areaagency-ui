'use client'

import { LocationFilter } from "@/components/filters/LocationFilter";
import { TransactionTypeFilter } from "@/components/filters/TransactionTypeFilter";
import { RoomFilter } from "@/components/filters/RoomFilter";
import { PriceFilter } from "@/components/filters/PriceFilter";
import { useEffect, useState } from "react";
import {useRouter, useSearchParams, useParams} from 'next/navigation';
import useTranslations from "@/components/hooks/useTranslations";
import {LanguageType, Translations} from "@/types";
import { AreaFilter } from "@/components/filters/AreaFilter";
import { YearBuiltFilter } from "@/components/filters/YearBuiltFilter";
import SortBy from "@/components/SortBy";
import { PropertyTypeFilter } from "@/components/filters/PropertyTypeFilter";

const toQuery = (filters: IFilter, sort?: { field: string, direction: string }) => {
    const query: { [key: string]: string } = {};

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

    if (sort && sort.field && sort.direction) {
        query['sortBy'] = `${sort.field}-${sort.direction}`;
    }

    return query;
}

type PropertyType = 'house' | 'apartment' | 'commercial' | 'land';

export interface IFilter {
    transactionType?: 'buy' | 'rent';
    propertyType?: PropertyType;
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
    const params = useParams();
    const searchParams = useSearchParams();
    const language = params.lang as LanguageType;

    const initTransactionType = params.transactionType ?? 'buy';
    const initPropertyType = (params.propertyType ?? 'house') as PropertyType;
    const initLocationFilter = params.location as string;
    const initRoomFilter = searchParams.get('roomFilter');
    const initPriceFilter = searchParams.get('priceFilter');
    const initAreaFilter = searchParams.get('areaFilter');
    const initYearBuiltFilter = searchParams.get('yearBuiltFilter');
    const initSortBy = searchParams.get('sortBy');

    const translations = useTranslations();
    const [filtersExpanded, setFiltersExpanded] = useState(false);

    console.log(typeof initLocationFilter)

    const [filters, setFilters] = useState<IFilter>({
        transactionType: initTransactionType === 'buy' || initTransactionType === 'rent' ? initTransactionType : undefined,
        propertyType: initPropertyType ? initPropertyType : undefined,
        locationFilter: initLocationFilter ? initLocationFilter.split('%2C') : undefined,
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

    const [sortBy, setSortBy] = useState<{ field: string, direction: string } | undefined>(initSortBy ? {
        field: initSortBy.split('-')[0],
        direction: initSortBy.split('-')[1]
    } : undefined);

    useEffect(() => {
        applyFilters();
    }, [filters, sortBy]);

    const applyFilters = () => {
        const path = `${language}/real-estate/${filters.propertyType || 'buy'}/${filters.transactionType || 'house'}/${filters.locationFilter?.join(',') || 'all'}`;
        const query = new URLSearchParams(toQuery(filters, sortBy)).toString();
        const url = `/${path}${query ? `?${query}` : ''}`;
        router.push(url);
    };

    const toggleExpanded = () => {
        setFiltersExpanded(!filtersExpanded);
    }

    return (
        <>
            <div className={`grid lg:grid-cols-10 grid-cols-1 gap-x-3 gap-y-6 text-base`}>
                <div className={`md:col-span-5`}>
                    <TransactionTypeFilter filters={filters} setFilters={setFilters} translations={translations} />
                </div>

                <div className={`md:col-span-5`}>
                    <PropertyTypeFilter filters={filters} setFilters={setFilters} translations={translations} />
                </div>

                <div className={`lg:col-span-8`}>
                    <LocationFilter filters={filters} setFilters={setFilters} translations={translations} />
                </div>

                {/* More filters */}
                <button
                    className={`lg:col-span-2 text-sm text-white bg-slate-500 hover:bg-slate-600 rounded-md p-2 z-20 whitespace-nowrap truncate`}
                    onClick={toggleExpanded}>
                    {filtersExpanded ? translations.filters.showLessFilters : translations.filters.showMoreFilters}
                </button>

                {filtersExpanded && <>
                    <div className={`lg:col-span-6`}>
                        <PriceFilter filters={filters} setFilters={setFilters} translations={translations}
                                     transactionType={filters.transactionType} />
                    </div>

                    <div className={`lg:col-span-4`}>
                        <RoomFilter filters={filters} setFilters={setFilters} translations={translations} />
                    </div>

                    <div className={`lg:col-span-8`}>
                        <AreaFilter filters={filters} setFilters={setFilters} translations={translations} />
                    </div>

                    <div className={`lg:col-span-8`}>
                        <YearBuiltFilter filters={filters} setFilters={setFilters} translations={translations} />
                    </div>
                </>}
            </div>

            <div className={`my-6 w-fit ml-auto`}>
                <SortBy value={sortBy} setValue={setSortBy} t={translations} />
            </div>
        </>
    )
}
