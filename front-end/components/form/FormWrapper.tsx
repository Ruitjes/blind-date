import React from "react";
import { PropsWithChildren } from "react";
import { useTranslation } from 'react-i18next';

type Props = PropsWithChildren<{
    title?: string,
    onSave?: React.FormEventHandler<HTMLFormElement>,
    onDelete?: React.MouseEventHandler<HTMLButtonElement>,
    children?:
    | React.ReactChild
    | React.ReactChild[];
}>;

export default function FormWrapper({ children, onSave, onDelete, title }: Props) {
    const { t } = useTranslation();
    return (<>
        <div>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <form onSubmit={onSave}>
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
                    </div>
                        {children}
                    </div>
                    <div className="px-4 py-3 bg-gray-50 flex flex-grow justify-end">
                        { onSave && <button type="submit" aria-label={t("Save")} className="inline-flex justify-center py-2 px-4 border mx-2 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">{t("Save")}</button> }
                        { onDelete && <button aria-label={t("Delete Profile")} type={"button"} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={onDelete}>{t("Delete Profile")}</button> }
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </>);
}