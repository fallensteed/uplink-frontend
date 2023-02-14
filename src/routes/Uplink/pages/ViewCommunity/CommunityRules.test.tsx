import { render, screen } from "@testing-library/react";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { CommunityRule } from "routes/Uplink/api/community/community.api";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplinkUser.mock";
import { TestWrapper } from "tests/Wrapper";
import { mockCommunity1 } from "./../../mocks/community.mock";
import CommunityRules from "./CommunityRules";

const mockRules = mockCommunity1.rules as CommunityRule[];

const setup = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <CommunityRules />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

const setup2 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <CommunityRules rules={mockRules} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("if no rules are passed, nothing is displayed", () => {
    setup();
    expect(screen.queryByText("1.")).not.toBeInTheDocument();
});

test("if rules are available, they are displayed in numerical order", () => {
    setup2();
    expect(screen.getByText(`${mockRules[0].name}`)).toBeInTheDocument();
});
