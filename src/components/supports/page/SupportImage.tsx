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
import { getSupportCardRarity } from "helpers/supportCardRarity";

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
    };

    const imageContainerStyle: SxProps = {
        display: "flex",
        overflow: "clip",
        width: "auto",
        backgroundColor: "transparent",
    };

    return (
        <>
            <Card sx={rootStyle} elevation={2}>
                <Card
                    elevation={0}
                    sx={{
                        backgroundColor: theme.background(2),
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
                                    color: theme.text.primary,
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
                                sx={{ fontStyle: "italic" }}
                            >
                                Flavor Text
                            </TextStyled>
                        </Stack>
                    </ButtonBase>
                </Card>
                {!matches_sm_up && (
                    <>
                        <Box
                            sx={{
                                position: "absolute",
                                zIndex: 5,
                                top: 0,
                                left: "-4px",
                            }}
                        >
                            <Image
                                src={`ranks/${getSupportCardRarity(
                                    support.rarity
                                )}`}
                                alt={support.rarity.toString()}
                                style={{ width: "50%" }}
                            />
                        </Box>
                        <Box
                            sx={{
                                position: "absolute",
                                zIndex: 5,
                                top: 0,
                                right: 0,
                                borderRadius: "4px",
                            }}
                        >
                            <Image
                                src={`stat_icons/${support.specialty}`}
                                alt={support.specialty}
                                style={{
                                    height: "24px",
                                    padding: "1px",
                                    borderRadius: "4px",
                                    backgroundColor:
                                        theme.appbar.backgroundColor,
                                }}
                            />
                        </Box>
                    </>
                )}
            </Card>
            <Dialog open={open} onClose={handleClose} maxWidth="xl">
                <SupportSplashText
                    support={support}
                    handleClose={handleClose}
                />
            </Dialog>
        </>
    );
}

export default SupportImage;
