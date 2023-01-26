import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "../../tests/Wrapper";
import Footer from "./Footer";

const setup = () => {
    render(
        <TestWrapper>
            <Footer connectionStatus={true} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

const setup2 = () => {
    render(
        <TestWrapper>
            <Footer connectionStatus={false} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

test("page connection status shows connected when status true", () => {
    setup();
    expect(screen.getByText("Live Services: Connected")).toBeInTheDocument();
});

test("page connection status shows Disconnected when status is false", () => {
    setup2();
    expect(screen.getByText("Live Services: Disconnected")).toBeInTheDocument();
});
