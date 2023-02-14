import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import AddComment from "./AddComment";
import { socket } from "common/config/socket";
import { mockUser1 } from "common/api/user/user.mock";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplinkUser.mock";

let user: UserEvent;

const mockFn = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mock(text: string) {
        return;
    },
};

const mockHandleAddComment = async (text: string) => {
    mockFn.mock(text);
};

const setup = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <AddComment handleAddComment={mockHandleAddComment} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("comment text can be added and calls handleAddComment function on submit", async () => {
    setup();
    const mock = jest.spyOn(mockFn, "mock");
    const textField = screen.getByLabelText("What are your thoughts?");
    user.type(textField, "test comment");
    await waitFor(() => expect(textField).toHaveValue("test comment"));
    const submitButton = screen.getByText("Comment");
    user.click(submitButton);
    await waitFor(() => expect(mock).toHaveBeenCalledWith("test comment"));
});
