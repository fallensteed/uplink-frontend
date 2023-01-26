import { removeHttp } from "common/functions/links";

test("removes https:// from link", () => {
    const result = removeHttp("https://google.com");
    expect(result).toBe("google.com");
});
