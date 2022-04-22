import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
	ariaLabel: string;
	icon: IconName;
	color?: string;
	onClick?: VoidFunction;
	className?: string;
};

const ReportButton = (props: Props) => {
	return (
		<button
			className={'' + props.className}
			onClick={props.onClick}
			aria-label={props.ariaLabel}
		>
			<FontAwesomeIcon
				fixedWidth
				size="2x"
				color={props.color}
				icon={['fas', props.icon]}
			/>
		</button>
	);
};

export default ReportButton;
