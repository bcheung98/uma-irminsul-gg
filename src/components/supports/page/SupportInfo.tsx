import { useState } from "react";
import parse from "html-react-parser";

// Component imports
import Image from "custom/Image";
import InfoChip from "custom/InfoChip";
import MainContentBox from "custom/MainContentBox";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import {
    useTheme,
    Box,
    Divider,
    Card,
    Stack,
    IconButton,
    Dialog,
    ButtonBase,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { getSupportCardRarity } from "helpers/supportCardRarity";

// Type imports
import { SupportProps } from "types/support";

function SupportInfo({ support }: SupportProps) {
    const theme = useTheme();

    const { name, title, rarity, specialty, splash } = support;

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card
                sx={{
                    p: "16px",
                    backgroundColor: theme.background(2),
                }}
            >
                <Stack spacing={2} divider={<Divider />}>
                    <FlexBox
                        sx={{
                            flexWrap: "wrap",
                            columnGap: "16px",
                            rowGap: "8px",
                        }}
                    >
                        <Box>
                            <Box sx={{ mb: "8px" }}>
                                <TextStyled
                                    variant="h6-styled"
                                    sx={{ mb: "4px", fontStyle: "italic" }}
                                >
                                    {title}
                                </TextStyled>
                                <TextStyled variant="h4-styled">
                                    {name}
                                </TextStyled>
                            </Box>
                            <FlexBox sx={{ flexWrap: "wrap", gap: "8px" }}>
                                <Image
                                    src={`ranks/${getSupportCardRarity(
                                        rarity
                                    )}`}
                                    alt={rarity.toString()}
                                    style={{ height: "28px" }}
                                />
                                <InfoChip
                                    src={`stat_icons/${specialty}`}
                                    label={specialty}
                                    color="tertiary"
                                />
                            </FlexBox>
                        </Box>
                    </FlexBox>
                    <FlexBox sx={{ alignItems: "center" }}>
                        <IconButton disableRipple onClick={handleClickOpen}>
                            <InfoOutlinedIcon />
                        </IconButton>
                        <ButtonBase disableRipple onClick={handleClickOpen}>
                            <TextStyled
                                variant="subtitle1-styled"
                                sx={{ fontStyle: "italic" }}
                            >
                                View Description
                            </TextStyled>
                        </ButtonBase>
                    </FlexBox>
                </Stack>
            </Card>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <Box sx={{ overflowY: "auto", scrollbarWidth: "thin" }}>
                    <MainContentBox
                        title=""
                        actions={
                            <IconButton
                                disableRipple
                                onClick={handleClose}
                                sx={{ color: theme.appbar.color }}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                    >
                        <TextStyled
                            component="span"
                            variant="subtitle1-styled"
                            sx={{ fontStyle: "italic" }}
                        >
                            {parse(splash.en)}
                        </TextStyled>
                    </MainContentBox>
                </Box>
            </Dialog>
        </>
    );
}

export default SupportInfo;
