import React, { memo } from "react";
import { createReactEditorJS } from "react-editor-js";
// @ts-ignore
import Image from "@editorjs/image";
import { EDITOR_JS_TOOLS } from "../utils/editorTools";
import { OutputData } from "@editorjs/editorjs";
import { uploadImage, uploadImageByUrl } from "../api/posts";

const EditorJs = createReactEditorJS();

export interface EditorCore {
  destroy(): Promise<void>;

  clear(): Promise<void>;

  save(): Promise<OutputData>;

  render(data: OutputData): Promise<void>;
}

interface EditorProps {
  onInitialize: (instance: EditorCore) => void;
  defaultValue?: OutputData;
  // data?: {
  //   time: number;
  //   blocks: any[];
  // };
}

const Editor: React.FC<EditorProps> = ({ onInitialize, defaultValue }) => {
  return (
    <EditorJs
      onInitialize={onInitialize}
      tools={{
        ...EDITOR_JS_TOOLS,
        image: {
          class: Image,
          config: {
            uploader: {
              uploadByFile(file: File) {
                return uploadImage(file).then((rs) => rs);
              },

              uploadByUrl(url: string) {
                return uploadImageByUrl(url).then((rs) => rs);
              },
            },
          },
        },
      }}
      holder="editor"
      defaultValue={
        defaultValue
          ? defaultValue
          : {
              time: 1556098174501,
              blocks: [
                {
                  type: "header",
                  data: {
                    text: "Header",
                    level: 1,
                  },
                },
                {
                  type: "paragraph",
                  data: {
                    text: "Some text.",
                  },
                },
              ],
            }
      }
    >
      <div
        id="editor"
        className="p-5 bg-white rounded-lg shadow-lg dark:bg-gray-700 max-w-[90ch] w-full"
      />
    </EditorJs>
  );
};

export default memo(Editor);
