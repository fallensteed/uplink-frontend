import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { mockUser1 } from "common/api/user/user.mock";
import { socket } from "common/config/socket";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import { mockCommunity1 } from "../routes/Uplink/mocks/community.mock";
import { mockUplinkUser1, mockUplinkUser1Following } from "../routes/Uplink/mocks/uplinkUser.mock";
import Navigation from "./Navigation";
import { routeList } from "./pages";

let user: UserEvent;

const mockUseNavigate = jest.fn();
const mockUseLocation = { pathname: "/home" };

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUseNavigate,
    useLocation: () => mockUseLocation,
}));

const appList = routeList.filter((app) => app.displayInNavBar === true);

beforeEach(() => fetchMock.resetMocks());

afterAll(() => {
    socket.disconnect();
});

const setupDesktop1 = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockCommunity1] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1Following }));
    render(
        <TestWrapper>
            <Navigation />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};
const setupDesktop2 = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));
    render(
        <TestWrapper>
            <Navigation />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

const setupMobile = () => {
    user = userEvent.setup();
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: [mockCommunity1] }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1Following }));
    global.innerWidth = 599;
    global.dispatchEvent(new Event("resize"));
    render(
        <TestWrapper>
            <Navigation />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

describe("navigation page only tests", () => {
    test("clicking uplink text returns to homepage", async () => {
        setupDesktop1();
        const uplinkText = screen.getByText(/uplink/i);
        user.click(uplinkText);
        await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledWith("/home"));
    });
});

