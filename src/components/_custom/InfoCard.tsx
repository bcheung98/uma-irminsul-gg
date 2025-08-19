import { CSSProperties } from "react";

// Component imports
import Image from "./Image";
import RouterLink from "components/nav/RouterLink";
import { StyledTooltip } from "styled/StyledTooltip";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, SxProps, Box, Card, Stack, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { getRarityColor } from "helpers/rarityColors";
import { zoomImageOnHover } from "helpers/utils";
import {
    getSupportCardRarity,
    getSupportCardRarityColor,
} from "helpers/supportCardRarity";

// Type imports
import { Rarity, Specialty } from "types/_common";

interface InfoCardProps {
    id: number;
    name: string;
    title: string;
    cardID?: string;
    type: "character" | "support";
    rarity?: Rarity;
    variant?: "icon" | "avatar" | "material-card";
    size?: string;
    showName?: boolean;
    info?: {
        rank?: Rarity;
    };
    infoSecondary?: {
        specialty?: Specialty;
    };
    materials?: string[];
    backgroundColor?: string;
    disableTooltip?: boolean;
    disableLink?: boolean;
    disableZoomOnHover?: boolean;
    loading?: boolean;
    imgLoad?: "lazy" | "eager";
}

function InfoCard({
    id,
    name,
    title,
    cardID = title,
    type,
    rarity = 3,
    variant = "avatar",
    size = "128px",
    showName = variant !== "icon",
    info,
    infoSecondary,
    materials,
    backgroundColor,
    disableTooltip = showName,
    disableLink = false,
    disableZoomOnHover = variant === "material-card",
    loading = false,
    imgLoad = "eager",
}: InfoCardProps) {
    const theme = useTheme();

    cardID = `${cardID.split(" ").join("")}-${variant}-infoCard`;

    if (type === "character" && rarity <= 3) {
        rarity += 2;
    }

    let rank = "R";
    if (info?.rank) {
        rank = getSupportCardRarity(info.rank);
    }

    const borderWidth = variant !== "icon" ? theme.displayCard.borderWidth : 0;
    const borderRadius = variant === "icon" ? "4px" : "16px";
    const borderColor =
        variant === "icon" ? "transparent" : theme.border.color.primary;

    size = variant === "icon" ? "64px" : variant === "avatar" ? size : "96px";
    const imgSize =
        variant === "icon" ? `calc(${size} - ${borderWidth * 2}px)` : size;

    let scale = 1;
    let imgSrc = "",
        route;
    switch (type) {
        case "character":
            imgSrc = `characters/avatars/${id}`;
            route = `characters`;
            break;
        case "support":
            imgSrc = `supports/${variant === "icon" ? "icons" : "card"}/${id}`;
            route = `supports`;
            break;
    }
    const href = !disableLink
        ? `/${route}/${name.split(" ").join("-").toLowerCase()}-${id}`
        : "";

    const handleHover = (direction: "enter" | "leave") => {
        !disableZoomOnHover &&
            zoomImageOnHover({
                direction,
                id: `${id}-img`,
                baseScale: scale,
                zoom: scale + 0.05,
            });
    };

    const rootStyle: SxProps = {
        position: "relative",
        overflow: "visible",
        width: variant !== "material-card" ? size : "auto",
        height: variant !== "icon" ? "auto" : size,
        borderRadius: borderRadius,
        background: `linear-gradient(to bottom, transparent, ${theme.appbar.backgroundColor})`,
    };

    const cardStyle: SxProps = {
        borderStyle: "solid",
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: borderRadius,
        backgroundColor: "transparent",
    };

    const imageContainerStyle: SxProps = {
        display: "flex",
        overflow: "clip",
        width:
            variant === "material-card" ? `calc(${imgSize} * 8 / 3)` : "auto",
        backgroundColor:
            variant === "avatar" && type === "character"
                ? backgroundColor
                : "transparent",
        border:
            variant === "avatar" && type === "support"
                ? "4px solid transparent"
                : "none",
        backgroundImage:
            variant === "avatar" && type === "support"
                ? `linear-gradient(${theme.appbar.backgroundColor}, ${
                      theme.appbar.backgroundColor
                  }), ${getSupportCardRarityColor(rarity)}`
                : "none",
        backgroundOrigin:
            variant === "avatar" && type === "support"
                ? "border-box"
                : "padding-box",
        backgroundClip: "padding-box, border-box",
    };

    const imageStyle: CSSProperties = {
        width: imgSize,
        height: "100%",
        transform: `scale(${scale})`,
    };

    const infoIconStyle: CSSProperties = {
        width: `calc(${imgSize} / 8 + 12px)`,
        height: `calc(${imgSize} / 8 + 12px)`,
        minWidth: "16px",
        minHeight: "16px",
    };

    return (
        <Card sx={rootStyle} elevation={2}>
            {!loading ? (
                <>
                    <Card elevation={0} sx={cardStyle}>
                        <StyledTooltip
                            title={!disableTooltip ? `${name} [${title}]` : ""}
                            arrow
                            placement="top"
                        >
                            <Box
                                onMouseEnter={() => handleHover("enter")}
                                onMouseLeave={() => handleHover("leave")}
                                sx={imageContainerStyle}
                            >
                                <RouterLink to={href}>
                                    <Image
                                        src={imgSrc}
                                        alt={name}
                                        id={`${id}-img`}
                                        style={imageStyle}
                                        loading={imgLoad}
                                    />
                                </RouterLink>
                                {variant === "material-card" && materials && (
                                    <MaterialGrid
                                        materials={materials}
                                        size={imgSize}
                                    />
                                )}
                            </Box>
                        </StyledTooltip>
                        {showName && (
                            <Box
                                sx={{
                                    p: "8px",
                                    borderTop:
                                        type === "support" || variant === "icon"
                                            ? "none"
                                            : `calc(${imgSize} / 20) solid ${getRarityColor(
                                                  rarity
                                              )}`,
                                }}
                            >
                                <RouterLink
                                    to={href}
                                    sx={{ display: "flex", mx: "auto" }}
                                >
                                    <TextStyled
                                        onMouseEnter={() =>
                                            handleHover("enter")
                                        }
                                        onMouseLeave={() =>
                                            handleHover("leave")
                                        }
                                        sx={{
                                            color: theme.appbar.color,
                                            textAlign: "center",
                                        }}
                                        variant={"subtitle2-styled"}
                                    >
                                        {showName && `[${title}]`}
                                    </TextStyled>
                                </RouterLink>
                                <RouterLink
                                    to={href}
                                    sx={{ display: "flex", mx: "auto" }}
                                >
                                    <TextStyled
                                        onMouseEnter={() =>
                                            handleHover("enter")
                                        }
                                        onMouseLeave={() =>
                                            handleHover("leave")
                                        }
                                        sx={{
                                            color: theme.appbar.color,
                                            textAlign: "center",
                                        }}
                                        variant={
                                            variant === "material-card"
                                                ? "body1-styled"
                                                : "body2-styled"
                                        }
                                    >
                                        {showName && name}
                                    </TextStyled>
                                </RouterLink>
                            </Box>
                        )}
                    </Card>
                    {info && (
                        <Stack
                            spacing={0.5}
                            sx={{
                                position: "absolute",
                                zIndex: 5,
                                top: 0,
                                left: -4,
                                borderRadius: "8px",
                            }}
                        >
                            {info.rank !== undefined && type === "support" && (
                                <Image
                                    src={`ranks/${rank}`}
                                    alt={rank}
                                    style={{
                                        height: `calc(${imgSize} / 8 + 8px)`,
                                    }}
                                />
                            )}
                        </Stack>
                    )}
                    {infoSecondary && (
                        <Stack
                            spacing={0.5}
                            sx={{
                                position: "absolute",
                                zIndex: 5,
                                top: -2,
                                right: -2,
                                borderRadius: "8px",
                            }}
                        >
                            {infoSecondary.specialty !== undefined && (
                                <Image
                                    src={`stat_icons/${infoSecondary.specialty}`}
                                    alt={infoSecondary.specialty}
                                    style={infoIconStyle}
                                    tooltip={infoSecondary.specialty}
                                />
                            )}
                        </Stack>
                    )}
                </>
            ) : (
                <Skeleton
                    variant="rounded"
                    width={size}
                    height={size}
                    sx={{ borderRadius: borderRadius }}
                />
            )}
        </Card>
    );
}

export default InfoCard;

function MaterialGrid({
    materials,
    size,
}: {
    materials: string[];
    size: string;
}) {
    const theme = useTheme();

    const images = [{ src: "", tag: "" }];

    return (
        <Box sx={{ px: "8px", py: "4px", height: size }}>
            <Grid container spacing={0.75}>
                {images.map((img) => (
                    <Image
                        key={img.tag}
                        src={img.src}
                        alt={img.tag}
                        style={{
                            width: `calc(${size} / (8 / 3.5))`,
                            border: `1px solid ${theme.border.color.primary}`,
                            borderRadius: "4px",
                            backgroundColor: theme.icon.backgroundColor,
                        }}
                        tooltip={img.tag}
                    />
                ))}
            </Grid>
        </Box>
    );
}
