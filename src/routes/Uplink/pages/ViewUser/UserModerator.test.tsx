import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { TestWrapper } from "tests/Wrapper";
import UserModerator from "./UserModerator";
import { mockCommunity1 } from "../../mocks/community.mock";
import { MemoryRouter } from "react-router-dom";

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
            <UserModerator moderator={[mockCommunity1]} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};
const setup2 = () => {
    user = userEvent.setup();
    render(
        <TestWrapper>
            <UserModerator />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

test("loads follower information", () => {
    setup1();
    expect(screen.getByText(`c/${mockCommunity1.link}`)).toBeInTheDocument();
});

test("shows no one is following when no users load", () => {
    setup2();
    expect(screen.getByText("This user does not moderate any communities.")).toBeInTheDocument();
});

test("link triggers navigate function", async () => {
    setup1();
    const navigateButton = screen.getByTestId("link-to-community");
    user.click(navigateButton);
    await waitFor(() => expect(mockUseNavigate).toHaveBeenCalled());
});
