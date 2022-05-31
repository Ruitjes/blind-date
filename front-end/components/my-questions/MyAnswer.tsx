import moment from "moment";
import { useTranslation } from "react-i18next";

type Props = {
    answer: any;
}

const MyAnswer = (props: Props) => {
    const { t, i18n } = useTranslation();
    return (
        <div className="flex flex-col flex-grow px-4">
            <div className="flex flex-row">
                <div className="flex flex-col p-2">
                    <label>
                        <strong>{props.answer.userProfile.userName}</strong> {t("answered on")} {moment(props.answer.addedOn).locale(i18n.language).format("LL")}
                    </label>
                    <p className="text-xl leading-6">{props.answer.content}</p>
                </div>
            </div>
        </div>
    )
}

export default MyAnswer;