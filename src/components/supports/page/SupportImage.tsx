// Component imports
import Image from "custom/Image";

// MUI imports
import { useTheme } from "@mui/material";

// Type imports
import { SupportProps } from "types/support";

function SupportImage({ support }: SupportProps) {
    const theme = useTheme();

    return (
        <Image
            src={`supports/card/${support.id}`}
            alt={support.name}
            style={{
                width: "100%",
                maxWidth: "350px",
                height: "auto",
                borderRadius: theme.mainContentBox.borderRadius,
            }}
        />
    );
}

export default SupportImage;
