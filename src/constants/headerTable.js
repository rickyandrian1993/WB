import React from "react";
// import { Badge } from "@mantine/core";
import { ActionsButton } from "../components";
import { dateFormat } from "../helpers/utility";
import { dateTimeHMS, } from "./dateFormat";

export const columns = [
    {
        name: 'Aksi',
        grow: 2,
        selector: row => <ActionsButton data={row} />
    },
    {
        name: 'Tanggal Masuk',
        selector: row => row.wb_arrive_dt ? dateFormat(row.wb_arrive_dt, dateTimeHMS) : '-',
        sortable: true,
    },
    {
        name: 'Tanggal Keluar',
        selector: row => row.first_update ? dateFormat(row.first_update, dateTimeHMS) : '-',
        sortable: true,
    },
    {
        name: 'Komoditi',
        selector: row => row.comodity_nm ?? '-',
        sortable: true,
    },
    {
        name: 'No. Kendaraan',
        selector: row => row.pcc_vehicle_cd ?? '-',
        sortable: true,
    },
    {
        name: 'Timbangan Pertama',
        selector: row => parseInt(row.first_w) || '-'
    },
    {
        name: 'Timbangan Kedua',
        selector: row => parseInt(row.second_w) || '-'
    },
    {
        name: 'Netto',
        selector: row => parseInt(row.netto_w) || '-'
    },
]
