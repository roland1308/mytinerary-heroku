import React from "react";
import { shallow } from "enzyme";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("NavBar render senza errori", () => {
    // test
    const component = shallow(<NavBar />);
  });
});
