import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AboutUs from "./AboutUs";

describe("AboutUs Component", () => {
  test("renders component with correct content and links", async () => {
    render(<AboutUs />);

    // Check if each member's name is rendered as a link
    const memberLinks = screen.getAllByRole("link");
    expect(memberLinks).toHaveLength(6); // Assuming there are 6 members

    // Test if each name is matched with the correct links
    const amnaTasneemLink = screen.getByText("Amna Tasneem").closest("a");
    expect(amnaTasneemLink.getAttribute("href")).toBe(
      "https://www.linkedin.com/in/amna-tasneem/",
    );

    const julianRochaLink = screen.getByText("Julian Rocha").closest("a");
    expect(julianRochaLink.getAttribute("href")).toBe(
      "https://www.linkedin.com/in/rochajulian/",
    );

    const mattBilinskiLink = screen.getByText("Matt Bilinski").closest("a");
    expect(mattBilinskiLink.getAttribute("href")).toBe(
      "https://www.linkedin.com/in/matt-bilinski-49362b295/",
    );

    const mateuszObrochtaLink = screen
      .getByText("Mateusz Obrochta")
      .closest("a");
    expect(mateuszObrochtaLink.getAttribute("href")).toBe(
      "https://www.linkedin.com/in/mateusz-obrochta-7281722b3/",
    );

    const ivanSanchezLink = screen.getByText("Ivan Sanchez").closest("a");
    expect(ivanSanchezLink.getAttribute("href")).toBe(
      "https://www.linkedin.com/in/ivansanchez-/",
    );

    const sixthMemberLink = screen.getByText("Member 6").closest("a");
    expect(sixthMemberLink.getAttribute("href")).toBe(
      "https://www.linkedin.com/in/your-user-name",
    );
  });
});
