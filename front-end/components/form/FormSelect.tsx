import React from "react";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    loading?: boolean,
    value?: string | number | readonly string[],
    label?: string,
    onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined,
    children?:
    | React.ReactChild
    | React.ReactChild[];
}>;

export default function FormSelect({ children, value, label, onChange, loading }: Props) {
    return (<>
        <div className="flex flex-wrap -mx-3 px-3">
            <div className="w-full">
                <label className="block text-gray-700 text-xs font-bold mb-2">
                    {label}
                </label>
            </div>
            {loading ?
                <div className="appearance-none bg-gray-300 animate-pulse block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-12" />
                :
                <div className="inline-block relative w-full">
                    <select className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={value} onChange={onChange}>
                        {children}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            }
        </div>
    </>);
}