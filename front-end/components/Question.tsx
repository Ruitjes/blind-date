import { useTranslation } from 'react-i18next';
import Loading from './Loading';
import ReportButton from './ReportButton';

type Props = {
    text: string;
    loading?: boolean;
	onReportClick?: VoidFunction;
};

const Question = (props: Props) => {
	const { t } = useTranslation();
	
    return (
        <div className="flex flex-col">
			<div className="info-card layer-2 -m-4 p-4 drop-shadow-lg">
				<div className="info-card layer-1 -m-4 p-4 py-6 drop-shadow-lg">
					<div className="flex flex-col info-card -m-4 p-4 py-6 drop-shadow-lg">
                        { props.loading ? (
                            <div className="flex flex-grow justify-center">
                                <Loading />
                            </div>
                        ) : (
                            <h1 className="text-gray-700 text-center text-3xl">
                                {props.text}
                            </h1>
                        )}
            
						{props.onReportClick && !props.loading && (
							<div className="self-end">
								<ReportButton
									ariaLabel={t("Report the question")}
									icon="circle-exclamation"
									color="indianred"
									className="report-button"
									onClick={props.onReportClick}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Question;
