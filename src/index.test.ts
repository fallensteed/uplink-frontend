import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("Application root", () => {
    it("should render without crashing", () => {
        // eslint-disable-next-line no-console
        reportWebVitals(console.log);
        const div = document.createElement("div");
        div.id = "root";
        document.body.appendChild(div);
        require("./index.tsx");
        expect(ReactDOM.render).toHaveBeenCalled();
    });
});
