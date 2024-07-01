'use client'

import {LocationFilter} from "@/components/filters/LocationFilter";
import {PropertyTypeFilter} from "@/components/filters/PropertyTypeFilter";
import {TransactionTypeFilter} from "@/components/filters/TransactionTypeFilter";
import {RoomFilter} from "@/components/filters/RoomFilter";
import {PriceFilter} from "@/components/filters/PriceFilter";


export default function Filters() {
    return (
        <div className={`grid grid-cols-6 gap-x-3 gap-y-3`}>
            <TransactionTypeFilter />
            <PropertyTypeFilter />
            <LocationFilter />
            <RoomFilter />
            <PriceFilter />

            <button
                className={`text-white  px-12 rounded-sm bg-[#FF0000]`}>
                Szukaj
            </button>

        </div>
    )
}