// Component imports
import MainContentBox from "custom/MainContentBox";
import StatsTable from "custom/StatsTable";

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material";

// Type imports
import { CharacterProps } from "types/character";
import Image from "custom/Image";

function CharacterStats({ character }: CharacterProps) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const { rarity, stats } = character;

    const iconStyle = {
        width: matches_md_up ? "28px" : "20px",
    };

    const levels =
        rarity === 1
            ? ["1★", "2★", "3★", "4★", "5★", "Bonus"]
            : ["3★", "4★", "5★", "Bonus"];

    const data = [
        ["", ...levels],
        ["Speed", ...levels.map((_, index) => stats.spd[index])],
        ["Stamina", ...levels.map((_, index) => stats.sta[index])],
        ["Power", ...levels.map((_, index) => stats.pwr[index])],
        ["Gut", ...levels.map((_, index) => stats.gut[index])],
        ["Wits", ...levels.map((_, index) => stats.wit[index])],
    ];

    const headColumns = [
        "",
        <Image src="stat_icons/spd" style={iconStyle} tooltip="Speed" />,
        <Image src="stat_icons/sta" style={iconStyle} tooltip="Stamina" />,
        <Image src="stat_icons/pwr" style={iconStyle} tooltip="Power" />,
        <Image src="stat_icons/gut" style={iconStyle} tooltip="Gut" />,
        <Image src="stat_icons/wit" style={iconStyle} tooltip="Wits" />,
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
