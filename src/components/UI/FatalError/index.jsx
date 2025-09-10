import { STATUS_SEPARATOR } from "../../../constants/owm";

export default function FatalError({ error }) {
    return (
        <p className="fatal-error card">{error.slice(error.indexOf(STATUS_SEPARATOR) + STATUS_SEPARATOR.length)}</p>
    );
}