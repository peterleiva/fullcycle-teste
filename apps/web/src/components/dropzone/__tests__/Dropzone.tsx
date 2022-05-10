import { render } from "@testing-library/react";
import Dropzone from "../Dropzone";

describe("<Dropzone />", () => {
  test("render Dropzone", () => {
    const content = "drag files in here";
    const { container } = render(<Dropzone renderContent={<p>{content}</p>} />);

    expect(container).toHaveTextContent(content);
  });
});
