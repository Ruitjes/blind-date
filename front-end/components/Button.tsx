import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    ariaLabel: string;
    icon: IconName;
    color?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

const Button = (props: Props) => {

    return (
        <button disabled={props.disabled} className={`${props.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-100 hover:shadow-lg focus:bg-slate-100 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-200 active:shadow-lg"} flex aspect-square items-center rounded-full p-4 bg-white shadow-md`} onClick={props.disabled ? () => {} : props.onClick} aria-label={props.ariaLabel}>
            <FontAwesomeIcon fixedWidth size="3x" color={props.color} icon={['fas', props.icon]}/>
        </button>
    )
}

export default Button;