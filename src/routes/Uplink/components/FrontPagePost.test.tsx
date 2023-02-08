import { render, screen } from "@testing-library/react";
import { removeHttp } from "common/functions/links";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import { mockPost1Populated } from "../mocks/post.mock";
import FrontPagePost from "./FrontPagePost";
import { socket } from "common/config/socket";

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
    render(
        <TestWrapper>
            <FrontPagePost post={mockPost1Populated} getPosts={mockGetPosts} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

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
