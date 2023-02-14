import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplink_user.mock";
import { TestWrapper } from "tests/Wrapper";
import { mockUser1 } from "./../../../../common/api/user/user.mock";
import CommunityMods from "./CommunityMods";

let user: UserEvent;
const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

const setup = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <CommunityMods mods={[mockUser1]} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("page displays moderators username", async () => {
    setup();
    expect(screen.getByText(`u/${mockUser1.uplinkUsername}`)).toBeInTheDocument();
});

test("clicking on a moderator sends user to the user page", async () => {
    setup();
    const modLink = screen.getByText(`u/${mockUser1.uplinkUsername}`);
    user.click(modLink);
    await waitFor(() => expect(mockUseNavigate).toBeCalledWith(`../u/${mockUser1.uplinkUsername}`));
});