describe("navigation menu(s) tests", () => {
    describe("test for nav button display parameters", () => {
        test("page loads uplink nav button with home location", async () => {
            setupDesktop1();
            const menuButton = screen.getByLabelText("navigation menu");
            expect(menuButton).toHaveTextContent(/home/i);
        });
        test("page loads uplink nav button with /u location", async () => {
            mockUseLocation.pathname = "/u/jdoe";
            setupDesktop1();
            const menuButton = screen.getByLabelText("navigation menu");
            expect(menuButton).toHaveTextContent(/u\/jdoe/i);
        });
        test("page loads uplink nav button with /c location", async () => {
            mockUseLocation.pathname = "/c/test";
            setupDesktop1();
            const menuButton = screen.getByLabelText("navigation menu");
            expect(menuButton).toHaveTextContent(/c\/test/i);
        });
        test("page loads uplink nav button with /submit location", async () => {
            mockUseLocation.pathname = "/submit";
            setupDesktop1();
            const menuButton = screen.getByLabelText("navigation menu");
            expect(menuButton).toHaveTextContent(/create new post/i);
        });
        test("page loads uplink nav button with /new-community location", async () => {
            mockUseLocation.pathname = "/new-community";
            setupDesktop1();
            const menuButton = screen.getByLabelText("navigation menu");
            expect(menuButton).toHaveTextContent(/create new community/i);
        });
        test("page loads uplink nav button with /a location", async () => {
            mockUseLocation.pathname = appList[0].path;
            setupDesktop1();
            const menuButton = screen.getByLabelText("navigation menu");
            expect(menuButton).toHaveTextContent(appList[0].name);
        });
        test("page loads with slice name of non specified routes", async () => {
            mockUseLocation.pathname = "/johnny-depp";
            setupDesktop1();
            const menuButton = screen.getByLabelText("navigation menu");
            expect(menuButton).toHaveTextContent(/johnny-depp/i);
        });
    });
    test("page loads uplink nav button and it is clickable", async () => {
        setupDesktop1();
        const menuButton = screen.getByLabelText("navigation menu");
        user.click(menuButton);
        await screen.findByText("Your Communities");
    });
    test("has home link by default, clicking sends to home page", async () => {
        mockUseLocation.pathname = "/c/test";
        setupDesktop1();
        const menuButton = screen.getByLabelText("navigation menu");
        user.click(menuButton);
        const homeLink = await screen.findByText("Home");
        user.click(homeLink);
        await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledWith("/home"));
    });
    test("has home link by default, clicking sends to home page 2", async () => {
        mockUseLocation.pathname = "/c/test";
        setupDesktop1();
        const menuButton = screen.getByLabelText("navigation menu");
        user.click(menuButton);
        const homeLink = await screen.findByTestId("desktop-home-link");
        user.click(homeLink);
        await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledWith("/home"));
    });
    test("has create post link by default, sends to /submit on click", async () => {
        setupDesktop1();
        const menuButton = screen.getByLabelText("navigation menu");
        user.click(menuButton);
        const newCommButton = await screen.findByText("Create a Community");
        user.click(newCommButton);
        await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledWith("/new-community"));
    });
    test("follwed communities display and click sends to community page", async () => {
        setupDesktop1();
        const menuButton = screen.getByLabelText("navigation menu");
        user.click(menuButton);
        const communityLink = await screen.findByText(`c/${mockCommunity1.link}`);
        user.click(communityLink);
        await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledWith(`/c/${mockCommunity1.link}`));
    });
    test("follwed communities display and click sends to community page 2", async () => {
        setupDesktop1();
        const menuButton = screen.getByLabelText("navigation menu");
        user.click(menuButton);
        const communityLink = await screen.findByTestId(mockCommunity1.link);
        user.click(communityLink);
        await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledWith(`/c/${mockCommunity1.link}`));
    });
    test("if no followed communities, message is displayed to that effect", async () => {
        setupDesktop2();
        const menuButton = screen.getByLabelText("navigation menu");
        user.click(menuButton);
        const communityMessage = await screen.findByText("You haven't joined any communities yet!");
        expect(communityMessage).toBeInTheDocument();
    });
    test("if no followed users, no following message is displayed", async () => {
        setupDesktop2();
        const menuButton = screen.getByLabelText("navigation menu");
        user.click(menuButton);
        const communityMessage = await screen.findByText("You haven't followed any users yet!");
        expect(communityMessage).toBeInTheDocument();
    });
    test("if following users, their username(s) are displayed and are links to their pages", async () => {
        setupDesktop1();
        const menuButton = screen.getByLabelText("navigation menu");
        user.click(menuButton);
        const userFollowLink = await screen.findByText(`u/${mockUplinkUser1Following[0]}`);
        expect(userFollowLink).toBeInTheDocument();
        user.click(userFollowLink);
        await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledWith(`/u/${mockUplinkUser1Following[0]}`));
    });
    test("if following users, their username(s) are displayed and are links to their pages 2", async () => {
        setupDesktop1();
        const menuButton = screen.getByLabelText("navigation menu");
        user.click(menuButton);
        const userFollowLink = await screen.findByTestId(mockUplinkUser1Following[0]);
        expect(userFollowLink).toBeInTheDocument();
        user.click(userFollowLink);
        await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledWith(`/u/${mockUplinkUser1Following[0]}`));
    });
    test("apps are clickable and send user to the app's page", async () => {
        setupDesktop1();
        const menuButton = screen.getByLabelText("navigation menu");
        user.click(menuButton);
        const appLink = await screen.findByText(appList[0].name);
        expect(appLink).toBeInTheDocument();
        user.click(appLink);
        await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledWith(appList[0].path));
    });
    test("apps are clickable and send user to the app's page 2", async () => {
        setupDesktop1();
        const menuButton = screen.getByLabelText("navigation menu");
        user.click(menuButton);
        const appLink = await screen.findByTestId(appList[0].shortName);
        expect(appLink).toBeInTheDocument();
        user.click(appLink);
        await waitFor(() => expect(mockUseNavigate).toHaveBeenCalledWith(appList[0].path));
    });
    test("mobile menu can be opened with small screen", async () => {
        setupMobile();
        const mobileMenuButton = screen.getByLabelText("open drawer");
        user.click(mobileMenuButton);
        await screen.findByText("Your Communities");
    });
});
