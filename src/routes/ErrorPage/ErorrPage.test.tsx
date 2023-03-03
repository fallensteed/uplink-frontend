import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { socket } from "common/config/socket";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import ErrorPage from "./ErrorPage";
import { mockUser1 } from "common/api/user/user.mock";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplinkUser.mock";

let user: UserEvent;

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

const memoryRoutes = [{ path: "/error", element: <ErrorPage /> }];
const memoryRouter = createMemoryRouter(memoryRoutes, {
    initialEntries: ["/", "/error"],
    initialIndex: 1,
});

const setup = () => {
    user = userEvent.setup();
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

beforeEach(() => fetchMock.resetMocks());

test("back button calls on navigation function", async () => {
    setup();
    const backButton = screen.getByText("Try Going Back");
    user.click(backButton);
    await waitFor(() => expect(mockUseNavigate).toHaveBeenCalled());
});
