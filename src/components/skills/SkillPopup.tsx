import parse from "html-react-parser";

// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import RouterLink from "components/nav/RouterLink";
import { Text, TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    IconButton,
    Card,
    Stack,
    Box,
    Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { sortBy } from "helpers/utils";
import { selectCharacters } from "reducers/character";
import { selectSupports } from "reducers/support";
import { getSkillRarityColor } from "helpers/skillRarity";

// Type imports
import { Skill } from "types/skill";
import { Rarity, Specialty } from "types/_common";

interface RenderImageProps {
    type: "character" | "support";
    id: number;
    name: string;
    title: string;
    rank: Rarity;
    specialty?: Specialty;
    outfit?: string;
}

function SkillPopup({
    skill,
    showSources = true,
    handleClose,
}: {
    skill: Skill;
    showSources?: boolean;
    handleClose: () => void;
}) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const characters = useAppSelector(selectCharacters);
    const supports = useAppSelector(selectSupports);

    const { id, name, description, rarity, cost, icon } = skill;

    const skillName = name.global || name.jp;

    const textStyle = {
        color: rarity >= 2 ? "rgb(121, 64, 22)" : theme.text.primary,
    };

    const skillDesc = (
        <Text component="span" variant="body2-styled" sx={textStyle}>
            {parse(description.global || description.jp)}
        </Text>
    );

    const skillUnlock = rarity === 4 && (
        <TextStyled sx={textStyle}>(3★)</TextStyled>
    );

    const ranks = ["R", "SR", "SSR"];

    const renderImage = ({
        type,
        id,
        name,
        title,
        rank,
        specialty,
        outfit = "Original",
    }: RenderImageProps) => {
        const tooltip =
            type === "character"
                ? `${name} (${outfit || "Original"})`
                : `${name} (${ranks[rank - 3]} ${specialty})`;
        return (
            <RouterLink
                to={`/${type}s/${name
                    .split(" ")
                    .join("-")
                    .toLowerCase()}-${id}`}
            >
                <Image
                    src={`${type}s/icons/${id}`}
                    alt={`[${title}] ${name}`}
                    style={{
                        width: matches_md_up ? "48px" : "40px",
                    }}
                    tooltip={tooltip}
                    onClick={handleClose}
                />
            </RouterLink>
        );
    };

    const characterSources = characters.filter((char) =>
        [
            ...char.skills.awakening,
            ...char.skills.innate,
            ...char.skills.unique,
        ].includes(id)
    );

    const characterEventSources = characters.filter((char) =>
        char.skills.event.includes(id)
    );

    const supportSources = supports
        .filter((supp) => supp.hints.skills.includes(id))
        .sort((a, b) => sortBy(a.rarity, b.rarity) || sortBy(b.id, a.id));

    const supportEventSources = supports
        .filter((supp) => supp.skillEvents.includes(id))
        .sort((a, b) => sortBy(a.rarity, b.rarity) || sortBy(b.id, a.id));

    const sources = [
        characterSources,
        characterEventSources,
        supportSources,
        supportEventSources,
    ].flat();

    return (
        <MainContentBox
            title="Skill Details"
            actions={
                <IconButton
                    disableRipple
                    onClick={handleClose}
                    sx={{ color: theme.appbar.color }}
                >
                    <CloseIcon />
                </IconButton>
            }
            contentProps={{ padding: "16px" }}
        >
            <Stack spacing={1}>
                <Card
                    sx={{
                        p: "8px",
                        backgroundColor: theme.background(0, "main"),
                        backgroundImage: getSkillRarityColor(rarity),
                    }}
                >
                    <Stack spacing={2} direction="row">
                        <Stack
                            spacing={0.5}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Image
                                src={`skills/${icon}`}
                                alt={icon.toString()}
                                style={{
                                    width: matches_md_up ? "48px" : "40px",
                                }}
                            />
                            {skillUnlock}
                        </Stack>
                        <Stack spacing={0.5} sx={{ width: "90%" }}>
                            <FlexBox
                                flexWrap="wrap"
                                columnGap="8px"
                                rowGap="4px"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <TextStyled
                                    variant={
                                        matches_md_up
                                            ? "body1-styled"
                                            : "body2-styled"
                                    }
                                    sx={textStyle}
                                >
                                    {skillName}
                                </TextStyled>
                                {cost && (
                                    <Box
                                        sx={{
                                            p: "1px 8px",
                                            backgroundColor:
                                                theme.appbar.backgroundColor,
                                            borderRadius: "16px",
                                        }}
                                    >
                                        <TextStyled
                                            variant="body2-styled"
                                            sx={{
                                                color: theme.appbar.color,
                                            }}
                                        >{`Skill Pts: ${cost}`}</TextStyled>
                                    </Box>
                                )}
                            </FlexBox>
                            <Divider />
                            {skillDesc}
                        </Stack>
                    </Stack>
                </Card>
                {showSources && sources.length > 0 && (
                    <Stack spacing={1}>
                        {characterSources.length > 0 && (
                            <Box>
                                <TextStyled variant="body2-styled">
                                    Characters:
                                </TextStyled>
                                <Grid container spacing={1}>
                                    {characterSources.map((char, index) => (
                                        <Box key={index}>
                                            {renderImage({
                                                type: "character",
                                                id: char.id,
                                                name: char.name,
                                                title: char.title,
                                                rank: char.rarity,
                                                outfit: char.outfit,
                                            })}
                                        </Box>
                                    ))}
                                </Grid>
                            </Box>
                        )}
                        {characterEventSources.length > 0 && (
                            <Box>
                                <TextStyled variant="body2-styled">
                                    Character Events:
                                </TextStyled>
                                <Grid container spacing={1}>
                                    {characterEventSources.map(
                                        (char, index) => (
                                            <Box key={index}>
                                                {renderImage({
                                                    type: "character",
                                                    id: char.id,
                                                    name: char.name,
                                                    title: char.title,
                                                    rank: char.rarity,
                                                    outfit: char.outfit,
                                                })}
                                            </Box>
                                        )
                                    )}
                                </Grid>
                            </Box>
                        )}
                        {supportSources.length > 0 && (
                            <Box>
                                <TextStyled
                                    variant="body2-styled"
                                    sx={{ mb: "4px" }}
                                >
                                    Support Hints:
                                </TextStyled>
                                <Grid container spacing={1}>
                                    {supportSources.map((supp, index) => (
                                        <Box key={index}>
                                            {renderImage({
                                                type: "support",
                                                id: supp.id,
                                                name: supp.name,
                                                title: supp.title,
                                                rank: supp.rarity,
                                                specialty: supp.specialty,
                                            })}
                                        </Box>
                                    ))}
                                </Grid>
                            </Box>
                        )}
                        {supportEventSources.length > 0 && (
                            <Box>
                                <TextStyled
                                    variant="body2-styled"
                                    sx={{ mb: "4px" }}
                                >
                                    Support Events:
                                </TextStyled>
                                <Grid container spacing={1}>
                                    {supportEventSources.map((supp, index) => (
                                        <Box key={index}>
                                            {renderImage({
                                                type: "support",
                                                id: supp.id,
                                                name: supp.name,
                                                title: supp.title,
                                                rank: supp.rarity,
                                                specialty: supp.specialty,
                                            })}
                                        </Box>
                                    ))}
                                </Grid>
                            </Box>
                        )}
                    </Stack>
                )}
            </Stack>
        </MainContentBox>
    );
}

export default SkillPopup;
