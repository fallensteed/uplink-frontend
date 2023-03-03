import { render, screen } from "@testing-library/react";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import MessageCard from "./MessageCard";

const testMessage = "test message";

const setup = () => {
    render(<MessageCard message={testMessage} />, { wrapper: MemoryRouter });
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("page renders the desired message", async () => {
    setup();
    expect(screen.getByText(testMessage)).toBeInTheDocument();
});
