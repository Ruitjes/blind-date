import React from "react";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    loading?: boolean,
    type?: React.HTMLInputTypeAttribute | undefined,
    label?: string,
    value?: string | number | readonly string[],
    defaultValue?: string | number | readonly string[],
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined,
}>;

export default function FormInput({label, defaultValue, value, type, onChange, loading}:Props) {
    return (<>
        <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
                <label className="block text-gray-700 text-xs font-bold mb-2">
                    {label}
                </label>
                {loading ? 
                <div className="appearance-none bg-gray-300 animate-pulse block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-12" />
                :
                <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type={type} value={value} defaultValue={defaultValue} onChange={onChange} />
                }
            </div>
        </div>
    </>);
}