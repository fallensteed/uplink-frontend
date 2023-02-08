import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import ShareButton from "./ShareButton";
import { socket } from "common/config/socket";

const setup = () => {
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
