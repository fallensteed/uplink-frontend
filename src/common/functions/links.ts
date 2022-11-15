export const removeHttp = (url: string) => {
    return url.replace(/^https?:\/\//, "");
};
