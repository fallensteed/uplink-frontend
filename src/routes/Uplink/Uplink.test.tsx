import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import Uplink from "./Uplink";
import {
    mockPost1Populated,
    mockPost2Populated,
    mockPost2PopulatedUpdated,
    mockPost3Populated,
} from "./mocks/post.mock";
import { mockUplinkUser1 } from "./mocks/uplinkUser.mock";

let user: UserEvent;

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

const setup1 = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({}));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <Uplink />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};
const setup2 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: { docs: [mockPost1Populated, mockPost2Populated] } }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <Uplink />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};
const setup3 = () => {
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
    render(
        <TestWrapper>
            <Uplink />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("page load loading... without posts", async () => {
    setup1();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("page displays an error message if 'data: ' isn't sent", async () => {
    setup1();
    const errorMsg = await screen.findByText("Error populating posts.");
    expect(errorMsg).toBeInTheDocument();
});

test("page loads posts when retrieved", async () => {
    setup2();
    const postTitle = await screen.findByText(mockPost1Populated.title);
    expect(postTitle).toBeInTheDocument();
});

test("page navigates to /submit when 'Add New Post' is clicked", async () => {
    setup2();
    const newButton = await screen.findByText("Add New Post");
    fireEvent.click(newButton);
    expect(mockUseNavigate).toHaveBeenCalled();
});

test("clicking 'saved' gets all saved posts, clicking newest gets all posts by new", async () => {
    setup1();
    fetchMock.mockResponseOnce(JSON.stringify({ data: { docs: [mockPost1Populated] } }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: { docs: [mockPost1Populated, mockPost2Populated] } }));
    const savedButton = await screen.findByText("Saved");
    user.click(savedButton);
    await waitFor(() => expect(screen.queryByText(mockPost2Populated.title)).not.toBeInTheDocument());
    const newestButton = await screen.findByText("Newest");
    user.click(newestButton);
    await screen.findByText(mockPost2Populated.title);
});

test("if more than 10 posts are loaded, scrolling to the bottom will then load more posts", async () => {
    setup3();
    await screen.findAllByText(mockPost1Populated.title);
    fetchMock.mockResponseOnce(
        JSON.stringify({ data: { docs: [mockPost3Populated], totalDocs: 11, page: 2, totalPages: 2 } }),
    );
    fireEvent.scroll(window, { target: { scrollY: 2000 } });
    await screen.findByText(mockPost3Populated.title);
});

test("clicking top rated button sorts by top rated posts", async () => {
    setup2();
    fetchMock.mockResponseOnce(
        JSON.stringify({ data: { docs: [mockPost3Populated, mockPost2Populated, mockPost1Populated] } }),
    );
    const button = await screen.findByText("Top Rated");
    user.click(button);
    await screen.findByText(mockPost3Populated.title);
});

test("changing a detail on a post causes an update to that one post", async () => {
    setup2();
    fetchMock.mockResponseOnce(JSON.stringify({ data: { modifiedCount: 1 } }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockPost2PopulatedUpdated }));
    const upVoteButtons = await screen.findAllByTestId("up-vote-button");
    user.click(upVoteButtons[1]);
    await screen.findByText("2");
});
