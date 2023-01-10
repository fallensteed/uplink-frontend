import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import { mockCommunity1 } from "../mocks/community.mock";
import NewCommunity from "./NewCommunity";

let user: UserEvent;

const setup = () => {
    user = userEvent.setup();
    render(
        <TestWrapper>
            <NewCommunity />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

const setupRules = () => {
    setup();
    const addRuleButton = screen.getByTestId("add-rule-button");
    userEvent.click(addRuleButton);
};

beforeAll(() => fetchMock.resetMocks());

test("change community name updates state and create community link", async () => {
    setup();
    const nameField = screen.getByLabelText("Community Name *");
    user.type(nameField, "test");
    const linkField = screen.getByLabelText("Community Link");
    await waitFor(() => expect(nameField).toHaveValue("test"));
    await waitFor(() => expect(linkField).toHaveValue("c/test"));
});

test("change about this community", async () => {
    setup();
    const aboutField = screen.getByLabelText("About this Community");
    user.type(aboutField, "about");
    await waitFor(() => expect(aboutField).toHaveValue("about"));
});

test("toggle public switch", async () => {
    setup();
    const publicToggle = screen.getByLabelText("Public Community");
    expect(publicToggle).toBeChecked();
    user.click(publicToggle);
    await waitFor(() => expect(publicToggle).not.toBeChecked());
});

test("check request official channel", async () => {
    setup();
    const officialCheck = screen.getByLabelText("Request as Official Community");
    expect(officialCheck).not.toBeChecked();
    user.click(officialCheck);
    await waitFor(() => expect(officialCheck).toBeChecked());
});

test("add a new rule", async () => {
    setup();
    const addRuleButton = screen.getByTestId("add-rule-button");
    userEvent.click(addRuleButton);
    const ruleNumber = await screen.findByText("1.");
    expect(ruleNumber).toBeInTheDocument();
});

test("update rule name", async () => {
    setupRules();
    const ruleNameField = await screen.findByLabelText("Rule Name");
    user.type(ruleNameField, "test");
    await waitFor(() => expect(ruleNameField).toHaveValue("test"));
});

test("update rule detail", async () => {
    setupRules();
    const ruleDetailField = await screen.findByLabelText("Rule Detail");
    user.type(ruleDetailField, "test");
    await waitFor(() => expect(ruleDetailField).toHaveValue("test"));
});

test("submit error, no community name", async () => {
    setup();
    const submitButton = screen.getByText("Submit");
    user.click(submitButton);
    const errorMsg = await screen.findByText("Enter a Community Name");
    await waitFor(() => expect(errorMsg).toBeInTheDocument());
});

test("submit with no error", async () => {
    setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockCommunity1 }));
    const nameField = screen.getByLabelText("Community Name *");
    const linkField = screen.getByLabelText("Community Link");
    user.type(nameField, "test");
    await waitFor(() => expect(nameField).toHaveValue("test"));
    await waitFor(() => expect(linkField).toHaveValue("c/test"));
    const submitButton = screen.getByText("Submit");
    user.click(submitButton);
    const successMsg = await screen.findByText("Your Community has been created!");
    await waitFor(() => expect(successMsg).toBeInTheDocument());
});
