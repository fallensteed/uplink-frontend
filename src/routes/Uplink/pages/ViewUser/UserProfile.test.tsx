import { render, screen } from "@testing-library/react";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplink_user.mock";
import { TestWrapper } from "tests/Wrapper";
import { mockUser1 } from "../../../../common/api/user/user.mock";
import UserProfile from "./UserProfile";

const setup1 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <UserProfile username={mockUser1.uplinkUsername} personalText={"test text"} birthday={"2020-01-01"} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};
const setup2 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <UserProfile username={mockUser1.uplinkUsername} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("loads user profile information with birthday and personal text", () => {
    setup1();
    expect(screen.getByText(`u/${mockUser1.uplinkUsername}`)).toBeInTheDocument();
    expect(screen.getByText("test text")).toBeInTheDocument();
    expect(screen.getByText("Birthday: 2020-01-01")).toBeInTheDocument();
});

test("loads without birthday and personal text", () => {
    setup2();
    const personalText = screen.queryByText("test text");
    const birthdayText = screen.queryByText("Birthday");
    expect(personalText).not.toBeInTheDocument();
    expect(birthdayText).not.toBeInTheDocument();
});
