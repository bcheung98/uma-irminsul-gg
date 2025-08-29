import { CharacterEventProps, TrainingEvent } from "types/event";

export const eventsCommon = ({
    props,
}: {
    props?: CharacterEventProps;
}): TrainingEvent[] => {
    return [
        {
            name: "Get Well Soon!",
            nameJP: "お大事に！",
            options: [
                [
                    [
                        {
                            tag: "Mood",
                            value: "-1",
                        },
                        {
                            tag: "Last trained stat",
                            value: "-5",
                        },
                        {
                            tag: "Get status",
                            prop: 6,
                            random: true,
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "Mood",
                            value: "-1",
                        },
                        {
                            tag: "Last trained stat",
                            value: "-10",
                        },
                        {
                            tag: "Get status",
                            prop: 6,
                            random: true,
                        },
                    ],
                    [
                        {
                            tag: "Get status",
                            prop: 10,
                        },
                    ],
                ],
            ],
        },
        {
            name: "Don't Overdo It!",
            nameJP: "無茶は厳禁！",
            options: [
                [
                    [
                        {
                            tag: "Energy",
                            value: "+10",
                        },
                        {
                            tag: "Mood",
                            value: "-2",
                        },
                        {
                            tag: "Last trained stat",
                            value: "-10",
                        },
                        {
                            tag: "Random stats",
                            value: "-10",
                            prop: 2,
                        },
                        {
                            tag: "Get status",
                            prop: 6,
                            random: true,
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "Mood",
                            value: "-3",
                        },
                        {
                            tag: "Last trained stat",
                            value: "-10",
                        },
                        {
                            tag: "Random stats",
                            value: "-10",
                            prop: 2,
                        },
                        {
                            tag: "Get status",
                            prop: 6,
                            random: true,
                        },
                    ],
                    [
                        {
                            tag: "Energy",
                            value: "+10",
                        },
                        {
                            tag: "Get status",
                            prop: 10,
                        },
                    ],
                ],
            ],
        },
        {
            name: "Extra Training",
            nameJP: "追加の自主トレ",
            options: [
                [
                    [
                        {
                            tag: "Energy",
                            value: "-5",
                        },
                        {
                            tag: "Last trained stat",
                            value: "+5",
                        },
                        {
                            tag: "Heal a negative status effect",
                            random: true,
                        },
                        {
                            tag: "Bond",
                            value: "+5",
                            prop: 9002,
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "Energy",
                            value: "+5",
                        },
                    ],
                ],
            ],
        },
        {
            name: "At Summer Camp (Year 2)",
            nameJP: "夏合宿（2年目）にて",
            options: [
                [
                    [
                        {
                            tag: "Power",
                            value: "+10",
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "Guts",
                            value: "+10",
                        },
                    ],
                ],
            ],
        },
        {
            name: "Fan Letter",
            nameJP: "ファンレター",
            options: [
                [
                    [
                        {
                            tag: "Mood",
                            value: "+1",
                        },
                        {
                            tag: "Skill points",
                            value: "+30",
                        },
                    ],
                ],
            ],
        },
        {
            name: "Dance Lesson",
            nameJP: "ダンスレッスン",
            options: [
                [
                    [
                        {
                            tag: props?.dance[0] || "",
                            value: "+10",
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: props?.dance[1] || "",
                            value: "+10",
                        },
                    ],
                ],
            ],
        },
        {
            name: "New Year's Resolutions",
            nameJP: "新年の抱負",
            options: [
                [
                    [
                        {
                            tag: props?.year || "",
                            value: "+10",
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "Energy",
                            value: "+20",
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "Skill points",
                            value: "+20",
                        },
                    ],
                ],
            ],
        },
        {
            name: "New Year's Shrine Visit",
            nameJP: "初詣",
            options: [
                [
                    [
                        {
                            tag: "Energy",
                            value: "+30",
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "All stats",
                            value: "+5",
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "Skill points",
                            value: "+35",
                        },
                    ],
                ],
            ],
        },
        {
            name: "Just an Acupuncturist, No Worries! ☆",
            nameJP: "あんし～ん笹針師、参☆上",
            props: [
                [30, 70],
                [45, 55],
                [70, 30],
                [85, 15],
            ],
            options: [
                [
                    [
                        {
                            tag: "All stats",
                            value: "+20",
                        },
                    ],
                    [
                        {
                            tag: "Mood",
                            value: "-2",
                        },
                        {
                            tag: "All stats",
                            value: "-15",
                        },
                        {
                            tag: "Get status",
                            prop: 1,
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "Get skill",
                            prop: 200352,
                        },
                        {
                            tag: "Get skill",
                            prop: 200382,
                        },
                    ],
                    [
                        {
                            tag: "Energy",
                            value: "-20",
                        },
                        {
                            tag: "Mood",
                            value: "-2",
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "Maximum Energy",
                            value: "+12",
                        },
                        {
                            tag: "Energy",
                            value: "+40",
                        },
                        {
                            tag: "Heal all negative status effects",
                        },
                    ],
                    [
                        {
                            tag: "Energy",
                            value: "-20",
                        },
                        {
                            tag: "Mood",
                            value: "-2",
                        },
                        {
                            tag: "Get status",
                            prop: 1,
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "Energy",
                            value: "+20",
                        },
                        {
                            tag: "Mood",
                            value: "+1",
                        },
                        {
                            tag: "Get status",
                            prop: 8,
                        },
                    ],
                    [
                        {
                            tag: "Energy",
                            value: "-10/-20",
                        },
                        {
                            tag: "Mood",
                            value: "-1",
                        },
                        {
                            tag: "Get status",
                            prop: 1,
                            random: true,
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "Energy",
                            value: "+10",
                        },
                    ],
                ],
            ],
        },
    ];
};

