import { render, screen } from "@testing-library/react";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { removeHttp } from "common/functions/links";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import { mockPost1Populated } from "../mocks/post.mock";
import { mockUplinkUser1 } from "../mocks/uplink_user.mock";
import FrontPagePost from "./FrontPagePost";

const mockFn = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mock() {
        return;
    },
};

const mockGetPosts = async () => {
    mockFn.mock();
};

const setup = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <FrontPagePost post={mockPost1Populated} getPosts={mockGetPosts} />
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
