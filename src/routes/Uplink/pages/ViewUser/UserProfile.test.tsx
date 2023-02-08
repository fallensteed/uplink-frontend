import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import { mockUser1 } from "../../../../common/api/user/user.mock";
import UserProfile from "./UserProfile";
import { socket } from "common/config/socket";

const setup1 = () => {
    render(
        <TestWrapper>
            <UserProfile username={mockUser1.uplinkUsername} personalText={"test text"} birthday={"2020-01-01"} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};
const setup2 = () => {
    render(
        <TestWrapper>
            <UserProfile username={mockUser1.uplinkUsername} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

afterAll(() => {
    socket.disconnect();
});

test("loads user profile information with birthday and personal text", () => {
    setup1();
    expect(screen.getByText(`u/${mockUser1.uplinkUsername}`)).toBeInTheDocument();
    expect(screen.getByText("test text")).toBeInTheDocument();
    expect(screen.getByText("Birthday: 2020-01-01")).toBeInTheDocument();
});

test("loads without birthday and personal text", () => {
    setup2();
    const personalText = screen.queryByText("test text");
    const birthdayText = screen.queryByText("Birthday");
    expect(personalText).not.toBeInTheDocument();
    expect(birthdayText).not.toBeInTheDocument();
});
