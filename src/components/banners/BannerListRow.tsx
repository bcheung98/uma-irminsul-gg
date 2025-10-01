// Component imports
import InfoCard from "custom/InfoCard";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, getContrastRatio, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectServer } from "reducers/settings";
import { createDateObject, DateObject, isCurrentBanner } from "helpers/dates";
import { isTBA } from "helpers/utils";

// Type imports
import { BannerData, BannerType } from "types/banner";

function BannerListRow({
    loading,
    type,
    row,
}: {
    loading: boolean;
    type: BannerType;
    row: BannerData;
}) {
    const theme = useTheme();

    const region = useAppSelector(selectServer);

    let start: DateObject;
    let end: DateObject;

    if (region === "NA") {
        start = createDateObject({ date: row.start, region: region });
        end = createDateObject({ date: row.end, region: region });
    } else {
        start = createDateObject({ date: row.startJP, region: region });
        end = createDateObject({ date: row.endJP, region: region });
    }

    const backgroundColor = isCurrentBanner(start.obj, end.obj)
        ? theme.palette.info.dark
        : theme.palette.background.paper;

    return (
        <Box sx={{ backgroundColor: backgroundColor, p: "8px 16px" }}>
            <TextStyled
                sx={{
                    mb: "8px",
                    color:
                        getContrastRatio(backgroundColor, theme.text.primary) >
                        4.5
                            ? theme.text.primary
                            : theme.text.contrast,
                }}
            >
                {`${start.date} — ${end.date}`}
            </TextStyled>
            <Grid container spacing={1}>
                {row.rateUps.map((item, index) => (
                    <InfoCard
                        key={index}
                        id={item.id}
                        cardID={`${item.id}-${row.id}-${index}`}
                        variant="icon"
                        type={type}
                        name={item.name}
                        title={item.title}
                        outfit={item.outfit}
                        rarity={item.rarity}
                        infoSecondary={{ specialty: item.specialty }}
                        disableLink={isTBA(item.name)}
                        disableZoomOnHover={isTBA(item.name)}
                        loading={loading}
                    />
                ))}
            </Grid>
        </Box>
    );
}

export default BannerListRow;
