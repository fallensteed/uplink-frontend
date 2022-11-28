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