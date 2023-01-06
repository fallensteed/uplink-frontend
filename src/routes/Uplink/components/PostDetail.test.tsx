import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TestWrapper } from "tests/Wrapper";
import PostDetail from "./PostDetail";

const setup1 = () => {
    render(
        <TestWrapper>
            <PostDetail
                createdAt={new Date().toString()}
                communityLink={"c/mock"}
                username={"u/mock"}
                edited={false}
                style={"vertical"}
            />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};
const setup2 = () => {
    render(
        <TestWrapper>
            <PostDetail
                createdAt={new Date().toString()}
                communityLink={"c/mock"}
                username={"u/mock"}
                edited={true}
                style={"horizontal"}
            />
        </TestWrapper>,
        { wrapper: MemoryRouter },
    );
};

test("displays vertical without edited", () => {
    setup1();
    expect(screen.queryByText("Edited")).not.toBeInTheDocument();
});

test("displays horizontal with Edited", () => {
    setup2();
    expect(screen.getByText("Edited")).toBeInTheDocument();
});
