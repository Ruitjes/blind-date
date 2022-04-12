type Props = {
    onChange: React.ChangeEventHandler<HTMLDivElement>;
}

const AskQuestionEditBox = (props: Props) => {

    return (
        <div className="flex items-center justify-center border-2 border-gray-200 rounded-lg h-24 overflow-auto drop-shadow-lg">
            <div contentEditable="true" className="margin-auto text-2xl text-center flex-grow outline-none" onInput={props.onChange}></div>
        </div>
    )
}

export default AskQuestionEditBox;