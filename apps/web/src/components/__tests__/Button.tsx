import { render } from "@testing-library/react";
import Button from "../Button";

describe("<Button />", () => {
  test("render button", () => {
    const label = "primary";
    const { container } = render(<Button>{label}</Button>);

    expect(container).toHaveTextContent(label);
  });
});
