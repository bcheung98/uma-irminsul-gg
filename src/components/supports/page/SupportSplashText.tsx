import parse from "html-react-parser";

// Component imports
import Image from "custom/Image";
import MainContentBox from "custom/MainContentBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";

// Type imports
import { Support } from "types/support";

function SupportSplashText({
    support,
    handleClose,
}: {
    support: Support;
    handleClose: () => void;
}) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const { id, name, title, splash } = support;

    const cardImage = (
        <Image
            src={`supports/card/${id}`}
            alt={id.toString()}
            style={{ width: "100%", height: "auto" }}
        />
    );

    return (
        <MainContentBox
            title={matches_sm_up ? `[${title}] ${name}` : ""}
            actions={
                <IconButton
                    disableRipple
                    onClick={handleClose}
                    sx={{ color: theme.appbar.color }}
                >
                    <CloseIcon />
                </IconButton>
            }
            contentProps={{ padding: 0 }}
        >
            <Grid container spacing={0} sx={{ maxHeight: { md: "600px" } }}>
                {matches_sm_up && (
                    <Grid size={{ xs: 5, md: "auto" }}>{cardImage}</Grid>
                )}
                <Grid size="grow">
                    <Box
                        sx={{
                            px: { xs: 2, md: 4 },
                            py: 2,
                            pb: 4,
                            overflowY: "auto",
                            maxHeight: "600px",
                        }}
                    >
                        <TextStyled component="span" variant="body2-styled">
                            {parse(splash.en || splash.jp)}
                        </TextStyled>
                    </Box>
                </Grid>
            </Grid>
        </MainContentBox>
    );
}

export default SupportSplashText;
