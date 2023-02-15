import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { mockPost1Populated, mockPost2Populated } from "routes/Uplink/mocks/post.mock";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplinkUser.mock";
import { TestWrapper } from "tests/Wrapper";
import PostContainer from "./PostContainer";

let user: UserEvent;

const mockFn = {
    mock() {
        return;
    },
};
const mockGetPost = async () => {
    mockFn.mock();
};

const setup1 = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <PostContainer post={mockPost1Populated} getPost={mockGetPost} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

const setup2 = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <PostContainer post={mockPost2Populated} getPost={mockGetPost} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("post can be voted on", async () => {
    setup1();
    fetchMock.mockResponseOnce(JSON.stringify({ data: "success" }));
    const mock = jest.spyOn(mockFn, "mock");
    const upVoteButton = await screen.findByTestId("up-vote-button");
    user.click(upVoteButton);
    await waitFor(() => expect(mock).toHaveBeenCalled());
});

test("if post has an image it is displayed", async () => {
    setup1();
    const image = await screen.findByTestId("post-image");
    expect(image).toHaveAttribute("alt", mockPost1Populated.imageSrc);
});

test("if post has no image, no image is block is found", async () => {
    setup2();
    const image = screen.queryByTestId("post-image");
    expect(image).not.toBeInTheDocument();
});

test("if post has a link, it is displayed", async () => {
    setup1();
    const link = screen.getByTestId("post-link");
    expect(link).toHaveAttribute("href", mockPost1Populated.link);
});

test("if post does not have a link, it is not displayed", async () => {
    setup2();
    const link = screen.queryByTestId("post-link");
    expect(link).not.toBeInTheDocument();
});

test("clicking saved button will unsave post with successful response and update user information", async () => {
    setup1();
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
    setup1();
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
