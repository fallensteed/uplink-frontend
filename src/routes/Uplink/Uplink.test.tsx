import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import Uplink from "./Uplink";
import { mockPost1Populated, mockPost2Populated } from "./mocks/post.mock";
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
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockPost1Populated, mockPost2Populated] }));
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
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockPost1Populated] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockPost1Populated, mockPost2Populated] }));
    const savedButton = await screen.findByText("Saved");
    user.click(savedButton);
    await waitFor(() => expect(screen.queryByText(mockPost2Populated.title)).not.toBeInTheDocument());
    const newestButton = await screen.findByText("Newest");
    user.click(newestButton);
    await screen.findByText(mockPost2Populated.title);
});

test("clicking saved gets saved posts but produces an error message on error", async () => {
    setup1();
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    const savedButton = await screen.findByText("Saved");
    user.click(savedButton);
    await screen.findByText("Error populating saved posts.");
});
