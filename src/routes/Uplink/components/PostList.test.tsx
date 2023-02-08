import { render, screen } from "@testing-library/react";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "../../../tests/Wrapper";
import { mockPost1Populated, mockPost2Populated } from "../mocks/post.mock";
import PostList from "./PostList";

const mockFn = jest.fn();

const setup1 = () => {
    render(
        <TestWrapper>
            <PostList posts={[mockPost1Populated, mockPost2Populated]} getPosts={mockFn} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

const setup2 = () => {
    render(<PostList getPosts={mockFn} />, { wrapper: MemoryRouter });
};

afterAll(() => {
    socket.disconnect();
});

test("Page renders posts", () => {
    setup1();
    expect(screen.getByText(mockPost1Populated.title)).toBeInTheDocument();
});

test("Page Renders empty message with no posts", () => {
    setup2();
    expect(screen.getByText("Nothing to see here... Want to add a")).toBeInTheDocument();
});
