import React from "react";
import { compiler as mdCompiler } from "markdown-to-jsx";
import TestRenderer from "react-test-renderer";
import { Heading } from "../Heading";
import { Toc } from "./Toc";

const markdown = `# Header 1
Lorem Ipsum

## Header 1.1

### Header 1.1.1

### Header 1.1.2

## Header 1.2

#### Subtitle without direct parent

test

# Header 2

hello`;

const options = {
  overrides: {
    h1: {
      component: Heading,
      props: { variant: "h1" }
    },
    h2: {
      component: Heading,
      props: { variant: "h2" }
    },
    h3: {
      component: Heading,
      props: { variant: "h3" }
    },
    h4: {
      component: Heading,
      props: { variant: "h4" }
    }
  }
};

describe("Toc", () => {
  const content = mdCompiler(markdown, options);

  it("renders correctly", () => {
    const tree = TestRenderer.create(<Toc content={content.props.children} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
