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

export interface CharacterEventProps {
    dance: [string, string];
    year: string;
    master: string;
    miscEventNames: { en: string; jp: string }[];
    recEvents: TrainingEvent[];
}

export interface PalEventProps {
    recEvents: TrainingEvent[];
}

export interface TrainingEvent {
    name: string;
    nameJP: string;
    options: EventOutcome[][][];
    optionsJP?: EventOutcome[][][];
    props?: number[][];
}

export interface EventOutcome {
    tag: string;
    value?: string | number | null;
    prop?: number | EventOutcome[];
    random?: boolean;
}
