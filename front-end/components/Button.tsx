import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    ariaLabel: string;
    icon: IconName;
    color?: string;
    onClick?: VoidFunction;
    disabled?: boolean;
}

const Button = (props: Props) => {

    return (
        <button  className="flex aspect-square items-center rounded-full p-4 bg-white" onClick={props.onClick} aria-label = {props.ariaLabel}>
            <FontAwesomeIcon fixedWidth size="4x" color={props.color} icon={['fas', props.icon]}/>
        </button>
    )
}

export default Button;