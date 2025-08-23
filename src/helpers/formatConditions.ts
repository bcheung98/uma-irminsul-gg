import { Aptitude, RaceStage } from "types/_common";

export function formatAptitude(aptitude: Aptitude) {
    switch (aptitude) {
        case "Front":
            return "Front-Runner";
        case "Pace":
            return "Pace Chaser";
        case "Late":
            return "Late Surger";
        case "End":
            return "End Closer";
        case "Turf":
        case "Dirt":
        case "Sprint":
        case "Mile":
        case "Medium":
        case "Long":
            return aptitude;
    }
}

export function formatRaceStage(stage: RaceStage) {
    switch (stage) {
        case "Early-Race":
        case "Mid-Race":
        case "Late-Race":
        case "Last-Spurt":
        case "Corner":
        case "Straight":
        case "Final Corner":
        case "Final Straight":
        case "Slope":
            return stage;
    }
}
