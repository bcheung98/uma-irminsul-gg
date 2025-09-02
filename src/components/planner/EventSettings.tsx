import { useState } from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import { StyledTooltip } from "styled/StyledTooltip";
import { StyledSwitch } from "styled/StyledSwitch";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    SxProps,
    Box,
    IconButton,
    Stack,
    Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    selectSettings,
    setDisplay,
    setExpanded,
    setSettings,
} from "reducers/planner";

function EventSettings() {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const settings = useAppSelector(selectSettings);
    const { showAll, expanded } = settings;

    const [settingsOpen, setSettingsOpen] = useState(false);
    const handleSettingsOpen = () => {
        setSettingsOpen(true);
    };
    const handleSettingsClose = () => {
        dispatch(setSettings(settings));
        setSettingsOpen(false);
    };

    const settingsList = [
        {
            label: "Show all characters/supports at once",
            switch: (
                <StyledSwitch
                    checked={showAll}
                    onChange={() => {
                        dispatch(setDisplay(!showAll));
                    }}
                />
            ),
        },
        {
            label: "Expanded events",
            switch: (
                <StyledSwitch
                    checked={expanded}
                    onChange={() => {
                        dispatch(setExpanded(!expanded));
                    }}
                />
            ),
        },
    ];

    const settingsBoxStyle: SxProps = {
        display: {
            xs: "block",
            sm: "flex",
        },
        flexGrow: 1,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
    };

    const settingsTextStyle: SxProps = {
        display: {
            xs: "block",
            sm: "flex",
        },
        mb: { xs: "8px", sm: "0px" },
    };

    return (
        <>
            <StyledTooltip title="Settings" placement="bottom">
                <IconButton
                    disableRipple
                    disableTouchRipple
                    onClick={handleSettingsOpen}
                    sx={{
                        borderRadius: "8px",
                        px: "2px",
                        width: "36px",
                        height: "36px",
                        color: theme.appbar.color,
                        "&:hover": {
                            backgroundColor: theme.appbar.hover,
                        },
                    }}
                >
                    <SettingsIcon />
                </IconButton>
            </StyledTooltip>
            <Dialog
                open={settingsOpen}
                onClose={handleSettingsClose}
                maxWidth="sm"
                fullWidth
                disableScrollLock
            >
                <Box sx={{ overflowY: "auto" }}>
                    <MainContentBox
                        title="Settings"
                        actions={
                            <IconButton
                                disableRipple
                                onClick={handleSettingsClose}
                                sx={{ color: theme.appbar.color }}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                        contentProps={{ padding: "16px" }}
                    >
                        <Stack spacing={2}>
                            {settingsList.map((setting, index) => (
                                <Box key={index} sx={settingsBoxStyle}>
                                    <TextStyled sx={settingsTextStyle}>
                                        {setting.label}
                                    </TextStyled>
                                    {setting.switch}
                                </Box>
                            ))}
                        </Stack>
                    </MainContentBox>
                </Box>
            </Dialog>
        </>
    );
}

export default EventSettings;
