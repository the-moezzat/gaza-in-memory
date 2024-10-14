"use client";
import { Martyr } from "@/app/[locale]/_types/Mayrter";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";

interface StorySectionProps {
  martyr: Martyr;
}

export default function StorySection({ martyr }: StorySectionProps) {
  const { story } = martyr;

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    editable: false,
    immediatelyRender: false,
    content: story as Content,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
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
        defaultAlignment: "left",
        alignments: ["left", "center", "right"],
      }),
    ],
    editorProps: {
      attributes: {
        class: `prose max-w-none min-h-64 focus:outline-none`,
      },
    },
  });

  if (editor) {
    editor.setOptions({
      editorProps: {
        attributes: {
          class: `prose max-w-none min-h-64 focus:outline-none`,
        },
        transformPastedHTML: (html) => {
          // Transform pasted HTML here if needed
          return html;
        },
      },
    });
  }

  return (
    <div className="h-96 overflow-auto rounded-lg border p-4">
      <EditorContent editor={editor} className="[&_.ProseMirror]:!p-0" />
    </div>
  );
}
