type Props = {
    value?: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const AskQuestionEditBox = (props: Props) => {

    return (
        <div className="flex flex-col py-2">
            <textarea 
                className="outline-none border border-gray-400 text-gray-700 p-2 px-1 rounded-lg text-2xl text-center" 
                rows={3} placeholder="Write your question here..." value={props.value} onChange={props.onChange}>
            </textarea>
        </div>
    )
}

export default AskQuestionEditBox;