import { render, screen } from "@testing-library/react";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import Favorites, { mockFavoriteCommunities, mockFavoriteLinks } from "./Favorites";
import { mockUser1 } from "common/api/user/user.mock";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplink_user.mock";

const setup = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <Favorites />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks())

afterAll(() => {
    socket.disconnect();
});

test("page loads favorite communities and links", () => {
    setup();
    expect(screen.getByText(mockFavoriteCommunities[0])).toBeInTheDocument();
    expect(screen.getByText(mockFavoriteLinks[0])).toBeInTheDocument();
});
