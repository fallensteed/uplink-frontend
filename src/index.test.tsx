import { render, screen } from "@testing-library/react";

test("renders react component", () => {
    render(
        <div id="root">
            <h1>Uplink</h1>
        </div>,
    );
    const uplinkTitle = screen.getByText(/uplink/i);
    expect(uplinkTitle).toBeInTheDocument();
});
