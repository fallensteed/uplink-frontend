import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplinkUser.mock";
import { TestWrapper } from "../../../../tests/Wrapper";
import { mockComment1Populated, mockComment2Populated } from "../../api/comment/comment.mock";
import CommentSection from "./CommentSection";

let user: UserEvent;

const mockFn = {
    mock() {
        return;
    },
};
const mockGetComments = async () => {
    mockFn.mock();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockGetSubComments = (commentId: string) => {
    return undefined;
};

const setup = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <CommentSection
                comment={mockComment1Populated}
                getSubComments={mockGetSubComments}
                getComments={mockGetComments}
            />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("setup test", async () => {
    setup();
    expect(screen.getByText(mockComment1Populated.text)).toBeInTheDocument();
});

test("add a reply", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockComment2Populated }));
    const mock = jest.spyOn(mockFn, "mock");
    const replyButton = screen.getByText("Reply");
    user.click(replyButton);
    const textField = await screen.findByRole("textbox");
    user.type(textField, "test text content");
    await waitFor(() => expect(textField).toHaveValue("test text content"));
    const submitReplyButton = screen.getByTestId("comment-submit-reply");
    user.click(submitReplyButton);
    await waitFor(() => expect(mock).toHaveBeenCalled());
});

test("error adding reply", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    const replyButton = screen.getByText("Reply");
    user.click(replyButton);
    const textField = await screen.findByRole("textbox");
    user.type(textField, "test text content");
    await waitFor(() => expect(textField).toHaveValue("test text content"));
    const submitReplyButton = screen.getByTestId("comment-submit-reply");
    user.click(submitReplyButton);
    await screen.findByText("Error adding comment.");
});

test("vote on comment", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: "success" }));
    const mock = jest.spyOn(mockFn, "mock");
    const upVoteButton = screen.getByTestId("comment-upvote");
    user.click(upVoteButton);
    await waitFor(() => expect(mock).toHaveBeenCalled());
});

test("vote on comment error", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    const upVoteButton = screen.getByTestId("comment-upvote");
    user.click(upVoteButton);
    await screen.findByText("Error changing vote.");
});
