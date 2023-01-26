import { render, screen } from "@testing-library/react";
import { ProvideUser, userContextDefaultValue } from "common/context/User/UserContext";
import { MemoryRouter } from "react-router-dom";
import { mockUplinkUser1 } from "../../../routes/Uplink/mocks/uplink_user.mock";
import { mockUser1 } from "../../api/user/user.mock";
import { useUser } from "./UserContext";

const MockComponent = () => {
    const user = useUser();
    return user.isLoading ? (
        <div>Loading</div>
    ) : (
        <div>
            <p>{user.profile.firstName}</p>
            <p>{user.uplink.default}</p>
        </div>
    );
};

beforeEach(() => fetchMock.resetMocks());

const setup = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUplinkUser1 }));
    render(
        <ProvideUser>
            <MockComponent />
        </ProvideUser>,
        { wrapper: MemoryRouter },
    );
};

test("mock component shows loading when is loading is true", async () => {
    setup();
    expect(screen.getByText("Loading")).toBeInTheDocument();
});

test("mock component shows user information after loading", async () => {
    setup();
    const firstName = await screen.findByText(mockUser1.firstName);
    const uplinkDefault = await screen.findByText(mockUplinkUser1.default);
    expect(firstName).toBeInTheDocument();
    expect(uplinkDefault).toBeInTheDocument();
});

test("getUserProfile default return null", async () => {
    const mock = jest.spyOn(userContextDefaultValue, "getUserProfile");
    userContextDefaultValue.getUserProfile();
    expect(mock).toReturnWith(null);
});

test("getUplinkUser default return null", async () => {
    const mock = jest.spyOn(userContextDefaultValue, "getUplinkUser");
    userContextDefaultValue.getUplinkUser();
    expect(mock).toReturnWith(null);
});
