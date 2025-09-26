import { useMemo } from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import InfoCard from "custom/InfoCard";
import Countdown from "custom/Countdown";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { Box, Stack, LinearProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { selectSupports } from "reducers/support";
import { selectCharacterBanners, selectSupportBanners } from "reducers/banner";
import { selectServer } from "reducers/settings";
import { createDateObject, isCurrentBanner } from "helpers/dates";
import { createBannerData } from "helpers/createBannerData";
import { isTBA } from "helpers/utils";

// Type imports
import { Banner, BannerData, BannerType } from "types/banner";

function CurrentBanners() {
    const region = useAppSelector(selectServer);

    const characters = useAppSelector(selectCharacters);
    const supports = useAppSelector(selectSupports);
    const loading = [...characters, ...supports].length === 0;

    const characterBanners = useAppSelector(selectCharacterBanners);
    const supportBanners = useAppSelector(selectSupportBanners);

    const filterCurrentBanner = (banner: Banner) => {
        let start: string;
        let end: string;
        if (region === "NA") {
            start = banner.start;
            end = banner.end;
        } else {
            start = banner.startJP;
            end = banner.endJP;
        }
        return isCurrentBanner(
            createDateObject({ date: start, region: region }).obj,
            createDateObject({ date: end, region: region }).obj
        );
    };

    const currentCharacterBanners = useMemo(
        () => characterBanners.filter(filterCurrentBanner),
        [characterBanners, region]
    );
    const currentSupportBanners = useMemo(
        () => supportBanners.filter(filterCurrentBanner),
        [supportBanners, region]
    );

    const activeBanners =
        [...currentCharacterBanners, ...currentSupportBanners].length > 0;

    const characterBannerData: BannerData[] = [];
    currentCharacterBanners.forEach((banner) => {
        const rateUps = banner.rateUps.map((id) =>
            createBannerData(id, "character", characters, supports)
        );
        characterBannerData.push({ ...banner, rateUps: rateUps });
    });

    const supportBannerData: BannerData[] = [];
    currentSupportBanners.forEach((banner) => {
        const rateUps = banner.rateUps.map((id) =>
            createBannerData(id, "support", characters, supports)
        );
        supportBannerData.push({ ...banner, rateUps: rateUps });
    });

    const renderBanner = (banner: BannerData, type: BannerType) => {
        return (
            <>
                <Grid container spacing={1}>
                    {banner.rateUps.map((item, i) => (
                        <InfoCard
                            key={i}
                            id={item.id}
                            cardID={`${item.id}-${i}`}
                            variant="icon"
                            type={type}
                            name={item.name}
                            title={item.title}
                            outfit={item.outfit}
                            infoSecondary={{
                                specialty: item.specialty,
                            }}
                            disableLink={isTBA(item.name)}
                            disableZoomOnHover={isTBA(item.name)}
                            loading={loading}
                        />
                    ))}
                </Grid>
                <Countdown
                    date={createDateObject({
                        date: region === "NA" ? banner.end : banner.endJP,
                        region: region,
                    })}
                />
            </>
        );
    };

    const bannerImage = (id: number) => (
        <Image
            src={`banners/${region === "NA" ? "global" : "jp"}/${id}`}
            alt={`${id}`}
            style={{ width: "100%", height: "auto", maxWidth: "480px" }}
        />
    );

    return (
        <MainContentBox
            title="Current Banners"
            contentProps={{ padding: "16px" }}
        >
            {activeBanners ? (
                <FlexBox
                    sx={{
                        flexWrap: "wrap",
                        gap: "5%",
                        alignItems: "flex-start",
                    }}
                >
                    {characterBannerData.length > 0 && (
                        <Stack
                            spacing={1}
                            sx={{ width: { xs: "100%", sm: "40%" } }}
                        >
                            <TextStyled variant="h6-styled">
                                Character Banner
                            </TextStyled>
                            <Stack spacing={1}>
                                {characterBannerData.map((banner, index) => (
                                    <Box key={index}>
                                        {bannerImage(banner.id)}
                                        {renderBanner(banner, "character")}
                                    </Box>
                                ))}
                            </Stack>
                        </Stack>
                    )}
                    {supportBannerData.length > 0 && (
                        <Stack
                            spacing={1}
                            sx={{ width: { xs: "100%", sm: "40%" } }}
                        >
                            <TextStyled variant="h6-styled">
                                Support Card Banner
                            </TextStyled>
                            <Stack spacing={1}>
                                {supportBannerData.map((banner, index) => (
                                    <Box key={index}>
                                        {bannerImage(banner.id)}
                                        {renderBanner(banner, "support")}
                                    </Box>
                                ))}
                            </Stack>
                        </Stack>
                    )}
                </FlexBox>
            ) : (
                <>
                    {loading ? (
                        <LinearProgress color="info" />
                    ) : (
                        <>
                            <TextStyled>
                                There are no active banners.
                            </TextStyled>
                            <Image
                                src="emotes/error5"
                                alt="No banners"
                                style={{
                                    height: "128px",
                                    marginTop: "24px",
                                }}
                            />
                        </>
                    )}
                </>
            )}
        </MainContentBox>
    );
}

export default CurrentBanners;
