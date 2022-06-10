import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

interface BackButtonProps {
    navPage: string;
}

export default function BackButton({navPage}:BackButtonProps) {
    const { t } = useTranslation();
    const router = useRouter();

    return (<>
                <button
                    aria-label={t("Back")}
                    onClick={() => {router.push(navPage)}}
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="z-50 inline-block p-3 bg-white text-black font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-slate-100 hover:shadow-lg focus:bg-slate-100 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-200 active:shadow-lg top-2 left-2 fixed"
                    id="btn-back-to-top"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>

    </>);
};