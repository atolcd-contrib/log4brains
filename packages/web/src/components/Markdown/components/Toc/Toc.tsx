import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Link as MuiLink } from "@material-ui/core";
import clsx from "clsx";
import {
  Toc as TocModel,
  TocBuilder as TocModelBuilder
} from "../../../../lib/toc-utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > $tocUl": {
        // First <ul>
        padding: 0
      }
    },
    tocUl: {
      listStyleType: "none",
      paddingLeft: "1rem",
      margin: 0
    }
  })
);

function variantToLevel(variant: string): number {
  return parseInt(variant.replace("h", ""), 10);
}

function buildTocModelFromContent(
  content: JSX.Element[],
  levelStart = 1
): TocModel {
  const builder = new TocModelBuilder();
  content.forEach((element) => {
    if (typeof element.type === "function" && element.type.name === "Heading") {
      builder.addSection(
        variantToLevel(element.props.variant) - levelStart + 1,
        element.props.children,
        element.props.id
      );
    }
  });

  return builder.getToc();
}

type TocSectionProps = {
  className?: string;
  children: React.ReactNode;
  title: string;
  id: string;
};

function TocSection({ title, id, children }: TocSectionProps) {
  const classes = useStyles();

  return (
    <ul className={classes.tocUl}>
      <li>
        <MuiLink href={`#${id}`}>{title}</MuiLink>
        {children}
      </li>
    </ul>
  );
}

type TocProps = {
  className?: string;
  content: JSX.Element[];
  levelStart?: number;
};

export function Toc({ className, content, levelStart = 1 }: TocProps) {
  const classes = useStyles();

  const model = buildTocModelFromContent(content, levelStart);

  return (
    <div className={clsx(classes.root, className)}>
      {model.render((title: string, id: string, children: JSX.Element[]) => (
        <TocSection title={title} id={id}>
          {children}
        </TocSection>
      ))}
    </div>
  );
}