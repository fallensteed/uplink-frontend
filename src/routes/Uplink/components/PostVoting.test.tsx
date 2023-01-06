import { fireEvent, render, screen } from "@testing-library/react";
import PostVoting from "./PostVoting";

const mockFn = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mock(value: string) {
        return;
    },
};

const mockHandleChangeVote = async (change: "upVote" | "downVote" | "noVote") => {
    mockFn.mock(change);
};

const setup1 = () => {
    render(
        <PostVoting handleChangeVote={mockHandleChangeVote} voteCount={1} userUpVoted={false} userDownVoted={false} />,
    );
};
const setup2 = () => {
    render(
        <PostVoting handleChangeVote={mockHandleChangeVote} voteCount={1} userUpVoted={true} userDownVoted={false} />,
    );
};
const setup3 = () => {
    render(
        <PostVoting handleChangeVote={mockHandleChangeVote} voteCount={1} userUpVoted={false} userDownVoted={true} />,
    );
};

test("up vote button calls function with upVote when no userUpVoted", async () => {
    setup1();
    const mock = jest.spyOn(mockFn, "mock");
    const upVoteButton = screen.getByTestId("up-vote-button");
    fireEvent.click(upVoteButton);
    expect(mock).toHaveBeenCalledWith("upVote");
});

test("down vote button calls function with downVote when no userDownVoted", async () => {
    setup1();
    const mock = jest.spyOn(mockFn, "mock");
    const upVoteButton = screen.getByTestId("down-vote-button");
    fireEvent.click(upVoteButton);
    expect(mock).toHaveBeenCalledWith("downVote");
});

test("up vote button calls function with noVote when userUpVoted", async () => {
    setup2();
    const mock = jest.spyOn(mockFn, "mock");
    const upVoteButton = screen.getByTestId("up-vote-button");
    fireEvent.click(upVoteButton);
    expect(mock).toHaveBeenCalledWith("noVote");
});

test("down vote button calls function with noVote when userDownVoted", async () => {
    setup3();
    const mock = jest.spyOn(mockFn, "mock");
    const upVoteButton = screen.getByTestId("down-vote-button");
    fireEvent.click(upVoteButton);
    expect(mock).toHaveBeenCalledWith("noVote");
});
