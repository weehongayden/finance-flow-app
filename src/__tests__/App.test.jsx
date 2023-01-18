import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import App from "../App";

describe("<App /> components", () => {
  test("should render correctly", () => {
    const wrapper = render(<App />);
    expect(wrapper).toBeTruthy();
    expect(screen.getByText(/Hello Home/i)).toBeInTheDocument();
  });

  test("should render about page correctly", async () => {
    const wrapper = render(<App />);
    expect(wrapper).toBeTruthy();

    const user = userEvent.setup();
    const about = screen.getByText(/about/i);
    await user.click(about);

    expect(screen.getByText(/Hello About/i)).toBeInTheDocument();
  });
});
