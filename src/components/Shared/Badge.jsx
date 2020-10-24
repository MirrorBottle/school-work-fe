import React from "react";
import {
    Badge
} from "reactstrap";


export const OptionalBadge = ({ value }) => {
    let color = "primary";
    if (value === "Belum Divalidasi" || value === "Setoran") {
        color = "primary"
    } else if (value === "Lunas" || value === "Disetujui" || value === "Peminjaman") {
        color = "success"
    } else if (value === "Belum Lunas" || value === "Mengubah") {
        color = "warning"
    } else if (value === "Ditolak" || value === "Belum Lunas Terlambat" || value === "Menghapus") {
        color = "danger"
    } else if (value === "Lunas Terlambat" || value === "Angsuran" || "Membuat") {
        color = "info"
    }
    return <h2><Badge color={color} pill>{value}</Badge></h2>
}