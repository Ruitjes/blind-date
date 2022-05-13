import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

type Props = {
    answer: any;
}

const MyAnswer = (props: Props) => {
    return (
        <div className="flex flex-col flex-grow px-4">
            <div className="flex flex-row">
                <div className="flex flex-col p-2">
                    <label><strong>{props.answer.userProfile.userName}</strong> answered on {moment(props.answer.addedOn).format("MMM D ‘YY")}</label>
                    <p className="text-xl leading-6">{props.answer.content}</p>
                </div>
            </div>
        </div>
    )
}

export default MyAnswer;