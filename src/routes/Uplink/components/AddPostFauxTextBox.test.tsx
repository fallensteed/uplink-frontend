import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import { mockUplinkUser1 } from "../mocks/uplinkUser.mock";
import AddPostFauxTextBox from "./AddPostFauxTextBox";

let user: UserEvent;

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
}));

const setup = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    user = userEvent.setup();
    render(
        <TestWrapper>
            <AddPostFauxTextBox />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

afterAll(() => {
    socket.disconnect();
});

beforeEach(() => fetchMock.resetMocks());

test("clicking text box triggers navigate event", async () => {
    setup();
    const button = screen.getByText("Add New Post");
    user.click(button);
    await waitFor(() => expect(mockUseNavigate).toHaveBeenCalled());
});
