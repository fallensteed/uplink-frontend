import { fireEvent, render, screen } from "@testing-library/react";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import Uplink from "./Uplink";
import { mockPost1Populated } from "./mocks/post.mock";
import { mockUplinkUser1 } from "./mocks/uplinkUser.mock";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

const setup1 = () => {
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
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockPost1Populated] }));
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
