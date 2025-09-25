import parse from "html-react-parser";

// Component imports
import { Text } from "styled/StyledTypography";

// MUI imports
import { useTheme } from "@mui/material";

// Helper imports
import { formatAptitude } from "helpers/formatConditions";

function SkillDescription({
    description,
    color,
}: {
    description: string;
    color?: string;
}) {
    const theme = useTheme();

    function convert(desc: string) {
        return desc
            .replace("Opening Leg", "early-race")
            .replace("Middle Leg", "mid-race")
            .replace("Final Leg", "late-race")
            .replace("Last Spurt", "last spurt")
            .replace("Final Corner", "final corner")
            .replace("Final Straight", "final straight")
            .replace("Straight", "straight")
            .replace("Speed", "velocity")
            .replace("speed", "velocity")
            .replace("Stamina", "endurance")
            .replace("stamina", "endurance");
    }

    function parseSkillDescription(desc: string) {
        const str = desc.split("・");
        const tags = str
            .splice(0, str.length - 1)
            .map((s) =>
                s
                    .split("/")
                    .map((i) => formatAptitude(i))
                    .join(", ")
            )
            .join(", ");
        const text = str.splice(-1)[0];
        return parse(`${convert(text)} ${tags.length > 0 ? `(${tags})` : ""}`);
    }

    return (
        <Text
            component="span"
            variant="body2-styled"
            sx={{ color: color || theme.text.description }}
        >
            {parseSkillDescription(description)}
        </Text>
    );
}

export default SkillDescription;
