import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();

const ProfileSkeleton = () => {
    return (
        <>
            <div className="flex flex-col flex-grow w-full max-w-sm">
                <div className="flex flex-col mt-4 mb-6">
                    <div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                    <div className="flex flex-wrap -mx-3">
                                        <div className="w-full px-3">
                                            <label className="block text-gray-700 text-xs font-bold mb-2">
                                                {t("Display name")}
                                            </label>
                                            <div className="appearance-none bg-gray-300 animate-pulse block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-12" />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3">
                                        <div className="w-full px-3">
                                            <label className="block text-gray-700 text-xs font-bold mb-2">
                                                {t("Date of birth")}
                                            </label>
                                            <div className="appearance-none bg-gray-300 animate-pulse block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-12" />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 px-3">
                                        <div className="w-full">
                                            <label className="block text-gray-700 text-xs font-bold mb-2">
                                                {t("Gender")}
                                            </label>
                                        </div>
                                        <div className="appearance-none bg-gray-300 animate-pulse block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-12" />
                                    </div>

                                    <div className="flex flex-wrap -mx-3 px-3">
                                        <div className="w-full">
                                            <label className="block text-gray-700 text-xs font-bold mb-2">
                                                {t("Language")}
                                            </label>
                                        </div>
                                        <div className="appearance-none bg-gray-300 animate-pulse block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-12" />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 text-xs font-bold mb-2">
                                            {t("Interests")}
                                        </label>
                                        <div className="flex flex-col space-y-4 items-center mx-4 sm:mx-0">
                                            <div className="appearance-none bg-gray-300 animate-pulse block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-12" />
                                            <div className='my-3 flex flex-wrap -m-1'>
                                                <div className="appearance-none bg-gray-300 animate-pulse block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-12" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ProfileSkeleton;