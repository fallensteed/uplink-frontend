/* eslint-disable jest/no-disabled-tests */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { TestWrapper } from "tests/Wrapper";
import ProfileSettings from "./ProfileSettings";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplinkUser.mock";

let user: UserEvent;

beforeEach(() => fetchMock.resetMocks());

const setup1 = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <ProfileSettings />
        </TestWrapper>,
    );
};

afterAll(() => {
    socket.disconnect();
});

test.skip("page loads and displays loading screen before data appears", async () => {
    setup1();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("clicking pencil for edit username allows username to be edited and submitted", async () => {
    setup1();
    fetchMock.mockResponseOnce(JSON.stringify({ data: { modifiedCount: 1 } }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    const editButton = screen.getByTestId("edit-username");
    user.click(editButton);
    const usernameField = await screen.findByRole("textbox");
    user.clear(usernameField);
    user.type(usernameField, "newuser");
    await waitFor(() => expect(usernameField).toHaveValue("newuser"));
    const saveButton = screen.getByText("Save");
    user.click(saveButton);
    await screen.findByText("Profile Successfully Updated");
});

test("error saving updated username causes error message", async () => {
    setup1();
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    const editButton = screen.getByTestId("edit-username");
    user.click(editButton);
    const usernameField = await screen.findByRole("textbox");
    user.clear(usernameField);
    user.type(usernameField, "newuser");
    await waitFor(() => expect(usernameField).toHaveValue("newuser"));
    const saveButton = screen.getByText("Save");
    user.click(saveButton);
    await screen.findByText("Something went wrong.");
});

test("clicking cancel closes edit for username", async () => {
    setup1();
    const editButton = screen.getByTestId("edit-username");
    user.click(editButton);
    await screen.findByRole("textbox");
    const cancelButton = screen.getByText("Cancel");
    user.click(cancelButton);
    await waitFor(() => expect(screen.queryByRole("textbox")).not.toBeInTheDocument());
});

test("clicking pencil for edit alias allows alias to be edited and submitted", async () => {
    setup1();
    fetchMock.mockResponseOnce(JSON.stringify({ data: { modifiedCount: 1 } }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    const editButton = screen.getByTestId("edit-alias");
    user.click(editButton);
    const usernameField = await screen.findByRole("textbox");
    user.clear(usernameField);
    user.type(usernameField, "steve");
    await waitFor(() => expect(usernameField).toHaveValue("steve"));
    const saveButton = screen.getByText("Save");
    user.click(saveButton);
    await screen.findByText("Profile Successfully Updated");
});

test("error saving updated alias causes error message", async () => {
    setup1();
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    const editButton = screen.getByTestId("edit-alias");
    user.click(editButton);
    const usernameField = await screen.findByRole("textbox");
    user.clear(usernameField);
    user.type(usernameField, "steve");
    await waitFor(() => expect(usernameField).toHaveValue("steve"));
    const saveButton = screen.getByText("Save");
    user.click(saveButton);
    await screen.findByText("Something went wrong.");
});

test("clicking cancel closes edit for alias", async () => {
    setup1();
    const editButton = screen.getByTestId("edit-alias");
    user.click(editButton);
    await screen.findByRole("textbox");
    const cancelButton = screen.getByText("Cancel");
    user.click(cancelButton);
    await waitFor(() => expect(screen.queryByRole("textbox")).not.toBeInTheDocument());
});
