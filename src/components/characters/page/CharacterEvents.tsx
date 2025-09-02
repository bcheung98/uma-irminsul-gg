// Component imports
import EventCharacter from "components/events/EventCharacter";
import MainContentBox from "custom/MainContentBox";

// Type imports
import { CharacterProps } from "types/character";

function CharacterEvents({ character }: CharacterProps) {
    return (
        <MainContentBox
            title="Training Events"
            contentProps={{ padding: "16px" }}
        >
            <EventCharacter character={character} />
        </MainContentBox>
    );
}

export default CharacterEvents;
