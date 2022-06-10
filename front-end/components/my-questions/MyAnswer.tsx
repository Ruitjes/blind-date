import moment from "moment";
import { useTranslation } from "react-i18next";
import ReportButton from "../ReportButton";

type Props = {
    answer: any;
	onReportAnswer: (answerId: number, answerContent: string, reportedId: string, reportedName: string) => void;
}

const MyAnswer = (props: Props) => {
    const { t, i18n } = useTranslation();
    return (
        <div className="flex flex-col flex-grow px-4">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col p-2">
                    <label>
                        <strong>{props.answer.userProfile.userName}</strong> {t("answered on")} {moment(props.answer.addedOn).locale(i18n.language).format("LL")}
                    </label>
                    <p className="text-xl leading-6">{props.answer.content}</p>
                </div>

                <div className="flex flex-col p-2 justify-center">
                    {/* Report */}
                    {props.onReportAnswer && (
                        <div className="self-end">
                            <ReportButton
                                ariaLabel={t("Report the question")}
                                icon="circle-exclamation"
                                color="indianred"
                                className="report-button"
                                onClick={() => {
                                    props.onReportAnswer(props.answer.id, props.answer.content, props.answer.userProfile.userId, props.answer.userProfile.userName)
                                }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyAnswer;