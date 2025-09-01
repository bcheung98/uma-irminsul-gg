export interface NavItem {
    icon: string;
    text: string;
    link: string;
    tag?: string;
}

export const navItems: NavItem[] = [
    {
        icon: "icons/Home",
        text: "Home",
        link: "/",
    },
    {
        icon: "icons/Horse",
        text: "Characters",
        link: "/characters/",
    },
    {
        icon: "icons/Card",
        text: "Support Cards",
        link: "/supports/",
    },
    {
        icon: "icons/Skill",
        text: "Skills",
        link: "/skills/",
    },
    {
        icon: "icons/Training",
        text: "Training Event Helper",
        link: "/training-event-helper/",
    },
    {
        icon: "icons/Ticket",
        text: "Banner Archive",
        link: "/banners/",
    },
];

export const otherItems: NavItem[] = [
    {
        text: "Calendar",
        link: "https://irminsul.gg/calendar",
        icon: "",
    },
    {
        text: "Blog",
        link: "https://irminsul.gg/blog",
        icon: "",
    },
];
