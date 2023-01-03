import { Affiliation, Grade } from "common/types/user.types";

export const gradeToRankConversionTable = {
    "US Air Force": {
        "E-1": {
            full: "Airman Basic",
            short: "AB",
        },
        "E-2": {
            full: "Airman",
            short: "Amn",
        },
        "E-3": {
            full: "Airman First Class",
            short: "A1C",
        },
        "E-4": {
            full: "Senior Airman",
            short: "SrA",
        },
        "E-5": {
            full: "Staff Sergeant",
            short: "SSgt",
        },
        "E-6": {
            full: "Technical Sergeant",
            short: "TSgt",
        },
        "E-7": {
            full: "Master Sergeant",
            short: "MSgt",
        },
        "E-8": {
            full: "Senior Master Sergeant",
            short: "SMSgt",
        },
        "E-9": {
            full: "Chief Master Sergeant",
            short: "CMSgt",
        },
        "O-1": {
            full: "Second Lieutenant",
            short: "2d Lt",
        },
        "O-2": {
            full: "First Lieutenant",
            short: "1st Lt",
        },
        "O-3": {
            full: "Captain",
            short: "Capt",
        },
        "O-4": {
            full: "Major",
            short: "Maj",
        },
        "O-5": {
            full: "Lieutenant Colonel",
            short: "Lt Col",
        },
        "O-6": {
            full: "Colonel",
            short: "Col",
        },
        "O-7": {
            full: "Brigadier General",
            short: "Brig Gen",
        },
        "O-8": {
            full: "Major General",
            short: "Maj Gen",
        },
        "O-9": {
            full: "Lieutenant General",
            short: "Lt Gen",
        },
        "O-10": {
            full: "General",
            short: "Gen",
        },
    },
    "US Space Force": {
        "E-1": {
            full: "Specialist 1",
            short: "Spc1",
        },
        "E-2": {
            full: "Specialist 2",
            short: "Spc2",
        },
        "E-3": {
            full: "Specialist 3",
            short: "Spc3",
        },
        "E-4": {
            full: "Specialist 4",
            short: "Spc4",
        },
        "E-5": {
            full: "Sergeant",
            short: "Sgt",
        },
        "E-6": {
            full: "Technical Sergeant",
            short: "TSgt",
        },
        "E-7": {
            full: "Master Sergeant",
            short: "MSgt",
        },
        "E-8": {
            full: "Senior Master Sergeant",
            short: "SMSgt",
        },
        "E-9": {
            full: "Chief Master Sergeant",
            short: "CMSgt",
        },
        "O-1": {
            full: "Second Lieutenant",
            short: "2d Lt",
        },
        "O-2": {
            full: "First Lieutenant",
            short: "1st Lt",
        },
        "O-3": {
            full: "Captain",
            short: "Capt",
        },
        "O-4": {
            full: "Major",
            short: "Maj",
        },
        "O-5": {
            full: "Lieutenant Colonel",
            short: "Lt Col",
        },
        "O-6": {
            full: "Colonel",
            short: "Col",
        },
        "O-7": {
            full: "Brigadier General",
            short: "Brig Gen",
        },
        "O-8": {
            full: "Major General",
            short: "Maj Gen",
        },
        "O-9": {
            full: "Lieutenant General",
            short: "Lt Gen",
        },
        "O-10": {
            full: "General",
            short: "Gen",
        },
    },
};

export const convertGradeToRank = (affiliation: Affiliation, grade: Grade, outputType: "full" | "short") => {
    console.log("affiliation", affiliation);
    console.log("grade", grade);
    console.log("outputType", outputType);
    console.log("affiliation list", gradeToRankConversionTable[affiliation]);
    const convertedRank = gradeToRankConversionTable[affiliation][grade];
    return convertedRank[outputType];
};
