export interface EventProps {
    event: TrainingEvent[];
}

export interface EventList {
    [key: string]: EventData[];
}

export interface EventData {
    id: number;
    events: TrainingEvent[];
    props?: CharacterEventProps;
    palProps?: PalEventProps;
}

export interface PalEventProps {
    recEvents: TrainingEvent[];
}

export interface CharacterEventProps extends PalEventProps {
    dance: [string, string];
    year: string;
    master: string;
    miscEventNames: { en: string; jp: string }[];
    secretEvents: TrainingEvent[];
}

export interface TrainingEvent {
    name: string;
    nameJP: string;
    options: EventOutcome[][][];
    optionsJP?: EventOutcome[][][];
    chances?: number[][];
    conditions?: EventOutcome[];
    props?: TrainingEventExtraProps;
}

export interface TrainingEventExtraProps {
    has_meaningless_choices?: boolean;
    can_occur_repeatedly?: boolean;
    repeatable_changes_values?: boolean;
    scenario_link?: boolean;
    alt_outcome?: boolean;
}

export interface EventOutcome {
    tag: string;
    value?: string | number | (string | number)[] | null;
    count?: number | number[];
    data?: number | string;
    props?: EventExtraProps;
    random?: boolean;
}

export interface EventExtraProps {
    year?: number;
    month?: number;
    half?: number;
    grade?: number;
    gradeList?: number[];
    distance?: number;
    distanceList?: number[];
    strategy?: number;
    strategyList?: number[];
    terrain?: number;
    length?: number;
    raceName?: number | string;
    raceList?: (number | string)[];
    trackName?: number | string;
    trackList?: (number | string)[];
    trackCond?: number;
    trackConds?: number[];
    position?: number;
    pop?: number;
    stat?: number;
    mood?: number;
    statusEffect?: number;
    eventName?: string;
    eventNumber?: number;
    eventOption?: number;
    eventOptions?: number[];
    eventOutcome?: number;
    charName?: number | string;
    charList?: number[];
    eventHints?: EventSubHint;
    conditions?: EventOutcome[];
}
export type EventSubOutcome = Pick<EventOutcome, "value" | "data">;
export type EventSubHint = Required<EventSubOutcome>[];

export interface StatusEffect {
    id: number;
    name: string;
    description: string;
    nameJP: string;
    descriptionJP: string;
}
