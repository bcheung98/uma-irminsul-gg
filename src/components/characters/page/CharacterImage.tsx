// Component imports
import Image from "custom/Image";

// MUI imports
import { useTheme } from "@mui/material";

// Type imports
import { CharacterProps } from "types/character";

function CharacterImage({ character }: CharacterProps) {
    const theme = useTheme();

    return (
        <>
            <Image
                src={`characters/avatars/${character.id}`}
                alt={character.name}
                style={{
                    borderRadius: "4px",
                    backgroundColor: theme.background(2),
                }}
            />
        </>
    );
}

export default CharacterImage;
