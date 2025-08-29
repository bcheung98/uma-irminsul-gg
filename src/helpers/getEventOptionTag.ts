export function getOptionTag(index: number, length: number) {
    if (length > 1 && length < 4) {
        let tag = "";
        switch (index) {
            case 1:
                tag = "Top ";
                break;
            case 2:
                tag = length == 2 ? " Bottom " : "Middle ";
                break;
            case 3:
                tag = "Bottom ";
                break;
            default:
                break;
        }
        return tag + "Option:";
    } else if (length > 3) {
        return `Option ${index}:`;
    } else {
        return "";
    }
}
