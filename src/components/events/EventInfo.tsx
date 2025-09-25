import { useState } from "react";

// Component imports
import EventPopup from "components/events/EventPopup";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card, Popover } from "@mui/material";

// Helper imports
import { range } from "helpers/utils";
import { useAppSelector } from "helpers/hooks";
import { selectSettings } from "reducers/planner";
import { selectUnreleasedContent } from "reducers/settings";

// Type imports
import { TrainingEvent } from "types/event";

function EventInfo({
    event,
    isChain = false,
    index = 1,
    expand = false,
}: {
    event: TrainingEvent;
    isChain?: boolean;
    index?: number;
    expand?: boolean;
}) {
    const theme = useTheme();

    const showUnreleased = useAppSelector(selectUnreleasedContent);

    const settings = useAppSelector(selectSettings);
    const expanded = settings.expanded && expand;

    let name: string;
    if (showUnreleased) {
        if (event.name === event.nameJP) {
            name = event.name;
        } else {
            name = event.name
                ? `${event.name} (${event.nameJP})`
                : event.nameJP;
        }
    } else {
        name = event.name || event.nameJP;
    }
    if (isChain) {
        name = `(${range(index + 1)
            .map((_) => "❯")
            .join("")}) ${name}`;
    }

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClickOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const renderEventPopup = <EventPopup name={name} event={event} />;

    return expanded ? (
        <Card>{renderEventPopup}</Card>
    ) : (
        <>
            <Card
                sx={{
                    p: "8px 16px",
                    backgroundColor: theme.background(2),
                    cursor: "pointer",
                    "&:hover": {
                        outline: `2px solid ${theme.border.color.primary}`,
                    },
                }}
                onClick={handleClickOpen}
            >
                <TextStyled variant="body2-styled">{name}</TextStyled>
            </Card>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                disableScrollLock
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                {renderEventPopup}
            </Popover>
        </>
    );
}

export default EventInfo;
