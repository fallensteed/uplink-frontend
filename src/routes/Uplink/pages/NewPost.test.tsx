/* eslint-disable jest/no-disabled-tests */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { socket } from "common/config/socket";
import { MemoryRouter, RouterProvider, createMemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import { mockCommunity1 } from "../mocks/community.mock";
import { mockPost1 } from "../mocks/post.mock";
import NewPost from "./NewPost";
import { mockUser1 } from "common/api/user/user.mock";
import { mockUplinkUser1 } from "../mocks/uplink_user.mock";

let user: UserEvent;

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

const memoryRoutes = [{ path: "/submit/:communityLink", element: <NewPost /> }];
const memoryRouter = createMemoryRouter(memoryRoutes, {
    initialEntries: ["/", `/submit/${mockCommunity1.link}`],
    initialIndex: 1,
});

const setup = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockCommunity1] }));
    user = userEvent.setup();
    render(
        <TestWrapper>
            <NewPost />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

const setupParams = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockCommunity1] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockCommunity1 }));
    user = userEvent.setup();
    render(
        <TestWrapper>
            <RouterProvider router={memoryRouter} />
        </TestWrapper>,
    );
};

afterAll(() => {
    socket.disconnect();
});

beforeEach(() => fetchMock.resetMocks());

test("back button calls on navigation function", async () => {
    setup();
    const backButton = screen.getByText("Back");
    userEvent.click(backButton);
    await waitFor(() => expect(mockUseNavigate).toHaveBeenCalled());
});

test("select community from dropdown", async () => {
    setup();
    const communitySelect = screen.getByLabelText("Select a Community *");
    userEvent.click(communitySelect);
    const communityItem = await screen.findByText(`c/${mockCommunity1.link}`);
    userEvent.click(communityItem);
    await waitFor(() => expect(communityItem).toBeInTheDocument());
});

test("use location", async () => {
    setupParams();
    expect(screen.getByTestId("location")).toHaveTextContent(mockCommunity1.link);
    // need to add code to verify that the location selects the right community on load.
});

test.skip("no community to select from dropdown", async () => {
    setup();
    const communitySelect = screen.getByLabelText("Select a Community *");
    userEvent.click(communitySelect);
    const noCommunities = await screen.findByTestId("no-communities");
    await waitFor(() => expect(noCommunities).toBeInTheDocument());
});

test("change post title", async () => {
    setup();
    const titleField = screen.getByLabelText("Title *");
    user.type(titleField, "test");
    await waitFor(() => expect(titleField).toHaveValue("test"));
});

test("change post text", async () => {
    setup();
    const textField = screen.getByLabelText("Text *");
    user.type(textField, "test");
    await waitFor(() => expect(textField).toHaveValue("test"));
});

test("change post link url", async () => {
    setup();
    const urlField = screen.getByLabelText("Link URL");
    user.type(urlField, "test");
    await waitFor(() => expect(urlField).toHaveValue("test"));
});

test("change post img url", async () => {
    setup();
    const urlField = screen.getByLabelText("Image URL");
    user.type(urlField, "test");
    await waitFor(() => expect(urlField).toHaveValue("test"));
});

test("check send me notifications", async () => {
    setup();
    const notifCheck = screen.getByLabelText("Send me notifications on comments");
    user.click(notifCheck);
    await waitFor(() => expect(notifCheck).toBeChecked());
});

test("Submit post errors without community selected", async () => {
    setup();
    const postButton = screen.getByText("Post");
    userEvent.click(postButton);
    const errorMsg = await screen.findByText("Select a Community");
    expect(errorMsg).toBeInTheDocument();
});

test("Submit post errors without post title", async () => {
    setup();
    const communitySelect = screen.getByLabelText("Select a Community *");
    userEvent.click(communitySelect);
    const communityItem = await screen.findByText(`c/${mockCommunity1.link}`);
    userEvent.click(communityItem);
    await waitFor(() => expect(communityItem).toBeInTheDocument());
    const postButton = screen.getByText("Post");
    userEvent.click(postButton);
    const errorMsg = await screen.findByText("Post Title Required");
    expect(errorMsg).toBeInTheDocument();
});

test("Submit post errors without post text", async () => {
    setup();
    const communitySelect = screen.getByLabelText("Select a Community *");
    userEvent.click(communitySelect);
    const communityItem = await screen.findByText(`c/${mockCommunity1.link}`);
    userEvent.click(communityItem);
    await waitFor(() => expect(communityItem).toBeInTheDocument());
    const titleField = screen.getByLabelText("Title *");
    user.type(titleField, "test");
    await waitFor(() => expect(titleField).toHaveValue("test"));
    const postButton = screen.getByText("Post");
    userEvent.click(postButton);
    const errorMsg = await screen.findByText("Post Text Required");
    expect(errorMsg).toBeInTheDocument();
});

test("Submit post without errors", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockPost1 }));
    const communitySelect = screen.getByLabelText("Select a Community *");
    userEvent.click(communitySelect);
    const communityItem = await screen.findByText(`c/${mockCommunity1.link}`);
    userEvent.click(communityItem);
    await waitFor(() => expect(communityItem).toBeInTheDocument());
    const titleField = screen.getByLabelText("Title *");
    user.type(titleField, "test");
    await waitFor(() => expect(titleField).toHaveValue("test"));
    const textField = screen.getByLabelText("Text *");
    user.type(textField, "test");
    await waitFor(() => expect(textField).toHaveValue("test"));
    const urlField = screen.getByLabelText("Link URL");
    user.type(urlField, "test");
    await waitFor(() => expect(urlField).toHaveValue("test"));
    const imgField = screen.getByLabelText("Image URL");
    user.type(imgField, "test");
    await waitFor(() => expect(imgField).toHaveValue("test"));
    const notifCheck = screen.getByLabelText("Send me notifications on comments");
    user.click(notifCheck);
    await waitFor(() => expect(notifCheck).toBeChecked());
    const postButton = screen.getByText("Post");
    userEvent.click(postButton);
    const successMsg = await screen.findByText("Your Post has been created!");
    expect(successMsg).toBeInTheDocument();
    await waitFor(() => expect(mockUseNavigate).toHaveBeenCalled());
});

test("Submit post with error resposne", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: { msg: "error" } }));
    const communitySelect = screen.getByLabelText("Select a Community *");
    userEvent.click(communitySelect);
    const communityItem = await screen.findByText(`c/${mockCommunity1.link}`);
    userEvent.click(communityItem);
    await waitFor(() => expect(communityItem).toBeInTheDocument());
    const titleField = screen.getByLabelText("Title *");
    user.type(titleField, "test");
    await waitFor(() => expect(titleField).toHaveValue("test"));
    const textField = screen.getByLabelText("Text *");
    user.type(textField, "test");
    await waitFor(() => expect(textField).toHaveValue("test"));
    const urlField = screen.getByLabelText("Link URL");
    user.type(urlField, "test");
    await waitFor(() => expect(urlField).toHaveValue("test"));
    const imgField = screen.getByLabelText("Image URL");
    user.type(imgField, "test");
    await waitFor(() => expect(imgField).toHaveValue("test"));
    const notifCheck = screen.getByLabelText("Send me notifications on comments");
    user.click(notifCheck);
    await waitFor(() => expect(notifCheck).toBeChecked());
    const postButton = screen.getByText("Post");
    userEvent.click(postButton);
    const errorMsg = await screen.findByText("I think something went wrong");
    expect(errorMsg).toBeInTheDocument();
});