export const eventSlowMetabolism = ({
    props,
}: {
    props?: CharacterEventProps;
}): TrainingEvent => {
    return {
        name: props?.miscEventNames[0].en || "",
        nameJP: props?.miscEventNames[0].jp || "",
        props: [[], [90, 10]],
        options: [
            [
                [
                    {
                        tag: "Energy",
                        value: "+10",
                    },
                    {
                        tag: "Skill points",
                        value: "+5",
                    },
                ],
            ],
            [
                [
                    {
                        tag: "Energy",
                        value: "+30",
                    },
                    {
                        tag: "Skill points",
                        value: "+10",
                    },
                ],
                [
                    {
                        tag: "Energy",
                        value: "+30",
                    },
                    {
                        tag: "Skill points",
                        value: "+10",
                    },
                    {
                        tag: "Speed",
                        value: "-5",
                    },
                    {
                        tag: "Power",
                        value: "+5",
                    },
                    {
                        tag: "Get status",
                        prop: 4,
                    },
                ],
            ],
        ],
    };
};

export const eventMasterTrainer = ({
    props,
}: {
    props?: CharacterEventProps;
}): TrainingEvent => {
    return {
        name: "Master Trainer",
        nameJP: "名指導",
        options: [
            [
                [
                    {
                        tag: props?.master || "",
                        value: "+10",
                    },
                    {
                        tag: "Get status",
                        prop: 10,
                        random: true,
                    },
                ],
            ],
        ],
    };
};

export const eventMisc = ({
    props,
}: {
    props?: CharacterEventProps;
}): TrainingEvent[] => {
    return [
        {
            name: props?.miscEventNames[1].en || "",
            nameJP: props?.miscEventNames[1].jp || "",
            options: [
                [
                    [
                        {
                            tag: "All stats",
                            value: "+5",
                        },
                        {
                            tag: "Skill points",
                            value: "+5",
                        },
                    ],
                ],
            ],
        },
        {
            name: props?.miscEventNames[2].en || "",
            nameJP: props?.miscEventNames[2].jp || "",
            options: [
                [
                    [
                        {
                            tag: "Mood",
                            value: "-1",
                        },
                    ],
                ],
            ],
        },
        {
            name: props?.miscEventNames[3].en || "",
            nameJP: props?.miscEventNames[3].jp || "",
            options: [
                [
                    [
                        {
                            tag: "Energy",
                            value: "-10",
                        },
                        {
                            tag: "Mood",
                            value: "-1",
                        },
                    ],
                ],
            ],
        },
        {
            name: props?.miscEventNames[4].en || "",
            nameJP: props?.miscEventNames[4].jp || "",
            options: [
                [
                    [
                        {
                            tag: "All stats",
                            value: "+5",
                        },
                        {
                            tag: "Skill points",
                            value: "+30",
                        },
                        {
                            tag: "Mood",
                            value: "+2",
                        },
                        {
                            tag: "Get status",
                            prop: 7,
                            random: true,
                        },
                    ],
                ],
            ],
        },
        {
            name: props?.miscEventNames[5].en || "",
            nameJP: props?.miscEventNames[5].jp || "",
            options: [
                [
                    [
                        {
                            tag: "Energy",
                            value: "+15",
                        },
                        {
                            tag: "Guts",
                            value: "-5",
                        },
                        {
                            tag: "Mood",
                            value: "-1",
                        },
                    ],
                    [
                        {
                            tag: "Energy",
                            value: "+15",
                        },
                        {
                            tag: "Guts",
                            value: "-5",
                        },
                        {
                            tag: "Get status",
                            prop: 2,
                        },
                    ],
                ],
            ],
        },
    ];
};
