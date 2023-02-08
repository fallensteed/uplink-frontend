import { render, screen } from "@testing-library/react";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import ReadingList, { mockReadingList } from "./ReadingList";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

const setup = () => {
    render(
        <TestWrapper>
            <ReadingList />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("page loads all titles", () => {
    setup();
    expect(screen.getByText(mockReadingList[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockReadingList[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockReadingList[2].name)).toBeInTheDocument();
    expect(screen.getByText(mockReadingList[3].name)).toBeInTheDocument();
});
