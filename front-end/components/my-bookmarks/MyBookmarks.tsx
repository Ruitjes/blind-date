import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import moment from "moment";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

type Props = {
    question: any;
    onClick?: VoidFunction;
}

const MyBookmarks = (props: Props) => {
    const { t, i18n } = useTranslation();
    return (
        <div className="flex flex-col flex-grow px-4">
            <div className="flex flex-row">
                <div className="flex flex-col p-2">
                    <p className="text-xl leading-6">{props.question.content}</p>
                </div>
            </div>
            <hr/>
            <div className="flex flex-row">
                <div className="flex flex-col flex-grow p-2">
                    <div className="flex flex-row flex-grow items-center cursor-pointer" onClick={props.onClick}>
                        <p className="flex-grow ">{t("Answer saved question")}</p>
                        <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBookmarks;