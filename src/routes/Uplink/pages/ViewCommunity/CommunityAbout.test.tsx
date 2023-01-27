import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import CommunityAbout from "./CommunityAbout";

const mockText = "test about text";

const setup = () => {
    render(
        <TestWrapper>
            <CommunityAbout about={mockText} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

const setup2 = () => {
    render(
        <TestWrapper>
            <CommunityAbout />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

test("about text is displayed on the page if provided", () => {
    setup();
    expect(screen.getByText(mockText)).toBeInTheDocument();
});

test("if no about text is provided, then nothing is displayed", () => {
    setup2();
    expect(screen.queryByText("About this Community")).not.toBeInTheDocument();
});
