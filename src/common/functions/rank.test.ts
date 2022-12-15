import { convertGradeToRank, gradeToRankConversionTable } from "./rank";

describe("convertGradeToRank()", () => {
    test("converts rank to output", () => {
        const response = convertGradeToRank("US Space Force", "E-1", "full");
        expect(response).toBe(gradeToRankConversionTable["US Space Force"]["E-1"]["full"]);
    });
});
