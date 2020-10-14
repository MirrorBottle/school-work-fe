import React from "react";
import {
    Badge
} from "reactstrap";


export const OptionalBadge = ({ value }) => {
    if (value === "Belum Divalidasi") {
        return <h2><Badge color="primary" pill>Belum Divalidasi</Badge></h2>
    } else if (value === "Lunas" || value === "Disetujui") {
        return <h2><Badge color="success" pill>{value}</Badge></h2>
    } else if (value === "Belum Lunas") {
        return <h2><Badge color="warning" pill>Belum Lunas</Badge></h2>
    } else if (value === "Ditolak") {
        return <h2><Badge color="danger" pill>Ditolak</Badge></h2>
    } else if (value === "Lunas Terlambat") {
        return <h2><Badge color="info" pill>Lunas Terlambat</Badge></h2>
    } else if (value === "Belum Lunas Terlambat") {
        return <h2><Badge color="danger" pill>Belum Lunas Terlambat</Badge></h2>
    }
}