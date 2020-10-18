import { LoadingButton } from "./Buttons";
import { OptionalBadge } from "./Badge";
import Confirm from "./Confirm";
import ActionDropdown from "./ActionDropdown"
import Table from "./Table";
import Alert from "./Alert";

const PaymentSelects = [
    {
        value: 3,
        label: "3 Kali"
    },
    {
        value: 6,
        label: "6 Kali"
    },
    {
        value: 12,
        label: "12 Kali"
    },
    {
        value: 24,
        label: "24 Kali"
    },
    {
        value: 36,
        label: "36 Kali"
    },
    {
        value: 48,
        label: "48 Kali"
    },
]
const InterestSelects = [...Array(11)].map((val, index) => ({
    value: index * 10,
    label: `${index * 10}%`
}))
export {
    LoadingButton,
    OptionalBadge,
    Table,
    Confirm,
    PaymentSelects,
    InterestSelects,
    ActionDropdown,
    Alert,
};