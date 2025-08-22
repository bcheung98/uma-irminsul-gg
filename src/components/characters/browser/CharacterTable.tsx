import { BaseSyntheticEvent, useState } from "react";

// Component imports
import CharacterTableRow from "./CharacterTableRow";
import MainContentBox from "custom/MainContentBox";
import SortTableHead, {
    getComparator,
    HeadColumn,
    Order,
} from "custom/SortTableHead";

// MUI imports
import { Table, TableContainer, TableBody } from "@mui/material";

// Type imports
import { Character } from "types/character";

export type CharacterRow = Pick<Character, "id" | "name" | "title" | "rarity">;

function CharacterTable({ characters }: { characters: Character[] }) {
    const [order, setOrder] = useState<Order>("desc");
    const [orderBy, setOrderBy] = useState("releaseDate");

    const handleRequestSort = (_: BaseSyntheticEvent, property: string) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const headColumns: HeadColumn[] = [
        { id: "name", label: "Name" },
        { id: "rarity", label: "Rarity" },
        { id: "turf", label: "Turf" },
        { id: "dirt", label: "Dirt" },
        { id: "short", label: "Sprint" },
        { id: "mile", label: "Mile" },
        { id: "medium", label: "Med" },
        { id: "long", label: "Long" },
        { id: "front", label: "Front" },
        { id: "pace", label: "Pace" },
        { id: "late", label: "Late" },
        { id: "end", label: "End" },
        { id: "releaseDate", label: "Release Date" },
    ];

    const rows = characters.map((char) => ({
        id: char.id,
        name: char.name,
        title: char.title,
        rarity: char.rarity,
        turf: char.aptitude.surface.turf,
        dirt: char.aptitude.surface.dirt,
        short: char.aptitude.distance.short,
        mile: char.aptitude.distance.mile,
        medium: char.aptitude.distance.medium,
        long: char.aptitude.distance.long,
        front: char.aptitude.strategy.front,
        pace: char.aptitude.strategy.pace,
        late: char.aptitude.strategy.late,
        end: char.aptitude.strategy.end,
        releaseDate: char.release.global,
    }));

    return (
        <MainContentBox
            title={`${characters.length} ${
                characters.length === 1 ? "Character" : "Characters"
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
                                <CharacterTableRow key={row.id} row={row} />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainContentBox>
    );
}

export default CharacterTable;
