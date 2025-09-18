import { races } from "data/races";

export function getRace(id: number | string) {
    if (id === "debut") {
        return races[0];
    } else if (id === "maiden") {
        return races[1];
    } else {
        return races.find((race) => race.raceID === id);
    }
}

export function getRaceName(id: string) {
    if (id === "debut") {
        return races[0].name;
    } else if (id === "maiden") {
        return races[1].name;
    } else {
        let res = "";
        const [raceID, year] = id.split("|");
        const race = races.find((race) => race.raceID === Number(raceID));
        if (race) {
            res = race.name;
            if (year) {
                res += ` (Year ${year})`;
            }
        }
        return res;
    }
}
