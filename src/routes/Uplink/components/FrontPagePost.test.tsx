import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { removeHttp } from "common/functions/links";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import { mockPost1Populated, mockPost2Populated } from "../mocks/post.mock";
import { mockUplinkUser1 } from "../mocks/uplinkUser.mock";
import FrontPagePost from "./FrontPagePost";

let user: UserEvent;

const mockFn = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mock() {
        return;
    },
};

const mockGetPosts = async () => mockFn.mock();

const setup = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <FrontPagePost post={mockPost1Populated} getPosts={mockGetPosts} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

const setup2 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <FrontPagePost post={mockPost2Populated} getPosts={mockGetPosts} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("displays the number of comments", () => {
    setup();
    const commentButton = screen.getByTestId("comment-button");
    expect(commentButton.innerHTML).toContain(mockPost1Populated.commentCount.toString());
});

test("displays post link when present", () => {
    setup();
    const linkText = screen.getByText(removeHttp(mockPost1Populated.link as string));
    expect(linkText).toBeInTheDocument();
});

test("displays image when present", () => {
    setup();
    const image = screen.getByTestId("post-image");
    expect(image).toBeInTheDocument();
});

test("clicking saved button will unsave post with successful response and update user information", async () => {
    setup();
    const updatedUplinkUser = JSON.parse(JSON.stringify(mockUplinkUser1));
    const index = updatedUplinkUser.savedPosts?.indexOf(mockPost1Populated._id) || -1;
    updatedUplinkUser.savedPosts?.splice(index, 1);

    fetchMock.mockResponseOnce(JSON.stringify({ data: { modifiedCount: 1 } }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: updatedUplinkUser }));
    const unsaveButton = await screen.findByText("Saved");
    user.click(unsaveButton);
    await screen.findByText("Save");
    await screen.findByText("Removed saved post.");
});

test("find saved button", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    const unsaveButton = await screen.findByText("Saved");
    user.click(unsaveButton);
    await screen.findByText("Something went wrong.");
});

test("clicking save button will save post with successful response and update user information", async () => {
    setup2();
    const updatedUplinkUser = JSON.parse(JSON.stringify(mockUplinkUser1));
    updatedUplinkUser.savedPosts?.push(mockPost2Populated._id);

    fetchMock.mockResponseOnce(JSON.stringify({ data: { modifiedCount: 1 } }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: updatedUplinkUser }));
    const saveButton = await screen.findByText("Save");
    user.click(saveButton);
    await screen.findByText("Saved");
    await screen.findByText("Post saved.");
});

test("unsuccessful save post will report error message", async () => {
    setup2();
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    const saveButton = await screen.findByText("Save");
    user.click(saveButton);
    await screen.findByText("Something went wrong.");
});
