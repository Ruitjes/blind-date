import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

type Props = {
    question: any;
}

const MyQuestion = (props: Props) => {
    return (
        <div className="flex flex-col flex-grow px-4">
            <div className="flex flex-row">
                <div className="flex flex-col p-2">
                    <label><strong>You</strong> asked at {moment(props.question.addedOn).format("hh:mm MMM D ‘YY")}</label>
                    <p className="text-xl leading-6">{props.question.content}</p>
                </div>
            </div>
            <hr/>
            <div className="flex flex-row">
                <div className="flex flex-col flex-grow p-2">
                    <div className="flex flex-row flex-grow items-center">
                        <p className="flex-grow">0 people have responded</p>
                        <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyQuestion;