import { render, screen } from "@testing-library/react";
import { mockUser1 } from "common/api/user/user.mock";
import { routeObject } from "navigation/pages";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

test("renders react component", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockUser1 }));
    const router = createMemoryRouter(routeObject, {
        initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);
    const uplinkText = screen.getByText(/uplink/i);
    expect(uplinkText).toBeInTheDocument();
});
