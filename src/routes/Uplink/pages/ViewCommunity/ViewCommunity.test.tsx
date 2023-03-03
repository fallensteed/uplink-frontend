import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { mockCommunity1, mockCommunity1Populated } from "routes/Uplink/mocks/community.mock";
import {
    mockPost1Populated,
    mockPost2Populated,
    mockPost2PopulatedUpdated,
    mockPost3Populated,
} from "routes/Uplink/mocks/post.mock";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplinkUser.mock";
import { TestWrapper } from "tests/Wrapper";
import { mockCommunity1PopulatedNonMember } from "./../../mocks/community.mock";
import ViewCommunity from "./ViewCommunity";

let user: UserEvent;

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

const memoryRoutes = [{ path: "/c/:communityLink", element: <ViewCommunity /> }];
const memoryRouter = createMemoryRouter(memoryRoutes, {
    initialEntries: ["/", `/c/${mockCommunity1.link}`],
    initialIndex: 1,
});

const setup1 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockCommunity1Populated }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: { docs: [mockPost1Populated, mockPost2Populated] } }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    user = userEvent.setup();
    render(
        <TestWrapper>
            <RouterProvider router={memoryRouter} />
        </TestWrapper>,
    );
};

const setup2 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockCommunity1PopulatedNonMember }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: { docs: [mockPost1Populated, mockPost2Populated] } }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    user = userEvent.setup();
    render(
        <TestWrapper>
            <RouterProvider router={memoryRouter} />
        </TestWrapper>,
    );
};

const setup3 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    user = userEvent.setup();
    render(
        <TestWrapper>
            <RouterProvider router={memoryRouter} />
        </TestWrapper>,
    );
};

const setup4 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockCommunity1PopulatedNonMember }));
    fetchMock.mockResponseOnce(
        JSON.stringify({
            data: {
                docs: [
                    mockPost1Populated,
                    mockPost2Populated,
                    mockPost1Populated,
                    mockPost2Populated,
                    mockPost1Populated,
                    mockPost2Populated,
                    mockPost1Populated,
                    mockPost2Populated,
                    mockPost1Populated,
                    mockPost2Populated,
                ],
                totalDocs: 11,
                page: 1,
                totalPages: 2,
            },
        }),
    );
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    user = userEvent.setup();
    render(
        <TestWrapper>
            <RouterProvider router={memoryRouter} />
        </TestWrapper>,
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("when loading, loading screen is displayed", () => {
    setup1();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("if a user belongs to the community, the join buttons shows 'joined', mousing over shows text 'leave', and clicking it will leave the community", async () => {
    setup1();
    fetchMock.mockResponseOnce(JSON.stringify({ data: "success" }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockCommunity1PopulatedNonMember }));
    const joinButton = await screen.findByText(/joined/i);
    expect(joinButton).toBeInTheDocument();
    fireEvent.mouseEnter(joinButton);
    expect(joinButton).toHaveTextContent(/leave/i);
    user.click(joinButton);
    await waitFor(() => expect(joinButton).toHaveTextContent(/join/i));
});

test("mousing over joined button shows leave, leaving shows joined", async () => {
    setup1();
    const joinButton = await screen.findByText(/joined/i);
    expect(joinButton).toBeInTheDocument();
    fireEvent.mouseEnter(joinButton);
    expect(joinButton).toHaveTextContent(/leave/i);
    fireEvent.mouseLeave(joinButton);
    expect(joinButton).toHaveTextContent(/joined/i);
});

test("if user belongs to community and leave button errors, a message is shown", async () => {
    setup1();
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    const joinButton = await screen.findByText(/joined/i);
    user.click(joinButton);
    await screen.findByText("Something went wrong.");
});

test("if a user does not belongs to the community, the join buttons shows 'join' and clicking it will join the community", async () => {
    setup2();
    fetchMock.mockResponseOnce(JSON.stringify({ data: "success" }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockCommunity1Populated }));
    const joinButton = await screen.findByText(/join/i);
    expect(joinButton).toBeInTheDocument();
    user.click(joinButton);
    await waitFor(() => expect(joinButton).toHaveTextContent(/joined/i));
});

test("if user does not belongs to community and join button errors, a message is shown", async () => {
    setup2();
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    const joinButton = await screen.findByText(/join/i);
    user.click(joinButton);
    await screen.findByText("Something went wrong.");
});

test("if error loading community posts or community data occur, error message is shown", async () => {
    setup3();
    await screen.findByText("Something went wrong loading community data.");
    await screen.findByText("Error populating posts.");
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
    setup1();
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
    setup1();
    fetchMock.mockResponseOnce(JSON.stringify({ data: { modifiedCount: 1 } }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockPost2PopulatedUpdated }));
    const upVoteButton = await screen.findAllByTestId("up-vote-button");
    user.click(upVoteButton[1]);
    await screen.findByText("2");
});
