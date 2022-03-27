import { OutputBlockData, OutputData } from "@editorjs/editorjs";
import React from "react";
import Checklist from "./components/Checklist";
import Code from "./components/Code";
import Delimiter from "./components/Delimiter";
import Heading from "./components/Heading";
import List from "./components/List";
import Paragraph from "./components/Paragraph";
import PostImage from "./components/PostImage";
import Quote from "./components/Quote";
import Table from "./components/Table";
import Warning from "./components/Warning";

const contentParser = (content: OutputData) => {
  return content.blocks.map(getComponent);
};

const getComponent = (block: OutputBlockData<string, any>) => {
  switch (block.type) {
    case "header":
      return (
        <Heading
          key={block.id}
          level={block.data.level}
          text={block.data.text}
        />
      );
    case "paragraph":
      return <Paragraph key={block.id} text={block.data.text} />;

    case "list":
      return (
        <List
          key={block.id}
          style={block.data.style}
          items={block.data.items}
        />
      );

    case "image":
      return (
        <PostImage
          key={block.id}
          data={block.data.file}
          caption={block.data.caption}
          withBackground={block.data.withBackground}
          withBorder={block.data.withBorder}
        />
      );

    case "table":
      return <Table key={block.id} content={block.data.content} />;

    case "warning":
      return (
        <Warning
          key={block.id}
          title={block.data.title}
          message={block.data.message}
        />
      );

    case "code":
      return <Code key={block.id} code={block.data.code} />;

    case "checklist":
      return <Checklist key={block.id} items={block.data.items} />;

    case "quote":
      return (
        <Quote
          key={block.id}
          caption={block.data.caption}
          text={block.data.text}
        />
      );

    case "delimiter":
      return <Delimiter key={block.id} />;

    default:
      return <div key={Math.random()} />;
  }
};

export default contentParser;
