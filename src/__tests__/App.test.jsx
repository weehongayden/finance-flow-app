import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import App from "../App";

describe("<App /> components", () => {
  test("should render correctly", () => {
    const wrapper = render(<App />);
    expect(wrapper).toBeTruthy();
    expect(screen.getByText(/Hello Home/i)).toBeInTheDocument();
  });
});
