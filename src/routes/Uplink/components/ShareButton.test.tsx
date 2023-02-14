import { fireEvent, render, screen } from "@testing-library/react";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import { mockUplinkUser1 } from "../mocks/uplinkUser.mock";
import ShareButton from "./ShareButton";

const setup = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <ShareButton link="mockLink" />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

Object.assign(navigator, {
    clipboard: {
        writeText: () => null,
    },
});

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("share button opens Popover on click", async () => {
    setup();

    const shareButton = screen.getByText("Share");
    fireEvent.click(shareButton);
    expect(screen.getByText("Copy Link")).toBeInTheDocument();
});

test("clicking Copy Link adds link to the clipboard", async () => {
    setup();
    jest.spyOn(navigator.clipboard, "writeText");
    const shareButton = screen.getByText("Share");
    fireEvent.click(shareButton);

    const copyLinkButton = screen.getByText("Copy Link");
    fireEvent.click(copyLinkButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("mockLink");
});
