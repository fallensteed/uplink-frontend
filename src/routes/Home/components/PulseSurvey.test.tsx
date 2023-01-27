import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "./../../../tests/Wrapper";
import PulseSurvey from "./PulseSurvey";

const setup = () => {
    render(
        <TestWrapper>
            <PulseSurvey />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

test("page loads", () => {
    setup();
    expect(screen.getByText("USSF Pulse")).toBeInTheDocument();
});
