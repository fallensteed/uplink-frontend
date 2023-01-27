import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import ProfileSettings from "./ProfileSettings";

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
            <ProfileSettings />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

test("user can click the edit button to edit their uplink username, then save the changes, receiving a success message", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: { modifiedCount: 1 } }));
    const editButton = screen.getByTestId("edit-username");
    user.click(editButton);
    const textField = await screen.findByRole("textbox");
    fireEvent.change(textField, { target: { value: "testuser" } });
    await waitFor(() => expect(textField).toHaveValue("testuser"));
    const saveButton = screen.getByText("Save");
    user.click(saveButton);
    await screen.findByText("Profile Successfully Updated");
});

test("user can click the edit button to edit their uplink username, then error saving the changes creates an error message", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    const editButton = screen.getByTestId("edit-username");
    user.click(editButton);
    const textField = await screen.findByRole("textbox");
    fireEvent.change(textField, { target: { value: "testuser" } });
    await waitFor(() => expect(textField).toHaveValue("testuser"));
    const saveButton = screen.getByText("Save");
    user.click(saveButton);
    await screen.findByText("Something went wrong.");
});

test("user can click the edit button to edit their uplink username the click cancel to stop changes", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    const editButton = screen.getByTestId("edit-username");
    user.click(editButton);
    await screen.findByRole("textbox");
    const cancelButton = screen.getByText("Cancel");
    user.click(cancelButton);
    await waitFor(() => expect(screen.queryByRole("textbox")).not.toBeInTheDocument());
});

test("user can click the edit button to edit their alias, then save the changes, receiving a success message", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: { modifiedCount: 1 } }));
    const editButton = screen.getByTestId("edit-alias");
    user.click(editButton);
    const textField = await screen.findByRole("textbox");
    fireEvent.change(textField, { target: { value: "testuser" } });
    await waitFor(() => expect(textField).toHaveValue("testuser"));
    const saveButton = screen.getByText("Save");
    user.click(saveButton);
    await screen.findByText("Profile Successfully Updated");
});

test("user can click the edit button to edit their alias, then error saving the changes creates an error message", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    const editButton = screen.getByTestId("edit-alias");
    user.click(editButton);
    const textField = await screen.findByRole("textbox");
    fireEvent.change(textField, { target: { value: "testuser" } });
    await waitFor(() => expect(textField).toHaveValue("testuser"));
    const saveButton = screen.getByText("Save");
    user.click(saveButton);
    await screen.findByText("Something went wrong.");
});

test("user can click the edit button to edit their alias the click cancel to stop changes", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ message: "error" }));
    const editButton = screen.getByTestId("edit-alias");
    user.click(editButton);
    await screen.findByRole("textbox");
    const cancelButton = screen.getByText("Cancel");
    user.click(cancelButton);
    await waitFor(() => expect(screen.queryByRole("textbox")).not.toBeInTheDocument());
});
