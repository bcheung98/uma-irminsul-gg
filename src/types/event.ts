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
    props?: number[][];
    conditions?: EventOutcome[];
}

export interface EventOutcome {
    tag: string;
    value?: string | number | (string | number)[] | null;
    prop?: number | EventOutcome[];
    random?: boolean;
}

export interface StatusEffect {
    id: number;
    name: string;
    description: string;
    nameJP: string;
    descriptionJP: string;
}
