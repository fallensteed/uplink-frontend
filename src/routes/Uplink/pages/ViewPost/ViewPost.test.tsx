import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplinkUser.mock";
import { TestWrapper } from "tests/Wrapper";
import { mockComment1, mockComment2 } from "../../api/comment/comment.mock";
import { mockCommunity1 } from "../../mocks/community.mock";
import { mockPost1, mockPost1Populated, mockPost2, mockPost2Populated } from "../../mocks/post.mock";
import ViewPost from "./ViewPost";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

const memoryRoute = [{ path: "/c/:community/p/:miniLink", element: <ViewPost /> }];
const memoryRouter = createMemoryRouter(memoryRoute, {
    initialEntries: ["/", `/c/${mockCommunity1.link}/p/${mockPost1.miniLink}`],
    initialIndex: 1,
});

const memoryRouter2 = createMemoryRouter(memoryRoute, {
    initialEntries: ["/", `/c/${mockCommunity1.link}/p/${mockPost2.miniLink}`],
    initialIndex: 1,
});

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

const setup = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockPost1Populated }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockComment1] }));
    render(
        <TestWrapper>
            <RouterProvider router={memoryRouter} />
        </TestWrapper>,
    );
};
const setupPostError = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: "Error" }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <RouterProvider router={memoryRouter} />
        </TestWrapper>,
    );
};
const setupCommentError = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockPost1Populated }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ message: "Error" }));
    render(
        <TestWrapper>
            <RouterProvider router={memoryRouter} />
        </TestWrapper>,
    );
};
const setup2 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockPost2Populated }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockComment1] }));
    render(
        <TestWrapper>
            <RouterProvider router={memoryRouter2} />
        </TestWrapper>,
    );
};

test("Loading... appears when post content hasn't loaded", () => {
    setup();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByTestId("location")).toHaveTextContent(mockPost1.miniLink);
});

test("loads post", async () => {
    setup();
    const title = await screen.findByText(mockPost1.title);
    expect(title).toBeInTheDocument();
});

test("back button calls on navigation function", async () => {
    setup();
    const backButton = await screen.findByText("Back");
    userEvent.click(backButton);
    await waitFor(() => expect(mockUseNavigate).toHaveBeenCalled());
});

test("add a comment", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockComment2 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockPost1Populated }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockComment1, mockComment2] }));
    const textField = await screen.findByLabelText("What are your thoughts?");
    userEvent.type(textField, mockComment2.text);
    const commentButton = screen.getByTestId("comment-submit-button");
    await waitFor(() => expect(commentButton).toBeEnabled());
    fireEvent.click(commentButton);
    const commentText = await screen.findByText(mockComment2.text);
    expect(commentText).toBeInTheDocument();
});

test("error while getting post triggers snack", async () => {
    setupPostError();
    const errorMsg = await screen.findByText("Error loading post data.");
    expect(errorMsg).toBeInTheDocument();
});

test("error while getting comments triggers snack", async () => {
    setupCommentError();
    await screen.findByLabelText("What are your thoughts?");
    const errorMsg = await screen.findByText("Error loading comments.");
    expect(errorMsg).toBeInTheDocument();
});

test("posts that have been saved by user show 'saved'", async () => {
    setup();
    await screen.findByText("Saved");
});

test("post that hasn't been saved shows 'save' button", async () => {
    setup2();
    await screen.findByText("Save");
});
