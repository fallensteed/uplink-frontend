import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplink_user.mock";
import { TestWrapper } from "tests/Wrapper";
import { mockCommunity1, mockCommunity2 } from "./../../Uplink/mocks/community.mock";
import TopCommunities from "./TopCommunities";

let user: UserEvent;
const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

const setup = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockCommunity1, mockCommunity2] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <TopCommunities />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("displays loading... while communities load.", () => {
    setup();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("loads communities and displays their link name", async () => {
    setup();
    const community1 = await screen.findByText(`c/${mockCommunity1.link}`);
    expect(community1).toBeInTheDocument();
});

test("clicking on a community will send user to the community page", async () => {
    setup();
    const community1 = await screen.findByText(`c/${mockCommunity1.link}`);
    user.click(community1);
    await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledWith(`/c/${mockCommunity1.link}`));
});
