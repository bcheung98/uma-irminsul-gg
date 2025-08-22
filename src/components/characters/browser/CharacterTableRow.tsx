import { CSSProperties } from "react";

// Component imports
import Image from "custom/Image";
import RouterLink from "components/nav/RouterLink";
import RarityStars from "custom/RarityStars";
import { StyledTableRow, StyledTableCell } from "styled/StyledTable";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectServer } from "reducers/settings";
import { createDateObject } from "helpers/dates";
import { combineStyles } from "helpers/utils";

// Type imports
import { CharacterRow } from "./CharacterTable";
import { Rank } from "types/_common";

interface CharacterTableRowProps extends CharacterRow {
    turf: Rank;
    dirt: Rank;
    short: Rank;
    mile: Rank;
    medium: Rank;
    long: Rank;
    front: Rank;
    pace: Rank;
    late: Rank;
    end: Rank;
    releaseDate: string;
}

function CharacterTableRow({ row }: { row: CharacterTableRowProps }) {
    const theme = useTheme();

    const region = useAppSelector(selectServer);

    const aptitudes = [
        row.turf,
        row.dirt,
        row.short,
        row.mile,
        row.medium,
        row.long,
        row.front,
        row.pace,
        row.late,
        row.end,
    ];

    const columns: {
        label?: React.ReactNode;
        labelStyle?: CSSProperties;
        img?: string;
        imgStyle?: CSSProperties;
        href?: string;
        columnWidth?: string;
    }[] = [
        {
            label: (
                <>
                    <RouterLink
                        to={`/characters/${row.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}-${row.id}`}
                    >
                        <TextStyled
                            component="span"
                            sx={{
                                mb: "4px",
                                cursor: "pointer",
                                "&:hover": {
                                    color: theme.text.selected,
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            {row.name}
                        </TextStyled>
                    </RouterLink>
                    <TextStyled
                        variant="body2-styled"
                        sx={{ fontStyle: "italic" }}
                    >
                        {row.title}
                    </TextStyled>
                </>
            ),
            labelStyle: { cursor: "default" },
            img: `characters/icons/${row.id}`,
            imgStyle: {
                width: "48px",
                height: "auto",
                cursor: "pointer",
            },
            href: `/characters/${row.name.split(" ").join("-").toLowerCase()}-${
                row.id
            }`,
            columnWidth: "max-content",
        },
        {
            label: <RarityStars rarity={row.rarity} variant="h6-styled" />,
            columnWidth: "48px",
        },
    ];

    aptitudes.forEach((apt) =>
        columns.push({
            img: `ranks/${apt}`,
            imgStyle: {
                width: "24px",
                height: "24px",
            },
        })
    );

    columns.push({
        label: `${
            createDateObject({ date: row.releaseDate, region: region }).date
        }`,
    });

    return (
        <StyledTableRow color="secondary" hover>
            {columns.map((col, index) => (
                <StyledTableCell
                    key={index}
                    sx={{
                        pl: index > 1 ? 1 : 2,
                        pr: index > 1 && index < columns.length - 1 ? 0 : 2,
                    }}
                >
                    <FlexBox
                        columnGap="16px"
                        sx={{ width: col.columnWidth || "max-content" }}
                        justifyContent="center"
                    >
                        {col.img &&
                            (col.href ? (
                                <RouterLink to={col.href}>
                                    <Image
                                        src={col.img}
                                        alt={col.img.split("/").slice(-1)[0]}
                                        style={combineStyles(
                                            {
                                                width: "32px",
                                                height: "32px",
                                            },
                                            col.imgStyle
                                        )}
                                    />
                                </RouterLink>
                            ) : (
                                <Image
                                    src={col.img}
                                    alt={col.img.split("/").slice(-1)[0]}
                                    style={combineStyles(
                                        {
                                            width: "32px",
                                            height: "32px",
                                        },
                                        col.imgStyle
                                    )}
                                />
                            ))}
                        {col.label && (
                            <TextStyled
                                component="span"
                                sx={combineStyles(
                                    { textAlign: "left" },
                                    col.labelStyle
                                )}
                            >
                                {col.label}
                            </TextStyled>
                        )}
                    </FlexBox>
                </StyledTableCell>
            ))}
        </StyledTableRow>
    );
}

export default CharacterTableRow;
