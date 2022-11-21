export const formatCountVotes = (upVotes: number, downVotes: number) => {
    return upVotes - downVotes;
};

export const formatCountComments = (count: number) => {
    if (count === 0) {
        return null;
    } else {
        return `${count} `;
    }
};

export const getTimeSincePost = (createdAt: string) => {
    const [count, type] = convertToTimePast(createdAt as string);
    if (count > 1) {
        return `${count} ${type}s ago`;
    } else {
        return `${count} ${type} ago`;
    }
};

export const convertToTimePast = (dateStr: string): [number, string] => {
    const date = new Date(dateStr);
    const currentDate = new Date();
    const utcDate = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDay(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    );
    const utcCurrentDate = Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDay(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds(),
    );
    const diffTime = utcCurrentDate - utcDate;
    const diffYears = diffTime / 31556926000;
    const diffMonths = diffTime / 5259600000;
    const diffDays = diffTime / 86400000;
    const diffHours = diffTime / 3600000;
    const diffMinutes = diffTime / 60000;
    const diffSeconds = diffTime / 1000;

    if (diffYears > 1) {
        return [Math.floor(diffYears), "year"];
    } else if (diffMonths > 1) {
        return [Math.floor(diffMonths), "month"];
    } else if (diffDays > 1) {
        return [Math.floor(diffDays), "day"];
    } else if (diffHours > 1) {
        return [Math.floor(diffHours), "hour"];
    } else if (diffMinutes > 1) {
        return [Math.floor(diffMinutes), "minute"];
    } else {
        return [Math.floor(diffSeconds), "second"];
    }
};
