import { render, screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
import Modal from "../Modal";

describe("<Modal />", () => {
  const title = "Modal Title";
  const body = "Modal Body";

  test("renders Modal", () => {
    const { container } = render(<Modal title={title}>{body}</Modal>);

    expect(container).toHaveTextContent(title);
    expect(container).toHaveTextContent(body);
  });

  test("minimize Modal", () => {
    const { container } = render(<Modal title={title}>{body}</Modal>);

    const closeBtn = screen.getByRole(/button/);
    fireEvent.click(closeBtn);

    expect(container).not.toHaveTextContent(body);
  });

  test("minize only hide modal body", () => {
    const { container } = render(<Modal title={title}>{body}</Modal>);

    const closeBtn = screen.getByRole(/button/);
    fireEvent.click(closeBtn);

    expect(container).toHaveTextContent(title);
  });
});
