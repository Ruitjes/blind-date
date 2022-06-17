import React from "react";
import Loading from "./Loading";
import { useProfile } from "../hooks/useProfile"

type Props = {
    children: React.ReactNode;
}

const Suppress = (props: Props) => {

    const { loading, error } = useProfile();

    return loading ? (
        <div className="absolute flex justify-center items-center inset-0 bg-black/50">
            <Loading />
        </div>
    ) : error ? (
        <div className="absolute flex justify-center items-center inset-0 bg-black/50">
            <h1 className="text-white">{error.message}</h1>
        </div>
    ) : (
        <>{props.children}</>
    )
}

export default Suppress;