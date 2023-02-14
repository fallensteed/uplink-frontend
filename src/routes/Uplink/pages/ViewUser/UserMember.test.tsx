import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplinkUser.mock";
import { TestWrapper } from "tests/Wrapper";
import { mockCommunity1 } from "../../mocks/community.mock";
import UserMember from "./UserMember";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

let user: UserEvent;

const setup1 = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <UserMember member={[mockCommunity1]} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};
const setup2 = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <UserMember />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("loads follower information", () => {
    setup1();
    expect(screen.getByText(`c/${mockCommunity1.link}`)).toBeInTheDocument();
});

test("shows no one is following when no users load", () => {
    setup2();
    expect(screen.getByText("This user is not a member of any communities.")).toBeInTheDocument();
});

test("link triggers navigate function", async () => {
    setup1();
    const navigateButton = screen.getByTestId("link-to-community");
    user.click(navigateButton);
    await waitFor(() => expect(mockUseNavigate).toHaveBeenCalled());
});
