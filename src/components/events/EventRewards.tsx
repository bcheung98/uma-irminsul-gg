// Component imports
import EventText from "./EventText";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Stack } from "@mui/material";

// Type imports
import type { EventRewards } from "types/event";

interface EventRewardsProps {
    charID: number | string;
    chances?: number[];
    rewards: EventRewards[];
}

function EventRewards(props: EventRewardsProps) {
    const theme = useTheme();

    const rewards = getRewards(props.rewards);

    return (
        <>
            {rewards.map((outcome, index) => (
                <Stack key={index}>
                    {rewards.length > 1 && (
                        <TextStyled
                            variant="body2-styled"
                            sx={{
                                mb: "8px",
                                color: theme.text.highlight,
                            }}
                        >
                            {getRandomText(index, props.chances)}
                        </TextStyled>
                    )}
                    {outcome.map((reward, index) => (
                        <EventText key={index} outcome={reward} />
                    ))}
                </Stack>
            ))}
        </>
    );
}

export default EventRewards;

function getRewards(rewards: EventRewards[]) {
    const res: EventRewards[][] = [];
    const tags = rewards.map((reward) => reward.tag);
    const indexes: number[] = [];
    tags.forEach((tag, index) => tag === "di" && indexes.push(index));
    indexes.push(rewards.length);
    let start = 0;
    indexes.forEach((index) => {
        res.push(rewards.slice(start, index));
        start = index + 1;
    });
    return res;
}

function getRandomText(index: number, chances?: number[]) {
    if (chances) {
        return index === 0
            ? `Randomly either (~${chances[index]}%)`
            : `or (~${chances[index]}%)`;
    } else {
        return index === 0 ? "Randomly either" : "or";
    }
}
