// Component imports
import Image from "custom/Image";

// MUI imports
import { useTheme } from "@mui/material";

// Type imports
import { CharacterProps } from "types/character";

function CharacterImage({ character }: CharacterProps) {
    const theme = useTheme();

    return (
        <Image
            src={`characters/avatars/${character.id}`}
            alt={character.name}
            style={{
                width: "100%",
                height: "100%",
                maxWidth: "512px",
                borderRadius: "4px",
                backgroundColor: theme.appbar.backgroundColor,
            }}
        />
    );
}

export default CharacterImage;
