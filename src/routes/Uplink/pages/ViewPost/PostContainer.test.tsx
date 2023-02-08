import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { MemoryRouter } from "react-router-dom";
import { mockPost1Populated, mockPost2Populated } from "routes/Uplink/mocks/post.mock";
import { TestWrapper } from "tests/Wrapper";
import PostContainer from "./PostContainer";
import { socket } from "common/config/socket";

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
    render(
        <TestWrapper>
            <PostContainer post={mockPost1Populated} getPost={mockGetPost} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

const setup2 = () => {
    user = userEvent.setup();
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
