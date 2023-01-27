import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CommunityRule } from "routes/Uplink/api/community/community.api";
import { TestWrapper } from "tests/Wrapper";
import { mockCommunity1 } from "./../../mocks/community.mock";
import CommunityRules from "./CommunityRules";

const mockRules = mockCommunity1.rules as CommunityRule[];

const setup = () => {
    render(
        <TestWrapper>
            <CommunityRules />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

const setup2 = () => {
    render(
        <TestWrapper>
            <CommunityRules rules={mockRules} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

test("if no rules are passed, nothing is displayed", () => {
    setup();
    expect(screen.queryByText("1.")).not.toBeInTheDocument();
});

test("if rules are available, they are displayed in numerical order", () => {
    setup2();
    expect(screen.getByText(`${mockRules[0].name}`)).toBeInTheDocument();
});
