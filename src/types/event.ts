export interface EventProps {
    event: TrainingEvent[];
}

export interface EventList {
    [key: string]: EventData[];
}

export interface EventData {
    id: number;
    events: TrainingEvent[];
}

export interface TrainingEvent {
    name: string;
    nameJP: string;
    options: EventOutcome[][][];
    optionsJP?: EventOutcome[][][];
}

export interface EventOutcome {
    tag: string;
    value?: string | number | null;
    prop?: number | EventOutcome[];
}
