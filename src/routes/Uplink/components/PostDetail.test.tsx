import { render, screen } from "@testing-library/react";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import { mockUplinkUser1 } from "../mocks/uplink_user.mock";
import PostDetail from "./PostDetail";

const setup1 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <PostDetail createdAt={new Date().toString()} communityLink={"c/mock"} username={"u/mock"} edited={false} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("displays vertical without edited", () => {
    setup1();
    expect(screen.queryByText("Edited")).not.toBeInTheDocument();
});
