import { render, screen } from "@testing-library/react";
import { mockUser1 } from "common/api/user/user.mock";
import moment from "moment";
import { MemoryRouter } from "react-router-dom";
import { mockUplinkUser1 } from "routes/Uplink/mocks/uplink_user.mock";
import { TestWrapper } from "../../tests/Wrapper";
import { socket } from "../config/socket";
import Footer from "./Footer";

const setup = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <Footer connectionStatus={true} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

const setup2 = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <TestWrapper>
            <Footer connectionStatus={false} />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

test("page displays year with copywrite", () => {
    setup();
    expect(screen.getByText(`Created by Supra Coders for the USSF © ${moment().format("YYYY")}`)).toBeInTheDocument();
});

test("page connection status shows connected when status true", () => {
    setup();
    expect(screen.getByText("Live Services: Connected")).toBeInTheDocument();
});

test("page connection status shows Disconnected when status is false", () => {
    setup2();
    expect(screen.getByText("Live Services: Disconnected")).toBeInTheDocument();
});
