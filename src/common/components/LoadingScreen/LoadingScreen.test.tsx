import { render, screen } from "@testing-library/react";
import { mockUser1 } from "common/api/user/user.mock";
import LoadingScreen from "common/components/LoadingScreen/LoadingScreen";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplinkUser.mock";
import { TestWrapper } from "tests/Wrapper";

const setup = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <LoadingScreen />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("While user is loading, loading screen appears", async () => {
    setup();
    expect(screen.getByText("Loading. Please Wait...")).toBeInTheDocument();
});
