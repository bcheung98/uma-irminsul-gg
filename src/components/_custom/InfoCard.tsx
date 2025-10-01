import { CSSProperties } from "react";

// Component imports
import Image from "./Image";
import RouterLink from "components/nav/RouterLink";
import { StyledTooltip } from "styled/StyledTooltip";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, SxProps, Box, Card, Stack, Skeleton } from "@mui/material";

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
    outfit?: string;
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
    backgroundColor?: string;
    disableTooltip?: boolean;
    disableInfoTooltip?: boolean;
    disableLink?: boolean;
    disableZoomOnHover?: boolean;
    loading?: boolean;
    imgLoad?: "lazy" | "eager";
}

function InfoCard({
    id,
    name,
    title,
    outfit = "Original",
    cardID = title,
    type,
    rarity = 3,
    variant = "avatar",
    size,
    showName = variant !== "icon",
    info,
    infoSecondary,
    backgroundColor,
    disableTooltip = showName,
    disableInfoTooltip = false,
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

    const borderWidth = variant === "icon" && type === "character" ? 2 : 0;
    const borderRadius = variant === "icon" ? "4px" : "16px";
    const borderColor =
        variant === "icon" && type === "character"
            ? getRarityColor(rarity)
            : "transparent";

    if (!size) {
        if (variant === "icon") {
            size = "64px";
        } else if (variant === "avatar") {
            size = "96px";
        } else {
            size = "128px";
        }
    }
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
                id: `${cardID}-img`,
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
        borderRadius:
            variant === "avatar" && type === "character"
                ? `${borderRadius} ${borderRadius} 0px 0px`
                : borderRadius,
        // outline:
        //     variant === "avatar" && type === "character"
        //         ? `4px solid ${getRarityColor(rarity)}`
        //         : "none",
        // outlineOffset: -16,
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
                ? `linear-gradient(transparent, transparent), ${getSupportCardRarityColor(
                      rarity
                  )}`
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
        width: `calc(${imgSize} / 6 + 12px)`,
        height: `calc(${imgSize} / 6 + 12px)`,
        minWidth: "16px",
        minHeight: "16px",
    };

    const ranks = ["R", "SR", "SSR"];

    const tooltip =
        type === "character"
            ? `${name} (${outfit})`
            : `${name} (${ranks[rarity - 3]} ${infoSecondary?.specialty})`;

    const cardImage = (
        <Image
            src={imgSrc}
            alt={name}
            id={`${cardID}-img`}
            style={imageStyle}
            loading={imgLoad}
        />
    );

    function CardText({
        subtitle = false,
        children,
    }: {
        subtitle?: boolean;
        children: React.ReactNode;
    }) {
        return (
            <RouterLink to={href} sx={{ display: "flex" }}>
                <TextStyled
                    onMouseEnter={() => handleHover("enter")}
                    onMouseLeave={() => handleHover("leave")}
                    sx={{
                        color: theme.appbar.color,
                        textAlign: "center",
                        fontSize: subtitle ? "12px !important" : "inherit",
                    }}
                    variant="body2-styled"
                >
                    {children}
                </TextStyled>
            </RouterLink>
        );
    }

    return (
        <Card sx={rootStyle} elevation={2}>
            {!loading ? (
                <>
                    <Card elevation={0} sx={cardStyle}>
                        <StyledTooltip
                            title={!disableTooltip ? tooltip : ""}
                            arrow
                            placement="top"
                        >
                            <Box
                                onMouseEnter={() => handleHover("enter")}
                                onMouseLeave={() => handleHover("leave")}
                                sx={imageContainerStyle}
                            >
                                {!disableLink ? (
                                    <RouterLink to={href}>
                                        {cardImage}
                                    </RouterLink>
                                ) : (
                                    cardImage
                                )}
                            </Box>
                        </StyledTooltip>
                        {showName && (
                            <Box
                                sx={{
                                    p: "8px 4px",
                                    borderTop:
                                        type === "support" || variant === "icon"
                                            ? "none"
                                            : `calc(${imgSize} / 20) solid ${getRarityColor(
                                                  rarity
                                              )}`,
                                }}
                            >
                                <CardText subtitle>
                                    {showName && type === "character"
                                        ? `(${outfit})`
                                        : `[${title}]`}
                                </CardText>
                                <CardText>{showName && name}</CardText>
                            </Box>
                        )}
                    </Card>
                    {info && (
                        <Stack
                            spacing={0.5}
                            sx={{
                                position: "absolute",
                                zIndex: 5,
                                top: -2,
                                left: 8,
                                borderRadius: "8px",
                            }}
                        >
                            {info.rank !== undefined && type === "support" && (
                                <Image
                                    src={`rarity/${rank}`}
                                    alt={rank}
                                    style={{
                                        height: `calc(${imgSize} / 4 + 8px)`,
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
                                right: 2,
                                borderRadius: "8px",
                            }}
                        >
                            {infoSecondary.specialty !== undefined && (
                                <Image
                                    src={`stat_icons/${infoSecondary.specialty}`}
                                    alt={infoSecondary.specialty}
                                    style={infoIconStyle}
                                    tooltip={
                                        !disableInfoTooltip &&
                                        infoSecondary.specialty
                                    }
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
