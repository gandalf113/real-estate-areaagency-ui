import Image from "next/image";
import {useMemo} from "react";
import dynamic from "next/dynamic";
import {IListing} from "@/types";

export default async function Home() {
    const Map = useMemo(() => dynamic(
        () => import('@/components/Map'),
        {
            loading: () => <div className={`w-full h-full bg-gray-200 animate-pulse`}/>,
            ssr: false
        }
    ), [])

    const listings: IListing[] = await findListings();

    return (
        <main className={``}>
            <div className={`px-8 py-10 navbar-and-filters shadow-lg flex flex-col`}>
                {/* Select Type */}
                <div className={`grid grid-cols-3 gap-x-3 gap-y-3`}>
                    <select name={`type`} id={`type`}
                            className={`w-full p-4 rounded-lg text-sm outline-none border-2 border-gray-200 focus:border-gray-300 duration-100`}>
                        <option value={`house`}>Dom</option>
                        <option value={`apartment`}>Mieszkanie</option>
                        <option value={`plot`}>Działka</option>
                    </select>
                    <select name={`type`} id={`type`}
                            className={`w-full p-4 rounded-lg text-sm outline-none border-2 border-gray-200 focus:border-gray-300 duration-100`}>
                        <option value={`house`}>Na wynajem</option>
                        <option value={`apartment`}>Na sprzedaż</option>
                    </select>
                    {/* Search */}
                    <input type={`text`} placeholder={`Wpisz lokalizację...`}
                           className={`w-full p-4 rounded-lg text-sm outline-none border-2 border-gray-200 focus:border-gray-300 duration-100`}/>

                    {/* Price Range */}
                    <div>
                        <label className={`text-gray-800 mb-1`}>Cena</label>
                        <div className={`grid grid-cols-2`}>
                            <input type={`number`} placeholder={`Od`}
                                   className={`w-full p-4 rounded-lg text-sm outline-none border-2 border-gray-200 focus:border-gray-300 duration-100`}/>
                            <input type={`number`} placeholder={`Do`}
                                   className={`w-full p-4 rounded-lg text-sm outline-none border-2 border-gray-200 focus:border-gray-300 duration-100`}/>
                        </div>
                    </div>

                    {/* Area Range */}
                    <div>
                        <label className={`text-gray-800 mb-1`}>Powierzchnia</label>
                        <div className={`grid grid-cols-2`}>
                            <input type={`number`} placeholder={`Od`}
                                   className={`w-full p-4 rounded-lg text-sm outline-none border-2 border-gray-200 focus:border-gray-300 duration-100`}/>
                            <input type={`number`} placeholder={`Do`}
                                   className={`w-full p-4 rounded-lg text-sm outline-none border-2 border-gray-200 focus:border-gray-300 duration-100`}/>
                        </div>
                    </div>

                    {/*    Number Of Rooms*/}
                    <div>
                        <label className={`text-gray-800 mb-1`}>Liczba pokoi</label>
                        <select name={`type`} id={`type`}
                                className={`w-full p-4 rounded-lg text-sm outline-none border-2 border-gray-200 focus:border-gray-300 duration-100`}>
                            <option value={`1`}>1</option>
                            <option value={`2`}>2</option>
                            <option value={`3`}>3</option>
                            <option value={`4`}>4</option>
                            <option value={`5`}>5</option>
                            <option value={`6`}>6</option>
                            <option value={`7`}>7</option>
                            <option value={`8`}>8+</option>
                        </select>
                    </div>

                </div>
                <div className={`ml-auto space-x-4`}>
                    <button>
                        Wyczyść kryteria
                    </button>
                    <button
                        className={`mt-7 text-white py-2 px-12 rounded-sm bg-[#FF0000]`}>
                        Szukaj
                    </button>
                </div>

            </div>
            <main className="flex overflow-x-clip bg-gray-100 pt-12">
                <div className={`px-8 lg:w-7/12 w-full`}>
                    {/*Controls */}
                    {/* Real Estate Listings */}
                    <div className={`space-y-4`}>
                        {listings.map((listing, index) => (
                            <div key={listing.id}
                                 className={`flex items-start gap-x-4 w-full shadow cursor-pointer`}>
                                <Image src={listing.images[0].url} alt={`House`} width={300} height={200}
                                       className={`h-full object-cover`}/>
                                <div className={`h-fit p-4`}>
                                    <h2 className={`text-lg font-bold mb-2`}>{listing.price} PLN</h2>
                                    <p className={`text-gray-500`}>{listing.description.slice(0, 200)}...</p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>


                {/*The map*/}
                <div className={`lg:block hidden sticky right-0 h-[calc(100vh-64px)] top-0 w-5/12`}>
                    <Map position={[52.247463, 21.015801]} zoom={10} locations={listings}/>
                </div>

            </main>
        </main>

    );
}


async function findListings() {
    const res = await fetch('http://159.65.117.50:3000/listings')

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}