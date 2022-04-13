type Props = {
    text: string;
    center?: boolean;
}

const Header = (props: Props) => (
    <h1 className={`text-gray-700 text-2xl leading-tight${props.center ? " text-center" : ""}`}>{props.text}</h1>
);

export default Header;