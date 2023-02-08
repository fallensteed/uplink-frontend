import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { MemoryRouter } from "react-router-dom";
import { mockUser1 } from "./../../common/api/user/user.mock";
import { TestWrapper } from "./../../tests/Wrapper";
import UserDisplay from "./UserDisplay";
import { socket } from "common/config/socket";

let user: UserEvent;
const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

const setup = () => {
    user = userEvent.setup();
    render(
        <TestWrapper>
            <UserDisplay />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("users can click on their username+icon and open a menu", async () => {
    setup();
    const button = screen.getByText(mockUser1.uplinkUsername);
    user.click(button);
    await screen.findByText("Profile and Settings");
});

test("users can click on the profile and settings link to be redirected to that page", async () => {
    setup();
    const button = screen.getByText(mockUser1.uplinkUsername);
    user.click(button);
    const profileButton = await screen.findByText("Profile and Settings");
    user.click(profileButton);
    await waitFor(() => expect(mockUseNavigate).toHaveBeenCalled());
});
