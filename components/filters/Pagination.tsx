'use client'

import React from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import useTranslations from "@/components/hooks/useTranslations";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination = ({currentPage, totalPages}: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { nextPage: nextPageStr} = useTranslations();

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', page.toString());
            router.push(`/?${params.toString()}`);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxDisplayedPages = 5;
        const halfMaxDisplayedPages = Math.floor(maxDisplayedPages / 2);
        let startPage = Math.max(currentPage - halfMaxDisplayedPages, 1);
        let endPage = Math.min(currentPage + halfMaxDisplayedPages, totalPages);

        if (currentPage <= halfMaxDisplayedPages) {
            endPage = Math.min(maxDisplayedPages, totalPages);
        }

        if (currentPage + halfMaxDisplayedPages >= totalPages) {
            startPage = Math.max(totalPages - maxDisplayedPages + 1, 1);
        }

        if (startPage > 1) {
            pageNumbers.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={`px-4 py-2 mx-1 rounded-md ${1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-300 duration-200'}`}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pageNumbers.push(<span key="ellipsis-start" className="px-2">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 mx-1 rounded-md ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-300 duration-200'}`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<span key="ellipsis-end" className="px-2">...</span>);
            }
            pageNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`px-4 py-2 mx-1 rounded-md ${totalPages === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-300 duration-200'}`}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <>
            <div className="flex justify-between mt-4 w-full">
                <div className={`flex items-center text-sm`}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-4 py-2 mx-1 bg-gray-200 rounded-md"
                        disabled={currentPage === 1}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4`} fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <div className={`mx-2 flex items-end`}>
                        {renderPageNumbers()}
                    </div>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-4 py-2 mx-1 bg-gray-200 rounded-md"
                        disabled={currentPage === totalPages}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4`} fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>

                <button onClick={() => handlePageChange(currentPage + 1)}
                        className="px-4 py-1 mx-1 bg-gray-200 text-sm rounded-md hover:bg-blue-300 duration-200">
                    {nextPageStr}
                </button>
            </div>
        </>
    );
};

export default Pagination;
