import { BaseSyntheticEvent, useState } from "react";

// Component imports
import SupportTableRow from "./SupportTableRow";
import MainContentBox from "custom/MainContentBox";
import SortTableHead, {
    getComparator,
    HeadColumn,
    Order,
} from "custom/SortTableHead";

// MUI imports
import { Table, TableContainer, TableBody } from "@mui/material";

// Type imports
import { Support } from "types/support";

export type SupportRow = Pick<
    Support,
    "id" | "name" | "title" | "rarity" | "specialty"
>;

function SupportTable({ supports }: { supports: Support[] }) {
    const [order, setOrder] = useState<Order>("desc");
    const [orderBy, setOrderBy] = useState("rarity");

    const handleRequestSort = (_: BaseSyntheticEvent, property: string) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const headColumns: HeadColumn[] = [
        { id: "name", label: "Name" },
        { id: "rarity", label: "Rarity" },
        { id: "specialty", label: "Specialty" },
        { id: "releaseDate", label: "Release Date" },
    ];

    const rows = supports.map((supp) => ({
        id: supp.id,
        name: supp.name,
        title: supp.title,
        rarity: supp.rarity,
        specialty: supp.specialty,
        releaseDate: supp.release.global,
    }));

    return (
        <MainContentBox
            title={`${supports.length} ${
                supports.length === 1 ? "Support Card" : "Support Cards"
            }`}
            contentProps={{ padding: 0 }}
        >
            <TableContainer>
                <Table>
                    <SortTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headColumns={headColumns}
                    />
                    <TableBody>
                        {rows
                            .sort(getComparator(order, orderBy, "id"))
                            .map((row) => (
                                <SupportTableRow key={row.id} row={row} />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainContentBox>
    );
}

export default SupportTable;
