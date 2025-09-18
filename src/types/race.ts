export interface Race {
    id: string;
    raceID: number;
    name: string;
    nameJP: string;
    year: string;
    month: string;
    half: number;
    grade: string;
    distance: string;
    terrain: string;
    direction: string;
}

export interface Racetrack {
    id: number;
    name: string;
}

export interface RaceSeries {
    name: string;
    races: string[];
}
