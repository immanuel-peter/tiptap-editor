"use client";

import React, { useState } from "react";
import Image from "next/image";

import {
  useEditor,
  EditorContent,
  generateHTML,
  generateJSON,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { common, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import Typography from "@tiptap/extension-typography";

import { Tooltip, Input, Button, Divider } from "antd";

import {
  FaCode,
  FaLink,
  FaLinkSlash,
  FaImage,
  FaCamera,
  FaFileCode,
  FaCheck,
} from "react-icons/fa6";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineStrikethrough,
  AiOutlineHighlight,
} from "react-icons/ai";
import {
  TbClearFormatting,
  TbBlockquote,
  TbSubscript,
  TbSuperscript,
} from "react-icons/tb";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from "react-icons/lu";
import { HiOutlineListBullet } from "react-icons/hi2";
import { GoListOrdered } from "react-icons/go";
import { IoColorPalette } from "react-icons/io5";

const Tiptap = () => {
  const tiptapExtensions = [
    StarterKit.configure({
      codeBlock: false,
    }),
    Color,
    ListItem,
    TextStyle,
    Underline,
    CodeBlockLowlight.configure({
      lowlight: createLowlight(common),
      HTMLAttributes: {
        class: "bg-slate-300 p-2 rounded-md",
      },
    }),
    Highlight.configure({
      multicolor: true,
      HTMLAttributes: {
        class: "p-1 rounded-lg",
      },
    }),
    Subscript,
    Superscript,
    Link.configure({
      openOnClick: true,
    }),
    TiptapImage.configure({
      allowBase64: true,
    }),
    Typography,
  ];

  const editor = useEditor({
    extensions: tiptapExtensions,
    content: { "type": "doc", "content": [ { "type": "paragraph", "content": [ { "type": "text", "text": "You can streamline your process and potentially improve performance by using the following steps:" } ] }, { "type": "orderedList", "attrs": { "start": 1 }, "content": [ { "type": "listItem", "content": [ { "type": "paragraph", "content": [ { "type": "text", "text": "Chunking the Corpus: Instead of splitting the entire corpus into individual sentences, which can be computationally expensive, consider breaking it into larger chunks, such as paragraphs or a few sentences combined. This reduces the number of comparisons while still maintaining context." } ] } ] }, { "type": "listItem", "content": [ { "type": "paragraph", "content": [ { "type": "text", "text": "Efficient Similarity Computation: Use util.pytorch_cos_sim instead of util.cos_sim for faster computation." } ] } ] }, { "type": "listItem", "content": [ { "type": "paragraph", "content": [ { "type": "text", "text": "Batch Processing: Process your phrases and corpus chunks in batches to take advantage of parallel processing." } ] } ] }, { "type": "listItem", "content": [ { "type": "paragraph", "content": [ { "type": "text", "text": "Thresholding: Only consider top-N matches based on a similarity threshold to reduce the number of comparisons further." } ] } ] } ] }, { "type": "paragraph", "content": [ { "type": "text", "text": "Here's a modified version of your code that incorporates these suggestions:" } ] }, { "type": "codeBlock", "attrs": { "language": "python" }, "content": [ { "type": "text", "text": "from sentence_transformers import SentenceTransformer, util\nimport pandas as pd\n\n# Define your phrases and corpus\nphrase_list = ['Gregor Samsa', 'in his bed into', 'horrible creature'] # Example\nvery_long_string = 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked...' # Example\n\n# Convert the long string into a list of chunks (e.g., paragraphs)\nstring_to_chunk_list = very_long_string.split(\"\") # Or another chunking method\n\n# Load the model\nmodel = SentenceTransformer('all-mpnet-base-v2')\n\n# Encode phrases and chunks\nphrase_embeddings = model.encode(phrase_list, convert_to_tensor=True)\nchunk_embeddings = model.encode(string_to_chunk_list, convert_to_tensor=True)\n\n# Initialize the similarity dictionary\nsimilarity_dict = {}\n\n# Compute similarities and find matches\nfor i, phrase in enumerate(phrase_list):\n similarities = util.pytorch_cos_sim(phrase_embeddings[i], chunk_embeddings)\n matches = [string_to_chunk_list[j] for j, sim in enumerate(similarities[0]) if sim > 0.65] # Adjust threshold as needed\n similarity_dict[phrase] = matches\n\n# Save the results to a CSV file\nsimilarity_df = pd.DataFrame(list(similarity_dict.items()), columns=['Phrase', 'Matches'])\nsimilarity_df.to_csv('similarity_dict.csv', index=False)\n\nprint(similarity_dict)" } ] }, { "type": "heading", "attrs": { "level": 3 }, "content": [ { "type": "text", "text": "Additional Tips:" } ] }, { "type": "bulletList", "content": [ { "type": "listItem", "content": [ { "type": "paragraph", "content": [ { "type": "text", "text": "Adjust the Chunk Size: Experiment with different chunk sizes to find a balance between context retention and computational efficiency." } ] } ] }, { "type": "listItem", "content": [ { "type": "paragraph", "content": [ { "type": "text", "text": "Similarity Threshold: Adjust the similarity threshold (0.65 in the example) based on your specific needs for precision and recall." } ] } ] }, { "type": "listItem", "content": [ { "type": "paragraph", "content": [ { "type": "text", "text": "Parallel Processing: If your setup supports it, consider using parallel processing libraries such as multiprocessing to further speed up the computation." } ] } ] } ] }, { "type": "heading", "attrs": { "level": 3 }, "content": [ { "type": "text", "text": "Handling Redundant Matches:" } ] }, { "type": "paragraph", "content": [ { "type": "text", "text": "To address the concern about redundant matches within the same sentence, you can:" } ] }, { "type": "bulletList", "content": [ { "type": "listItem", "content": [ { "type": "paragraph", "content": [ { "type": "text", "text": "Deduplicate Matches: Use a set to store matches and ensure uniqueness." } ] } ] }, { "type": "listItem", "content": [ { "type": "paragraph", "content": [ { "type": "text", "text": "Fine-tune Matching Logic: Apply additional logic to filter out sub-phrases from the same sentence if they are not required." } ] } ] } ] }, { "type": "paragraph", "content": [ { "type": "text", "text": "By implementing these optimizations, you should be able to improve both the efficiency and accuracy of your phrase-matching process within a large corpus." } ] } ] }
  });

  if (!editor) {
    return null;
  }

  editor.setOptions({
    editorProps: {
      attributes: {
        class:
          "w-full max-w-5xl min-h-64 p-2 text-sm border-2 border-solid border-black rounded-b-md",
      },
    },
  });

  const ColorInput = () => {
    return (
      <div className="flex flex-row items-center justify-center gap-2">
        <div
          onClick={() => editor.chain().focus().setColor("#000").run()}
          className="flex items-center justify-center h-4 w-4 rounded-full text-white bg-black cursor-pointer"
        >
          {editor.isActive("textStyle", { color: "#000" }) ? (
            <FaCheck className="p-1" />
          ) : null}
        </div>
        <div
          onClick={() => editor.chain().focus().setColor("#ef4444").run()}
          className="flex items-center justify-center h-4 w-4 rounded-full text-white bg-red-600 cursor-pointer"
        >
          {editor.isActive("textStyle", { color: "#ef4444" }) ? (
            <FaCheck className="p-1" />
          ) : null}
        </div>
        <div
          onClick={() => editor.chain().focus().setColor("#ea580c").run()}
          className="flex items-center justify-center h-4 w-4 rounded-full text-white bg-orange-600 cursor-pointer"
        >
          {editor.isActive("textStyle", { color: "#ea580c" }) ? (
            <FaCheck className="p-1" />
          ) : null}
        </div>
        <div
          onClick={() => editor.chain().focus().setColor("#eab308").run()}
          className="flex items-center justify-center h-4 w-4 rounded-full text-white bg-yellow-500 cursor-pointer"
        >
          {editor.isActive("textStyle", { color: "#eab308" }) ? (
            <FaCheck className="p-1" />
          ) : null}
        </div>
        <div
          onClick={() => editor.chain().focus().setColor("#16a34a").run()}
          className="flex items-center justify-center h-4 w-4 rounded-full text-white bg-green-600 cursor-pointer"
        >
          {editor.isActive("textStyle", { color: "#16a34a" }) ? (
            <FaCheck className="p-1" />
          ) : null}
        </div>
        <div
          onClick={() => editor.chain().focus().setColor("#2563eb").run()}
          className="flex items-center justify-center h-4 w-4 rounded-full text-white bg-blue-600 cursor-pointer"
        >
          {editor.isActive("textStyle", { color: "#2563eb" }) ? (
            <FaCheck className="p-1" />
          ) : null}
        </div>
        <div
          onClick={() => editor.chain().focus().setColor("#8b5cf6").run()}
          className="flex items-center justify-center h-4 w-4 rounded-full text-white bg-purple-500 cursor-pointer"
        >
          {editor.isActive("textStyle", { color: "#8b5cf6" }) ? (
            <FaCheck className="p-1" />
          ) : null}
        </div>
      </div>
    );
  };

  const HighlightInput = () => {
    return (
      <div className="flex flex-row items-center justify-center gap-2">
        <button
          onClick={() => editor.chain().focus().unsetHighlight().run()}
          className="flex items-center justify-center h-4 w-4 rounded-full text-black bg-white cursor-pointer"
        >
          {!editor.isActive("highlight") ? <FaCheck className="p-1" /> : null}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#ffcc00" }).run()
          }
          className="flex items-center justify-center h-4 w-4 rounded-full text-black bg-[#ffcc00] cursor-pointer"
        >
          {editor.isActive("highlight", { color: "#ffcc00" }) ? (
            <FaCheck className="p-1" />
          ) : null}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#ef4444" }).run()
          }
          className="flex items-center justify-center h-4 w-4 rounded-full text-black bg-red-600 cursor-pointer"
        >
          {editor.isActive("highlight", { color: "#ef4444" }) ? (
            <FaCheck className="p-1" />
          ) : null}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#3b82f6" }).run()
          }
          className="flex items-center justify-center h-4 w-4 rounded-full text-black bg-blue-500 cursor-pointer"
        >
          {editor.isActive("highlight", { color: "#3b82f6" }) ? (
            <FaCheck className="p-1" />
          ) : null}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#16a34a" }).run()
          }
          className="flex items-center justify-center h-4 w-4 rounded-full text-black bg-green-600 cursor-pointer"
        >
          {editor.isActive("highlight", { color: "#16a34a" }) ? (
            <FaCheck className="p-1" />
          ) : null}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#ea580c" }).run()
          }
          className="flex items-center justify-center h-4 w-4 rounded-full text-black bg-orange-600 cursor-pointer"
        >
          {editor.isActive("highlight", { color: "#ea580c" }) ? (
            <FaCheck className="p-1" />
          ) : null}
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#9333ea" }).run()
          }
          className="flex items-center justify-center h-4 w-4 rounded-full text-black bg-purple-600 cursor-pointer"
        >
          {editor.isActive("highlight", { color: "#9333ea" }) ? (
            <FaCheck className="p-1" />
          ) : null}
        </button>
      </div>
    );
  };

  const LinkInput = () => {
    const [link, setLink] = useState(
      editor.getAttributes("link").href?.replace(/^https?:\/\//, "") ?? ""
    );

    const onLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLink(e.target.value);
    };

    const handleSetLink = () => {
      // cancelled
      if (link === null) {
        return;
      }

      // empty
      if (link === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: `https://${link}` })
        .run();
    };

    return (
      <>
        <Input
          autoFocus
          addonBefore="https://"
          placeholder="www.github.com"
          value={link}
          onChange={onLinkChange}
          className="mb-2 border border-solid border-slate-500 rounded-md"
        />
        <Button
          onClick={handleSetLink}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Set Link
        </Button>
      </>
    );
  };

  const ImageInput = () => {
    const [image, setImage] = useState<File | null>(null);
    const [imageLink, setImageLink] = useState<string>("");

    const onImageLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setImageLink(e.target.value);
    };

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        setImage(img);
      }
    };

    const addImageLink = () => {
      editor.chain().focus().setImage({ src: imageLink }).run();
    };

    const addImage = () => {
      if (image === null) {
        return;
      }

      if (image instanceof File) {
        editor
          .chain()
          .focus()
          .setImage({ src: URL.createObjectURL(image) })
          .run();
      }
    };

    return (
      <>
        {image === null ? (
          <div>
            <div className="text-center p-6 border border-dashed border-slate-700 rounded-lg">
              <FaCamera
                className="mx-auto mb-1 h-12 w-12 text-black"
                aria-hidden="true"
              />
              <div className="flex items-center text-xs leading-6 text-black">
                <label
                  htmlFor="file-upload"
                  className="px-1 relative cursor-pointer rounded-full bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    value={image ? URL.createObjectURL(image) : ""}
                    onChange={onImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
            <Divider className="my-1">or</Divider>
            <Input
              autoFocus
              variant="filled"
              placeholder="link to image file"
              value={imageLink}
              onChange={onImageLinkChange}
              className="border border-solid border-slate-500 rounded-md"
            />
            <Button
              onClick={addImageLink}
              className="mt-2 w-full bg-blue-500 hover:bg-blue-600"
            >
              Add Image
            </Button>
          </div>
        ) : image instanceof File ? (
          <Image
            src={image ? URL.createObjectURL(image) : ""}
            width={424}
            height={172}
            alt="Picture"
            className="w-full h-full mb-2"
          />
        ) : (
          <Image
            src={image}
            width={424}
            height={172}
            alt="Picture"
            className="w-full h-full mb-2"
          />
        )}
        {image instanceof File && (
          <Button
            onClick={addImage}
            className="mt-2 w-full bg-blue-500 hover:bg-blue-600"
          >
            Add Image
          </Button>
        )}
      </>
    );
  };

  const handleBoldClick = () => editor.chain().focus().toggleBold().run();
  const handleItalicClick = () => editor.chain().focus().toggleItalic().run();
  const handleUnderlineClick = () =>
    editor.chain().focus().toggleUnderline().run();
  const handleStrikethroughClick = () =>
    editor.chain().focus().toggleStrike().run();
  const handleClearFormatting = () =>
    editor.chain().focus().unsetAllMarks().run();
  const handleCodeClick = () => editor.chain().focus().toggleCode().run();
  const handleCodeblockClick = () =>
    editor.chain().focus().toggleCodeBlock().run();
  const handleBlockquoteClick = () =>
    editor.chain().focus().toggleBlockquote().run();

  return (
    <div className="max-w-5xl">
      <h1 className="font-bold mb-4 text-blue-600">Tiptap Editor</h1>
      <div className="w-fit items-center justify-center">
        <div className="flex flex-row items-center justify-start">
          <div
            onClick={handleBoldClick}
            className={`p-1 border-b-0 border-t-2 border-l-2 border border-solid border-black rounded-tl-md hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("bold") ? "text-blue-700 bg-blue-200" : null
            }`}
          >
            <AiOutlineBold />
          </div>
          <div
            onClick={handleItalicClick}
            className={`p-1 border-b-0 border-t-2 border border-solid border-black hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("italic") ? "text-blue-700 bg-blue-200" : null
            }`}
          >
            <AiOutlineItalic />
          </div>
          <div
            onClick={handleUnderlineClick}
            className={`p-1 border-b-0 border-t-2 border border-solid border-black hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("underline") ? "text-blue-700 bg-blue-200" : null
            }`}
          >
            <AiOutlineUnderline />
          </div>
          <div
            onClick={handleStrikethroughClick}
            className={`p-1 border-b-0 border-t-2 border border-solid border-black hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("strike") ? "text-blue-700 bg-blue-200" : null
            }`}
          >
            <AiOutlineStrikethrough />
          </div>
          <div
            onClick={handleClearFormatting}
            className="p-1 border-b-0 border-t-2 border border-solid border-black hover:text-blue-700 hover:bg-blue-200 cursor-pointer"
          >
            <TbClearFormatting />
          </div>
          <Tooltip
            title={() => <HighlightInput />}
            placement="bottom"
            color="#cbd5e1"
            trigger="click"
          >
            <div
              className={`p-1 border-b-0 border-t-2 border border-solid border-black hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
                editor.isActive("highlight")
                  ? "text-blue-700 bg-blue-200"
                  : null
              }`}
            >
              <AiOutlineHighlight />
            </div>
          </Tooltip>
          <Tooltip
            title={() => <ColorInput />}
            placement="bottom"
            color="#cbd5e1"
            trigger="click"
          >
            <div
              onClick={() => {}}
              className={`p-1 border-b-0 border-t-2 border border-solid border-black hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
                editor.isActive("color") ? "text-blue-700 bg-blue-200" : null
              }`}
            >
              <IoColorPalette />
            </div>
          </Tooltip>
          <div
            onClick={handleCodeClick}
            className={`p-1 border-b-0 border-t-2 border border-solid border-black hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("code") ? "text-blue-700 bg-blue-200" : null
            }`}
          >
            <FaCode />
          </div>
          <div
            onClick={handleCodeblockClick}
            className={`p-1 border-b-0 border-t-2 border-r-2 border border-solid border-black rounded-tr-md hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("codeBlock") ? "text-blue-700 bg-blue-200" : null
            }`}
          >
            <FaFileCode />
          </div>

          <div
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`ml-2 p-1 border-b-0 border-t-2 border-l-2 border border-solid border-black rounded-tl-md hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("heading", { level: 1 })
                ? "text-blue-700 bg-blue-200"
                : null
            }`}
          >
            <LuHeading1 />
          </div>
          <div
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-1 border-b-0 border-t-2 border border-solid border-black hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("heading", { level: 2 })
                ? "text-blue-700 bg-blue-200"
                : null
            }`}
          >
            <LuHeading2 />
          </div>
          <div
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`p-1 border-b-0 border-t-2 border border-solid border-black hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("heading", { level: 3 })
                ? "text-blue-700 bg-blue-200"
                : null
            }`}
          >
            <LuHeading3 />
          </div>
          <div
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={`p-1 border-b-0 border-t-2 border border-solid border-black hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("heading", { level: 4 })
                ? "text-blue-700 bg-blue-200"
                : null
            }`}
          >
            <LuHeading4 />
          </div>
          <div
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={`p-1 border-b-0 border-t-2 border border-solid border-black hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("heading", { level: 5 })
                ? "text-blue-700 bg-blue-200"
                : null
            }`}
          >
            <LuHeading5 />
          </div>
          <div
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={`p-1 border-b-0 border-t-2 border-r-2 border border-solid border-black rounded-tr-md hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("heading", { level: 6 })
                ? "text-blue-700 bg-blue-200"
                : null
            }`}
          >
            <LuHeading6 />
          </div>

          <div
            onClick={handleBlockquoteClick}
            className={`ml-2 p-1 border-b-0 border-t-2 border-l-2 border border-solid border-black rounded-tl-md hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("blockquote") ? "text-blue-700 bg-blue-200" : null
            }`}
          >
            <TbBlockquote />
          </div>
          <div
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1 border-b-0 border-t-2 border border-solid border-black hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("bulletList") ? "text-blue-700 bg-blue-200" : null
            }`}
          >
            <HiOutlineListBullet />
          </div>
          <div
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1 border-b-0 border-t-2 border border-solid border-black hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("orderedList")
                ? "text-blue-700 bg-blue-200"
                : null
            }`}
          >
            <GoListOrdered />
          </div>
          <div
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            className={`p-1 border-b-0 border-t-2 border border-solid border-black hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("subscript") ? "text-blue-700 bg-blue-200" : null
            }`}
          >
            <TbSubscript />
          </div>
          <div
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            className={`p-1 border-b-0 border-t-2 border-r-2 border border-solid border-black rounded-tr-md hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
              editor.isActive("superscript")
                ? "text-blue-700 bg-blue-200"
                : null
            }`}
          >
            <TbSuperscript />
          </div>

          <Tooltip
            title={() => <LinkInput />}
            placement="bottom"
            color="#cbd5e1"
            trigger="click"
          >
            <div
              className={`ml-2 p-1 border-b-0 border-t-2 border-l-2 border border-solid border-black rounded-tl-md hover:text-blue-700 hover:bg-blue-200 cursor-pointer ${
                editor.isActive("link") ? "text-blue-700 bg-blue-200" : null
              }`}
            >
              <FaLink />
            </div>
          </Tooltip>
          <div
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="p-1 border-b-0 border-t-2 border-r-2 border border-solid border-black rounded-tr-md hover:text-blue-700 hover:bg-blue-200 cursor-pointer"
          >
            <FaLinkSlash />
          </div>

          <Tooltip
            title={() => <ImageInput />}
            placement="bottomLeft"
            color="#cbd5e1"
            trigger="click"
          >
            <div className="ml-2 p-1 border-b-0 border-t-2 border-l-2 border-r-2 border border-solid border-black rounded-tl-md rounded-tr-md hover:text-blue-700 hover:bg-blue-200 cursor-pointer">
              <FaImage />
            </div>
          </Tooltip>
        </div>
        <EditorContent editor={editor} />
      </div>
      <div className="mt-10 flex items-center justify-center">
        {JSON.stringify(
          generateJSON(editor.getHTML(), tiptapExtensions),
          null,
          2
        )}
        {/* {editor.getHTML()} */}
        {/* {editor.getText()} */}
      </div>
    </div>
  );
};

export default Tiptap;
