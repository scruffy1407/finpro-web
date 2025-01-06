"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Button } from "@/components/ui/button";
import {
	Bold,
	Italic,
	Underline as UnderlineIcon,
	Link as LinkIcon,
	AlignLeft,
	AlignCenter,
	AlignRight,
	Heading1,
	Heading2,
	List,
	ListOrdered,
	Quote,
	Highlighter,
	Undo,
	Redo,
} from "lucide-react";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";

interface MenuBarProps {
	editor: Editor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
	if (!editor) {
		return null;
	}

	const addLink = () => {
		const url = window.prompt("Enter URL");
		if (url) {
			editor.chain().focus().setLink({ href: url }).run();
		}
	};

	return (
		<div className="border-b border-border p-2 flex flex-wrap gap-1 bg-card">
			<Button
				variant="ghost"
				size="icon"
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={editor.isActive("bold") ? "bg-accent" : ""}
			>
				<Bold className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={editor.isActive("italic") ? "bg-accent" : ""}
			>
				<Italic className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				className={editor.isActive("underline") ? "bg-accent" : ""}
			>
				<UnderlineIcon className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={addLink}
				className={editor.isActive("link") ? "bg-accent" : ""}
			>
				<LinkIcon className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => editor.chain().focus().setTextAlign("left").run()}
				className={editor.isActive({ textAlign: "left" }) ? "bg-accent" : ""}
			>
				<AlignLeft className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => editor.chain().focus().setTextAlign("center").run()}
				className={editor.isActive({ textAlign: "center" }) ? "bg-accent" : ""}
			>
				<AlignCenter className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => editor.chain().focus().setTextAlign("right").run()}
				className={editor.isActive({ textAlign: "right" }) ? "bg-accent" : ""}
			>
				<AlignRight className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={editor.isActive("heading", { level: 1 }) ? "bg-accent" : ""}
			>
				<Heading1 className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={editor.isActive("heading", { level: 2 }) ? "bg-accent" : ""}
			>
				<Heading2 className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={editor.isActive("bulletList") ? "bg-accent" : ""}
			>
				<List className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={editor.isActive("orderedList") ? "bg-accent" : ""}
			>
				<ListOrdered className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={editor.isActive("blockquote") ? "bg-accent" : ""}
			>
				<Quote className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => editor.chain().focus().toggleHighlight().run()}
				className={editor.isActive("highlight") ? "bg-accent" : ""}
			>
				<Highlighter className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().undo()}
			>
				<Undo className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().redo()}
			>
				<Redo className="h-4 w-4" />
			</Button>
		</div>
	);
};

interface RichTextEditorProps {
	onUpdate?: (content: string) => void; // Add onUpdate as an optional prop
	defaultValue?: string;
}

export function RichTextEditor({
	onUpdate,
	defaultValue,
}: RichTextEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Highlight,
			Placeholder.configure({
				placeholder: "Write something amazing...",
			}),
			BulletList.configure({
				HTMLAttributes: {
					class: "my-custom-bullet-list", // Custom class for the bullet list
				},
			}), // Add this
			OrderedList.configure({
				HTMLAttributes: {
					class: "my-custom-ordered-list",
				},
			}),
			Blockquote.configure({
				HTMLAttributes: {
					class: "my-custom-blockquote", // Custom class for the blockquote
				},
			}),
		],
		content: defaultValue,
		editorProps: {
			attributes: {
				class:
					"prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4",
			},
		},
		// When the editor's content changes, call the onUpdate callback
		onUpdate({ editor }) {
			const content = editor.getHTML(); // or editor.getText() for plain text
			if (onUpdate) {
				onUpdate(content); // Call the prop function with the updated content
			}
		},
	});

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
				<MenuBar editor={editor} />
				<EditorContent editor={editor} />
			</div>
		</div>
	);
}
