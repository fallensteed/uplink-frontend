import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import ReadingList, { mockReadingList } from "./ReadingList";

let user: UserEvent;
const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

const setup = () => {
    user = userEvent.setup();
    render(
        <TestWrapper>
            <ReadingList />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

test("page loads all titles", () => {
    setup();
    expect(screen.getByText(mockReadingList[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockReadingList[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockReadingList[2].name)).toBeInTheDocument();
    expect(screen.getByText(mockReadingList[3].name)).toBeInTheDocument();
});
