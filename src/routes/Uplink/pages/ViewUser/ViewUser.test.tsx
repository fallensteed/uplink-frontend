import { render, screen } from "@testing-library/react";
import { socket } from "common/config/socket";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { mockCommunity1 } from "routes/Uplink/mocks/community.mock";
import { mockPost1 } from "routes/Uplink/mocks/post.mock";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplinkUser.mock";
import ViewUser from "routes/Uplink/pages/ViewUser/ViewUser";
import { TestWrapper } from "tests/Wrapper";
import { mockUser1 } from "../../../../common/api/user/user.mock";

beforeEach(() => fetchMock.resetMocks());

const memoryRoutes = [{ path: "/u/:uplinkUsername", element: <ViewUser /> }];
const memoryRouter = createMemoryRouter(memoryRoutes, {
    initialEntries: ["/", `/u/${mockUser1.uplinkUsername}`],
    initialIndex: 1,
});

const setup = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockPost1] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockCommunity1] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockCommunity1] }));

    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <RouterProvider router={memoryRouter} />
        </TestWrapper>,
    );
};

const setup2 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));

    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <RouterProvider router={memoryRouter} />
        </TestWrapper>,
    );
};

const setup3 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: "Error" }));
    fetchMock.mockResponseOnce(JSON.stringify({ message: "Error" }));
    fetchMock.mockResponseOnce(JSON.stringify({ message: "Error" }));
    fetchMock.mockResponseOnce(JSON.stringify({ message: "Error" }));

    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <RouterProvider router={memoryRouter} />
        </TestWrapper>,
    );
};

afterAll(() => {
    socket.disconnect();
});

test("when page initially loads, it shows loading screen", async () => {
    setup();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("if posts are avaialable, it shows the posts", async () => {
    setup();
    const post = await screen.findByText(mockPost1.title);
    expect(post).toBeInTheDocument();
});

test("if no posts are avaialble, it shows empty message", async () => {
    setup2();
    const emptyMessage = await screen.findByText("There are no posts by this user.");
    expect(emptyMessage).toBeInTheDocument();
});

test("if error data received from queries, error message is displayed", async () => {
    setup3();
    const errorMessage = await screen.findByText("Something went wrong loading post data.");
    expect(errorMessage).toBeInTheDocument();
});
