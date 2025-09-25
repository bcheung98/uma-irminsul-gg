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
                            tag: "mood",
                            value: "-1",
                        },
                        {
                            tag: "last_trained_stat",
                            value: "-5",
                        },
                        {
                            tag: "obtain_status",
                            data: 6,
                            random: true,
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "mood",
                            value: "-1",
                        },
                        {
                            tag: "last_trained_stat",
                            value: "-10",
                        },
                        {
                            tag: "obtain_status",
                            data: 6,
                            random: true,
                        },
                    ],
                    [
                        {
                            tag: "obtain_status",
                            data: 10,
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
                            tag: "energy",
                            value: "+10",
                        },
                        {
                            tag: "mood",
                            value: "-2",
                        },
                        {
                            tag: "last_trained_stat",
                            value: "-10",
                        },
                        {
                            tag: "random_stats",
                            value: "-10",
                            count: 2,
                        },
                        {
                            tag: "obtain_status",
                            data: 6,
                            random: true,
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "mood",
                            value: "-3",
                        },
                        {
                            tag: "last_trained_stat",
                            value: "-10",
                        },
                        {
                            tag: "random_stats",
                            value: "-10",
                            count: 2,
                        },
                        {
                            tag: "obtain_status",
                            data: 6,
                            random: true,
                        },
                    ],
                    [
                        {
                            tag: "energy",
                            value: "+10",
                        },
                        {
                            tag: "obtain_status",
                            data: 10,
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
                            tag: "energy",
                            value: "+20",
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "skill_points",
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
                            tag: "energy",
                            value: "+30",
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "all_stats",
                            value: "+5",
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "skill_points",
                            value: "+35",
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
                            tag: "energy",
                            value: "-5",
                        },
                        {
                            tag: "last_trained_stat",
                            value: "+5",
                        },
                        {
                            tag: "heal_status_one",
                            random: true,
                        },
                        {
                            tag: "bond",
                            value: "+5",
                            data: 9002,
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "energy",
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
                            tag: "power",
                            value: "+10",
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "guts",
                            value: "+10",
                        },
                    ],
                ],
            ],
        },
        {
            name: "Just an Acupuncturist, No Worries! ☆",
            nameJP: "あんし～ん笹針師、参☆上",
            chances: [
                [30, 70],
                [45, 55],
                [70, 30],
                [85, 15],
            ],
            options: [
                [
                    [
                        {
                            tag: "all_stats",
                            value: "+20",
                        },
                    ],
                    [
                        {
                            tag: "mood",
                            value: "-2",
                        },
                        {
                            tag: "all_stats",
                            value: "-15",
                        },
                        {
                            tag: "obtain_status",
                            data: 1,
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "obtain_skill",
                            data: 200352,
                        },
                        {
                            tag: "obtain_skill",
                            data: 200382,
                        },
                    ],
                    [
                        {
                            tag: "energy",
                            value: "-20",
                        },
                        {
                            tag: "mood",
                            value: "-2",
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "max_energy",
                            value: "+12",
                        },
                        {
                            tag: "energy",
                            value: "+40",
                        },
                        {
                            tag: "heal_status_all",
                        },
                    ],
                    [
                        {
                            tag: "energy",
                            value: "-20",
                        },
                        {
                            tag: "mood",
                            value: "-2",
                        },
                        {
                            tag: "obtain_status",
                            data: 1,
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "energy",
                            value: "+20",
                        },
                        {
                            tag: "mood",
                            value: "+1",
                        },
                        {
                            tag: "obtain_status",
                            data: 8,
                        },
                    ],
                    [
                        {
                            tag: "energy",
                            value: "-10/-20",
                        },
                        {
                            tag: "mood",
                            value: "-1",
                        },
                        {
                            tag: "obtain_status",
                            data: 1,
                            random: true,
                        },
                    ],
                ],
                [
                    [
                        {
                            tag: "energy",
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
        chances: [[], [90, 10]],
        options: [
            [
                [
                    {
                        tag: "energy",
                        value: "+10",
                    },
                    {
                        tag: "skill_points",
                        value: "+5",
                    },
                ],
            ],
            [
                [
                    {
                        tag: "energy",
                        value: "+30",
                    },
                    {
                        tag: "skill_points",
                        value: "+10",
                    },
                ],
                [
                    {
                        tag: "energy",
                        value: "+30",
                    },
                    {
                        tag: "skill_points",
                        value: "+10",
                    },
                    {
                        tag: "speed",
                        value: "-5",
                    },
                    {
                        tag: "power",
                        value: "+5",
                    },
                    {
                        tag: "obtain_status",
                        data: 4,
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
            name: "Master Trainer",
            nameJP: "名指導",
            options: [
                [
                    [
                        {
                            tag: props?.master || "random_stats",
                            value: "+10",
                        },
                        {
                            tag: "obtain_status",
                            data: 10,
                            random: true,
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
                            tag: "mood",
                            value: "+1",
                        },
                        {
                            tag: "skill_points",
                            value: "+30",
                        },
                    ],
                ],
            ],
        },
        {
            name: props?.miscEventNames[1].en || "",
            nameJP: props?.miscEventNames[1].jp || "",
            options: [
                [
                    [
                        {
                            tag: "all_stats",
                            value: "+5",
                        },
                        {
                            tag: "skill_points",
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
                            tag: "mood",
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
                            tag: "energy",
                            value: "-10",
                        },
                        {
                            tag: "mood",
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
                            tag: "all_stats",
                            value: "+5",
                        },
                        {
                            tag: "skill_points",
                            value: "+30",
                        },
                        {
                            tag: "mood",
                            value: "+2",
                        },
                        {
                            tag: "obtain_status",
                            data: 7,
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
                            tag: "energy",
                            value: "+15",
                        },
                        {
                            tag: "guts",
                            value: "-5",
                        },
                        {
                            tag: "mood",
                            value: "-1",
                        },
                    ],
                    [
                        {
                            tag: "energy",
                            value: "+15",
                        },
                        {
                            tag: "guts",
                            value: "-5",
                        },
                        {
                            tag: "obtain_status",
                            data: 2,
                        },
                    ],
                ],
            ],
        },
    ];
};
