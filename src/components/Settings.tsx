import { BaseSyntheticEvent, useRef, useState } from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    SxProps,
    IconButton,
    Dialog,
    Stack,
    Box,
    Divider,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    selectSettings,
    setUnreleasedContent,
    setServer,
    setSettings,
    setTheme,
    setWidth,
    Width,
} from "reducers/settings";
import { themeList } from "themes/theme";
import { Region } from "helpers/dates";

// Type imports
import { ThemeNames } from "types/theme";
import { StyledTooltip } from "styled/StyledTooltip";

function Settings() {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const settings = useAppSelector(selectSettings);
    const themeName = settings.theme;
    const { width, server, unreleasedContent } = settings;
    const unreleasedContentOld = useRef(unreleasedContent);

    const [settingsOpen, setSettingsOpen] = useState(false);
    const handleSettingsOpen = () => {
        unreleasedContentOld.current = unreleasedContent;
        setSettingsOpen(true);
    };
    const handleSettingsClose = () => {
        dispatch(setSettings(settings));
        if (unreleasedContentOld.current !== unreleasedContent) {
            window.location.reload();
        }
        setSettingsOpen(false);
    };

    const toggleButtonsParams = {
        spacing: 0,
        padding: "4px 12px",
        highlightOnHover: false,
    };

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

    const settingsList = [
        {
            label: "Theme",
            options: (
                <ToggleButtons
                    buttons={themeButtons}
                    value={themeName}
                    exclusive
                    onChange={(_: BaseSyntheticEvent, newValue: ThemeNames) => {
                        if (newValue !== null) {
                            dispatch(setTheme(newValue));
                        }
                    }}
                    {...toggleButtonsParams}
                />
            ),
        },
        {
            label: "Width",
            options: (
                <ToggleButtons
                    buttons={widthButtons}
                    value={width}
                    exclusive
                    onChange={(_: BaseSyntheticEvent, newValue: Width) => {
                        if (newValue !== null) {
                            dispatch(setWidth(newValue));
                        }
                    }}
                    {...toggleButtonsParams}
                />
            ),
        },
        {
            label: "Server",
            options: (
                <ToggleButtons
                    buttons={regionButtons}
                    value={server}
                    exclusive
                    onChange={(_: BaseSyntheticEvent, newValue: Region) => {
                        if (newValue !== null) {
                            dispatch(setServer(newValue));
                            if (newValue === "NA") {
                                dispatch(setUnreleasedContent(false));
                            } else {
                                dispatch(setUnreleasedContent(true));
                            }
                        }
                    }}
                    {...toggleButtonsParams}
                />
            ),
        },
    ];

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
                <Box sx={{ overflowY: "auto", scrollbarWidth: "thin" }}>
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
                        <Stack spacing={2} divider={<Divider />}>
                            <Stack spacing={2}>
                                {settingsList.map((setting, index) => (
                                    <Box key={index} sx={settingsBoxStyle}>
                                        <TextStyled sx={settingsTextStyle}>
                                            {setting.label}
                                        </TextStyled>
                                        {setting.options}
                                    </Box>
                                ))}
                            </Stack>
                        </Stack>
                    </MainContentBox>
                </Box>
            </Dialog>
        </>
    );
}

export default Settings;

const themeButtons: CustomToggleButtonProps[] = themeList.map((theme) => ({
    value: theme.name,
    label: theme.label,
}));

const widthButtons: CustomToggleButtonProps[] = [
    { value: "standard", label: "Standard" },
    { value: "wide", label: "Wide" },
];

export const skillDisplayButtons: CustomToggleButtonProps[] = [
    { value: "slider", label: "Slider" },
    { value: "table", label: "Table" },
];

const regionButtons: CustomToggleButtonProps[] = [
    { value: "NA", label: "Global" },
    { value: "JP", label: "Japan" },
];
