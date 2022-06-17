import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useUser } from '@auth0/nextjs-auth0';

export default function LogoutButton() {
    const { user, error, isLoading } = useUser();
    const { t } = useTranslation();

    return (
    user != null ?
    <>
        <a
            aria-label={t("Logout")}
            href="/api/auth/logout"
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="z-50 inline-block p-3 bg-white text-black font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-slate-100 hover:shadow-lg focus:bg-slate-100 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-200 active:shadow-lg top-2 right-2 fixed"
            id="btn-back-to-top"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
        </a>

    </> : <></>);
};