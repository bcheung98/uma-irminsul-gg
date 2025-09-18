export function parseEventTag(tag: string) {
    switch (tag) {
        case "Do not race":
            return "Do not race in";
        case "Other":
            return "※ In other cases";
        case "Mood good":
            return "※ Mood is Good or better";
        case "Mood bad":
            return "※ Mood is Normal or worse";
        case "Gain fans":
            return "Fans";
        case "Stat not disabled":
            return "Stat that didn't have its training disabled";
        case "Highest training level":
            return "The outcome depends on which training facility has the highest level (ties decided at random)";
        case "Most trained":
            return "Most trained stat";
        case "Full energy recovery":
            return "Fully recover energy";
        default:
            return tag;
    }
}
