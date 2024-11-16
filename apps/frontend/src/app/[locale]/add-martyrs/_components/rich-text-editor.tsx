"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface RichTextEditorProps {
  content: any;
  onChange: (content: any) => void;
  fontSize?: "small" | "medium" | "large";
  lineSpacing?: "tight" | "normal" | "loose";
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  fontSize = "medium",
  lineSpacing = "tight",
}) => {
  const [linkUrl, setLinkUrl] = useState("");
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-800 underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: `prose max-w-none min-h-64 focus:outline-none font-size-${fontSize}`,
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      editor.setOptions({
        editorProps: {
          attributes: {
            class: `prose max-w-none focus:outline-none font-size-${fontSize} line-spacing-${lineSpacing}`,
          },
        },
      });
    }
  }, [editor, fontSize, lineSpacing]);

  const setLink = useCallback(() => {
    if (linkUrl && editor) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setIsLinkPopoverOpen(false);
    }
  }, [editor, linkUrl]);

  const showLinkPopover = useCallback(() => {
    if (editor) {
      const { from, to } = editor.state.selection;
      const start = editor.view.coordsAtPos(from);
      const end = editor.view.coordsAtPos(to);

      // Calculate the position for the popover
      const left = (start.left + end.left) / 2;
      const top = start.top;

      setPopoverPosition({ top, left });
      setIsLinkPopoverOpen(true);
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const getCurrentTextStyle = () => {
    if (editor.isActive("heading", { level: 1 })) return "heading-1";
    if (editor.isActive("heading", { level: 2 })) return "heading-2";
    if (editor.isActive("heading", { level: 3 })) return "heading-3";
    return "paragraph";
  };

  return (
    <div className="rounded-md border p-2">
      <div className="mb-2 flex flex-wrap gap-2 border-b py-1">
        <Toggle
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
        >
          <Bold size={"18"} />
        </Toggle>
        <Toggle
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Toggle italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Toggle underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Toggle strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
        <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsLinkPopoverOpen(true)}
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 rounded-lg p-2">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="Enter link URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <Button onClick={setLink}>Apply</Button>
            </div>
          </PopoverContent>
        </Popover>
        <Toggle
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
          aria-label="Align left"
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          aria-label="Align center"
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
          aria-label="Align right"
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          aria-label="Toggle bullet list"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          aria-label="Toggle ordered list"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        <Select
          value={getCurrentTextStyle()}
          onValueChange={(value) => {
            if (value === "paragraph") {
              editor.chain().focus().setParagraph().run();
            } else if (value.startsWith("heading-")) {
              // const level = parseInt(value.split("-")[1]);
              const level: 1 | 2 | 3 = parseInt(value.split("-")[1]) as
                | 1
                | 2
                | 3;
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Text style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paragraph">Normal</SelectItem>
            <SelectItem value="heading-1">
              <Heading1 className="mr-2 inline h-4 w-4" />
              Heading 1
            </SelectItem>
            <SelectItem value="heading-2">
              <Heading2 className="mr-2 inline h-4 w-4" />
              Heading 2
            </SelectItem>
            <SelectItem value="heading-3">
              <Heading3 className="mr-2 inline h-4 w-4" />
              Heading 3
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <EditorContent editor={editor} />

      {/*<Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>*/}
      {/*  <PopoverContent*/}
      {/*    className="w-80 rounded-xl"*/}
      {/*    style={{*/}
      {/*      position: "absolute",*/}
      {/*      top: `${popoverPosition.top}px`,*/}
      {/*      left: `${popoverPosition.left}px`,*/}
      {/*      transform: "translate(-50%, -100%)",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <div className="flex gap-2">*/}
      {/*      <Input*/}
      {/*        type="url"*/}
      {/*        placeholder="Enter link URL"*/}
      {/*        value={linkUrl}*/}
      {/*        onChange={(e) => setLinkUrl(e.target.value)}*/}
      {/*      />*/}
      {/*      <Button onClick={setLink}>Apply</Button>*/}
      {/*    </div>*/}
      {/*  </PopoverContent>*/}
      {/*</Popover>*/}
    </div>
  );
};

export default RichTextEditor;
