type Props = {
    text: string;
}

const Question = (props: Props) => {
    return (
        <div className="flex flex-col">
            <div className="info-card layer-2 -m-4 p-4 drop-shadow-lg">
                <div className="info-card layer-1 -m-4 p-4 py-6 drop-shadow-lg">
                    <div className="info-card -m-4 p-4 py-6 drop-shadow-lg">
                        <h1 className="text-gray-700 text-center text-3xl">
                            {props.text}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question;