// Component imports
import MainContentBox from "custom/MainContentBox";
import StatsTable from "custom/StatsTable";
import Image from "custom/Image";

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material";
import { range } from "helpers/utils";

// Type imports
import { CharacterProps } from "types/character";

function CharacterStats({ character }: CharacterProps) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const { rarity, stats } = character;

    const iconStyle = {
        width: matches_md_up ? "28px" : "20px",
    };

    const levels = range(rarity, 5).map((i) => `${i}★`);
    levels.push("Bonus");

    const data = [
        ["", ...levels],
        ["Speed", ...levels.map((_, index) => stats.speed[index])],
        ["Stamina", ...levels.map((_, index) => stats.stamina[index])],
        ["Power", ...levels.map((_, index) => stats.power[index])],
        ["Guts", ...levels.map((_, index) => stats.guts[index])],
        ["Wit", ...levels.map((_, index) => stats.wit[index])],
    ];

    const headColumns = [
        "",
        <Image src="stat_icons/Speed" style={iconStyle} tooltip="Speed" />,
        <Image src="stat_icons/Stamina" style={iconStyle} tooltip="Stamina" />,
        <Image src="stat_icons/Power" style={iconStyle} tooltip="Power" />,
        <Image src="stat_icons/Guts" style={iconStyle} tooltip="Guts" />,
        <Image src="stat_icons/Wit" style={iconStyle} tooltip="Wit" />,
    ];

    return (
        <MainContentBox title="Stats" contentProps={{ padding: 0 }}>
            <StatsTable
                mode="table"
                levels={levels}
                data={data}
                headColumns={headColumns}
                orientation="column"
                tableProps={{ headerBackgroundColor: theme.appbar.hover }}
            />
        </MainContentBox>
    );
}

export default CharacterStats;
