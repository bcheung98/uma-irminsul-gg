// Component imports
import EventSupport from "components/events/EventSupport";
import MainContentBox from "custom/MainContentBox";

// Type imports
import { SupportProps } from "types/support";

function SupportEvents({ support }: SupportProps) {
    return (
        <MainContentBox
            title="Training Events"
            contentProps={{ padding: "16px" }}
        >
            <EventSupport support={support} expand={false} />
        </MainContentBox>
    );
}

export default SupportEvents;
