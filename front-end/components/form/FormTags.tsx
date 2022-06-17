import React from "react";
import { PropsWithChildren } from "react";
import { useTranslation } from 'react-i18next';

type Props = PropsWithChildren<{
    loading?: boolean,
    tagList: readonly string[],
    value?: string | number | readonly string[],
    label?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    childOnClickEvent: Function;
}>;

export default function FormTags({ tagList, value, label, onChange, childOnClickEvent, onClick, loading }: Props) {
    const { t } = useTranslation();
    
    return (<>
        <div>
            <label className="block text-gray-700 text-xs font-bold mb-2">
                {label}
            </label>
            <div className="flex flex-col space-y-4 items-center mx-4 sm:mx-0">
                {loading ?
                    <div className="appearance-none bg-gray-300 animate-pulse block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-12" />
                    :
                    <div className="flex flex-wrap items-stretch w-full relative">
                        <input aria-label={label} type="text" className="flex-shrink flex-grow flex-auto leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-px flex-1 border h-10 border-grey-light rounded rounded-r-none px-3 relative" placeholder="New interest" value={value} onChange={onChange} />
                        <div className="flex -mr-px">
                            <button aria-label={t("Add interest")} className="flex items-center leading-normal bg-grey-lighter rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm" type="button" onClick={onClick}>+</button>
                        </div>
                    </div>
                }
                <div className='my-3 flex flex-wrap -m-1'>

                    {loading ? <div className="appearance-none bg-gray-300 animate-pulse block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-12" /> :
                        tagList?.length > 0 ? tagList?.map((tag, id) =>
                            <span key={id}
                                className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-30 rounded px-4 py-2 font-bold leading-loose cursor-pointer">
                                {tag}
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => { childOnClickEvent(tag) }}
                                    className="w-3 h-3 sm:h-4 sm:w-4 ml-4 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd" />
                                </svg>
                            </span>
                        ) : <></>}
                </div>
            </div>
        </div>
    </>);
}