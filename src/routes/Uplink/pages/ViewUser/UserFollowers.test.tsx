import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import { mockUser1 } from "../../../../common/api/user/user.mock";
import UserFollowers from "./UserFollowers";
import { socket } from "common/config/socket";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

let user: UserEvent;

const setup1 = () => {
    user = userEvent.setup();
    render(
        <TestWrapper>
            <UserFollowers followers={[mockUser1]} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};
const setup2 = () => {
    user = userEvent.setup();
    render(
        <TestWrapper>
            <UserFollowers />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

afterAll(() => {
    socket.disconnect();
});

test("loads follower information", () => {
    setup1();
    expect(screen.getByText(`u/${mockUser1.uplinkUsername}`)).toBeInTheDocument();
});

test("shows no one is following when no users load", () => {
    setup2();
    expect(screen.getByText("No one is following this user.")).toBeInTheDocument();
});

test("link triggers navigate function", async () => {
    setup1();
    const navigateButton = screen.getByTestId("link-to-user");
    user.click(navigateButton);
    await waitFor(() => expect(mockUseNavigate).toHaveBeenCalled());
});
