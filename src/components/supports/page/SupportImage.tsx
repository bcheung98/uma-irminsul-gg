import { useState } from "react";

// Component imports
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    SxProps,
    Dialog,
    Card,
    ButtonBase,
    Box,
    Icon,
    Stack,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Helper imports
import {
    getSupportCardRarity,
    getSupportCardRarityColor,
} from "helpers/supportCardRarity";

// Type imports
import { SupportProps } from "types/support";
import SupportSplashText from "./SupportSplashText";

function SupportImage({ support }: SupportProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const rootStyle: SxProps = {
        position: "relative",
        overflow: "visible",
        width: "100%",
        height: "auto",
        background: `linear-gradient(to bottom, transparent, ${theme.appbar.backgroundColor})`,
    };

    const imageContainerStyle: SxProps = {
        display: "flex",
        overflow: "clip",
        borderRadius: "16px",
        width: "auto",
        backgroundColor: "transparent",
        border: "4px solid transparent",
        backgroundImage: `linear-gradient(transparent, transparent), ${getSupportCardRarityColor(
            support.rarity
        )}`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
    };

    return (
        <>
            <Card sx={rootStyle} elevation={2}>
                <Card
                    elevation={0}
                    sx={{
                        backgroundColor: "transparent",
                        width: "100%",
                        height: "auto",
                    }}
                >
                    <Box sx={imageContainerStyle}>
                        <Image
                            src={`supports/card/${support.id}`}
                            alt={support.name}
                            style={{
                                width: "100%",
                                height: matches_sm_up ? "300px" : "auto",
                            }}
                        />
                    </Box>
                    <ButtonBase disableRipple onClick={handleClickOpen}>
                        <Stack
                            spacing={0.5}
                            direction="row"
                            alignItems="center"
                            sx={{ p: "8px" }}
                        >
                            <Icon
                                sx={{
                                    width: { xs: "20px", sm: "24px" },
                                    height: { xs: "20px", sm: "24px" },
                                    lineHeight: { xs: "20px", sm: "24px" },
                                    color: theme.appbar.color,
                                }}
                            >
                                <InfoOutlinedIcon
                                    fontSize={
                                        matches_sm_up ? "medium" : "small"
                                    }
                                />
                            </Icon>

                            <TextStyled
                                variant="body2-styled"
                                sx={{
                                    fontStyle: "italic",
                                    color: theme.appbar.color,
                                }}
                            >
                                Flavor Text
                            </TextStyled>
                        </Stack>
                    </ButtonBase>
                </Card>
                <Box
                    sx={{
                        position: "absolute",
                        zIndex: 5,
                        top: -2,
                        left: 8,
                        width: "100%",
                    }}
                >
                    <Image
                        src={`rarity/${getSupportCardRarity(support.rarity)}`}
                        alt={support.rarity.toString()}
                        style={{ width: "25%" }}
                    />
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        zIndex: 5,
                        top: -2,
                        right: 1,
                        display: "flex",
                        justifyContent: "right",
                        width: "100%",
                    }}
                >
                    <Image
                        src={`stat_icons/${support.specialty}`}
                        alt={support.specialty}
                        style={{
                            width: "25%",
                            borderRadius: "4px",
                        }}
                        tooltip={support.specialty}
                        tooltipArrow="bottom"
                    />
                </Box>
            </Card>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
                <SupportSplashText
                    support={support}
                    handleClose={handleClose}
                />
            </Dialog>
        </>
    );
}

export default SupportImage;
