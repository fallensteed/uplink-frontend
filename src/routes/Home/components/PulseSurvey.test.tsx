import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "./../../../tests/Wrapper";
import PulseSurvey from "./PulseSurvey";
import { socket } from "common/config/socket";

const setup = () => {
    render(
        <TestWrapper>
            <PulseSurvey />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

afterAll(() => {
    socket.disconnect();
});

test("page loads", () => {
    setup();
    expect(screen.getByText("USSF Pulse")).toBeInTheDocument();
});
