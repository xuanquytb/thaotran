import { Quill } from "react-quill";

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
// const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = ["Ubuntu", "Raleway", "Roboto"];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: Font.whitelist }],
        ["bold", "italic", "underline", "strike", "link", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["image"],
        ["blockquote", "code-block"],

        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ],
};

// Formats objects for setting up the Quill editor
export const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "font",
    "background",
    "script",
];

// Quill Toolbar component
