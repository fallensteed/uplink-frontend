import { render, screen } from "@testing-library/react";
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

test("page loads favorite communities and links", () => {
    setup();
    expect(screen.getByText(mockFavoriteCommunities[0])).toBeInTheDocument();
    expect(screen.getByText(mockFavoriteLinks[0])).toBeInTheDocument();
});
