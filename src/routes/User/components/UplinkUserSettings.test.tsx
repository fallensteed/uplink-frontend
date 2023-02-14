import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import {
    mockUplinkUser1,
    mockUplinkUser1Requested,
    mockUplinkUser1Verified,
} from "routes/Uplink/mocks/uplink_user.mock";
import { TestWrapper } from "tests/Wrapper";
import UplinkUserSettings from "./UplinkUserSettings";

let user: UserEvent;

beforeEach(() => fetchMock.resetMocks());

const setup1 = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <UplinkUserSettings />
        </TestWrapper>,
    );
};

const setup2 = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1Requested }));
    render(
        <TestWrapper>
            <UplinkUserSettings />
        </TestWrapper>,
    );
};

const setup3 = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1Verified }));
    render(
        <TestWrapper>
            <UplinkUserSettings />
        </TestWrapper>,
    );
};

afterAll(() => {
    socket.disconnect();
});

test("loads", async () => {
    setup1();
    expect(screen.getByText("Uplink")).toBeInTheDocument();
});

describe("dropdown actions for default user display", () => {
    test("clicking edit next to default user display allows change of default display.", async () => {
        setup1();
        const editButton = screen.getByTestId("edit-default-display");
        user.click(editButton);
        const dropdown = await screen.findByTestId("select-default-display");
        expect(dropdown).toHaveTextContent("Uplink Username");
    });

    test("if user is not verified, then verified default display should be disabled.", async () => {
        setup1();
        const editButton = screen.getByTestId("edit-default-display");
        user.click(editButton);
        await screen.findByTestId("select-default-display");
        const dropdownbutton = await screen.findByText("Uplink Username");
        user.click(dropdownbutton);
        const disabledText = await screen.findByText("Verified Account");
        expect(disabledText).toHaveAttribute("aria-disabled", "true");
    });

    test("clicking cancel will return to default state", async () => {
        setup1();
        const editButton = screen.getByTestId("edit-default-display");
        user.click(editButton);
        const cancelButton = await screen.findByText(/cancel/i);
        user.click(cancelButton);
        await waitFor(() => expect(cancelButton).not.toBeInTheDocument());
        await screen.findByText("Uplink Username");
    });

    test("if user is verified, they can click verified and submit change successfully", async () => {
        setup3();
        fetchMock.mockResponseOnce(JSON.stringify({ data: { modifiedCount: 1 } }));
        fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1Verified }));
        const editButton = screen.getByTestId("edit-default-display");
        user.click(editButton);
        await screen.findByTestId("select-default-display");
        const dropdownbutton = await screen.findByText("Uplink Username");
        user.click(dropdownbutton);
        const verifiedText = await screen.findByText("Verified Account");
        user.click(verifiedText);
        const saveButton = screen.getByText(/save/i);
        user.click(saveButton);
        const successText = await screen.findByText("Successfully changed.");
        expect(successText).toBeInTheDocument();
    });

    test("submit change to default display with error", async () => {
        setup3();
        fetchMock.mockResponseOnce(JSON.stringify({ data: { modifiedCount: 0 } }));
        const editButton = screen.getByTestId("edit-default-display");
        user.click(editButton);
        await screen.findByTestId("select-default-display");
        const dropdownbutton = await screen.findByText("Uplink Username");
        user.click(dropdownbutton);
        const verifiedText = await screen.findByText("Verified Account");
        user.click(verifiedText);
        const saveButton = screen.getByText(/save/i);
        user.click(saveButton);
        const successText = await screen.findByText("Something went wrong.");
        expect(successText).toBeInTheDocument();
    });
});

describe("displays verification status", () => {
    test("shows not-requested verification status", async () => {
        setup1();
        const verificationStatus = screen.getByText("Not Requested");
        expect(verificationStatus).toBeInTheDocument();
    });
    test("shows requested verification status", async () => {
        setup2();
        const verificationStatus = await screen.findByText("Requested");
        expect(verificationStatus).toBeInTheDocument();
    });
    test("shows verified verification status", async () => {
        setup3();
        const verificationStatus = await screen.findByText("Verified");
        expect(verificationStatus).toBeInTheDocument();
    });
});

describe("submitting for verification", () => {
    test("clicking checkbox, opens dialog box, submits for verification successfully", async () => {
        setup1();
        fetchMock.mockResponseOnce(JSON.stringify({ data: { modifiedCount: 1 } }));
        fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1Verified }));
        const verificationStatus = screen.getByText("Not Requested");
        expect(verificationStatus).toBeInTheDocument();
        const checkBox = screen.getByLabelText("Request Verification");
        user.click(checkBox);
        const submitButton = await screen.findByText("Submit for Verification");
        user.click(submitButton);
        const successText = await screen.findByText("Request for Verification Submitted.");
        expect(successText).toBeInTheDocument();
    });
    test("clicking checkbox, opens dialog box, cancel closes box", async () => {
        setup1();
        fetchMock.mockResponseOnce(JSON.stringify({ data: { modifiedCount: 1 } }));
        fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1Verified }));
        const verificationStatus = screen.getByText("Not Requested");
        expect(verificationStatus).toBeInTheDocument();
        const checkBox = screen.getByLabelText("Request Verification");
        user.click(checkBox);
        const cancelButton = await screen.findByText("Cancel");
        user.click(cancelButton);
        await waitFor(() => expect(cancelButton).not.toBeInTheDocument());
        screen.queryByTestId("verification-dialog");
    });
    test("clicking checkbox, opens dialog box, displays error for error received", async () => {
        setup1();
        fetchMock.mockResponseOnce(JSON.stringify({ data: { modifiedCount: 0 } }));
        const verificationStatus = screen.getByText("Not Requested");
        expect(verificationStatus).toBeInTheDocument();
        const checkBox = screen.getByLabelText("Request Verification");
        user.click(checkBox);
        const submitButton = await screen.findByText("Submit for Verification");
        user.click(submitButton);
        const errorText = await screen.findByText("Something went wrong.");
        expect(errorText).toBeInTheDocument();
    });
});
