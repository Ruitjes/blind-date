import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    icon: IconName;
    color?: string;
    onClick?: VoidFunction;
    disabled?: boolean;
}

const Button = (props: Props) => {

    return (
        <div className="flex aspect-square items-center rounded-full p-4 bg-white" onClick={props.onClick}>
            <FontAwesomeIcon fixedWidth size="4x" color={props.color} icon={['fas', props.icon]}/>
        </div>
    )
}

export default Button;