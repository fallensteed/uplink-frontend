import { render, screen } from "@testing-library/react";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "../../../tests/Wrapper";
import { mockPost1Populated, mockPost2Populated } from "../mocks/post.mock";
import { mockUplinkUser1 } from "../mocks/uplink_user.mock";
import PostList from "./PostList";

const mockFn = jest.fn();

const setup1 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
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

beforeEach(() => fetchMock.resetMocks());

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
