import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, vi } from "vitest";

import Layout from "../Layout";

window.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe("<Layout />", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  });

  test("should have the sidebar open by default", () => {
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar").firstChild).toHaveStyle({
      display: "block",
    });
  });

  test("should toggle the sidebar in smaller screen size", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 400,
    });

    window.dispatchEvent(new Event("resize"));

    // The additional DOM will not display when the sidebar close
    expect(screen.getByTestId("sidebar").firstChild).not.toHaveStyle({
      display: "none",
    });
  });

  test("should close sidebar in smaller screen when close button is clicked", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 400,
    });

    window.dispatchEvent(new Event("resize"));

    const user = userEvent.setup();
    const openButton = screen.getByTestId("bars3-open");
    await user.click(openButton);

    // The additional DOM will display when the hamburger button is clicked
    expect(screen.getByTestId("sidebar").firstChild).toHaveStyle({
      display: "none",
    });

    const closeButton = screen.getByTestId("bars3-close");
    await user.click(closeButton);

    // The additional DOM will disappear when the close button is clicked
    expect(screen.getByTestId("sidebar").firstChild).not.toHaveStyle({
      display: "none",
    });
  });
});
