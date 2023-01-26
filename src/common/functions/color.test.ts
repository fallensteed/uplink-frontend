import { stringToColor } from "./color";

test("seed will print out color hash", () => {
    const result = stringToColor("tester");
    expect(result).toBe("#bf74b7");
});
