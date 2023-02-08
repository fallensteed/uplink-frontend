import { render, screen } from "@testing-library/react";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import Favorites, { mockFavoriteCommunities, mockFavoriteLinks } from "./Favorites";

const setup = () => {
    render(
        <TestWrapper>
            <Favorites />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

afterAll(() => {
    socket.disconnect();
});

test("page loads favorite communities and links", () => {
    setup();
    expect(screen.getByText(mockFavoriteCommunities[0])).toBeInTheDocument();
    expect(screen.getByText(mockFavoriteLinks[0])).toBeInTheDocument();
});
