type Props = {
    text: string;
}

const Subtitle = (props: Props) => (
    <p className="text-gray-400 text-sm leading-tight">{props.text}</p>
);

export default Subtitle;