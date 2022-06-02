import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import moment from "moment";
import { useTranslation } from "react-i18next";

type Props = {
    question: any;
    onClick?: VoidFunction;
}

const MyQuestion = (props: Props) => {
    const { t, i18n } = useTranslation();
    return (
        <div className="flex flex-col flex-grow px-4" onClick={props.onClick}>
            <div className="flex flex-row">
                <div className="flex flex-col p-2">
                    <label>
                        <strong>{t('You')}</strong> {t("asked on")} {moment(props.question.addedOn).locale(i18n.language).format("LL")}
                    </label>
                    <p className="text-xl leading-6">{props.question.content}</p>
                </div>
            </div>
            <hr/>
            <div className="flex flex-row">
                <div className="flex flex-col flex-grow p-2">
                    <div className="flex flex-row flex-grow items-center">
                        <p className="flex-grow">{t("{{count}} people have responded", {
                            count: props.question.numberOfAnswers  
                        })}</p>
                        <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyQuestion;