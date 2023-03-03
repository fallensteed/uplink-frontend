import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { socket } from "common/config/socket";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { mockCommunity1 } from "routes/Uplink/mocks/community.mock";
import { mockPost1Populated, mockPost1PopulatedUpdated, mockPost3Populated } from "routes/Uplink/mocks/post.mock";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplinkUser.mock";
import ViewUser from "routes/Uplink/pages/ViewUser/ViewUser";
import { TestWrapper } from "tests/Wrapper";
import { mockUser1 } from "../../../../common/api/user/user.mock";

let user: UserEvent;

beforeEach(() => fetchMock.resetMocks());

const memoryRoutes = [{ path: "/u/:uplinkUsername", element: <ViewUser /> }];
const memoryRouter = createMemoryRouter(memoryRoutes, {
    initialEntries: ["/", `/u/${mockUser1.uplinkUsername}`],
    initialIndex: 1,
});

const setup = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockCommunity1] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockCommunity1] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: { docs: [mockPost1Populated] } }));

    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <RouterProvider router={memoryRouter} />
        </TestWrapper>,
    );
};

const setup2 = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: { docs: [] } }));

    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <RouterProvider router={memoryRouter} />
        </TestWrapper>,
    );
};

const setup3 = () => {
    user = userEvent.setup();
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

const setup4 = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockCommunity1] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockCommunity1] }));
    fetchMock.mockResponseOnce(
        JSON.stringify({
            data: {
                docs: [
                    mockPost1Populated,
                    mockPost1Populated,
                    mockPost1Populated,
                    mockPost1Populated,
                    mockPost1Populated,
                    mockPost1Populated,
                    mockPost1Populated,
                    mockPost1Populated,
                    mockPost1Populated,
                    mockPost1Populated,
                ],
                totalDocs: 11,
                page: 1,
                totalPages: 2,
            },
        }),
    );

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
    const post = await screen.findByText(mockPost1Populated.title);
    expect(post).toBeInTheDocument();
});

test("if no posts are avaialble, it shows empty message", async () => {
    setup2();
    const emptyMessage = await screen.findByText("This user hasn't made any posts yet!");
    expect(emptyMessage).toBeInTheDocument();
});

test("if error data received from queries, error message is displayed", async () => {
    setup3();
    const errorMessage = await screen.findByText("Error populating posts.");
    expect(errorMessage).toBeInTheDocument();
});

test("if username of current user matches page then add post button is visible", async () => {
    setup();
    await screen.findByText("Add New Post");
});

test("if more than 10 posts are loaded, scrolling to the bottom will then load more posts", async () => {
    setup4();
    await screen.findAllByText(mockPost1Populated.title);
    fetchMock.mockResponseOnce(
        JSON.stringify({ data: { docs: [mockPost3Populated], totalDocs: 11, page: 2, totalPages: 2 } }),
    );
    fireEvent.scroll(window, { target: { scrollY: 2000 } });
    await screen.findByText(mockPost3Populated.title);
});

test("clicking top rated button sorts by top rated posts, clicking newest loads newest posts", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: { docs: [mockPost3Populated] } }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: { docs: [mockPost1Populated] } }));
    const topRatedButton = await screen.findByText("Top Rated");
    user.click(topRatedButton);
    await screen.findByText(mockPost3Populated.title);
    const newestButton = await screen.findByText("Newest");
    user.click(newestButton);
    await screen.findByText(mockPost1Populated.title);
});

test("changing a detail on a post causes an update to that one post", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: { modifiedCount: 1 } }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockPost1PopulatedUpdated }));
    const upVoteButton = await screen.findByTestId("up-vote-button");
    user.click(upVoteButton);
    await screen.findByText("1");
});
