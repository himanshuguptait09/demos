// import React, { useState, useRef, memo } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Quill theme
// var localCache = function (params) {
//     var cache = "";
//     return function (data) {
//         if (data) {
//             cache = data;
//             return data;
//         }
//         else return cache
//     }
// }
// const cacheSetter = localCache();
// const TextEditor = ({ onChange, value }) => {
//     const quillRef = useRef(null); // Ref to access the Quill instance
//     let [editorContent, setEditorContent] = useState("");

//     // Handle image upload
//     const imageHandler = () => {
//         const input = document.createElement('input');
//         input.setAttribute('type', 'file');
//         input.setAttribute('accept', 'image/*');
//         input.click();

//         input.onchange = async () => {
//             const file = input.files[0];
//             const reader = new FileReader();
//             reader.onload = () => {
//                 const base64Image = reader.result;
//                 const editor = quillRef.current.getEditor();
//                 const range = editor.getSelection();

//                 // Ensure the range is valid before inserting the image
//                 if (range && range.index !== null) {
//                     editor.insertEmbed(range.index, 'image', base64Image);
//                 }
//             };
//             reader.readAsDataURL(file);
//         };
//     };

//     // Quill modules with custom toolbar including image upload
//     const modules = {
//         toolbar: {
//             container: [
//                 [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
//                 [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//                 ['bold', 'italic', 'underline', 'strike'],
//                 [{ 'color': [] }, { 'background': [] }],
//                 ['link', 'image'], // Image button
//             ],
//             handlers: {
//                 image: imageHandler,
//             }
//         }
//     };





//     return (
//         <ReactQuill
//             ref={quillRef}
//             value={editorContent}
//             onChange={(value) => {
//                 // setEditorContent(value)
//                 cacheSetter(value)
//                 onChange(editorContent) // Call the parent's onChange handler with the updated content
//             }}
//             modules={modules}
//             onBlur={() => {
//                 onChange(cacheSetter())
//             }}
//             theme="snow"
//             placeholder="Write something here..."
//         />
//     );
// };


// function SmartTextEditor(params) {
//     return (
//         <TextEditor
//             onChange={(e) => { params?.onChange(e) }}
//             value={params.value}
//         />
//     )

// }

// export default memo(SmartTextEditor);



import { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

class SmartTextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { editorHtml: "" };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(html) {
        this.setState({ editorHtml: html });
        this.props.onChange(html);
    }

        componentDidMount() {
            if (this.props?.value) {
                this.setState({ editorHtml: this.props.value });
            }
        }

    render() {
        return (
            <ReactQuill
                theme={this.state.theme}
                onChange={this.handleChange}
                value={this.state.editorHtml}
                modules={SmartTextEditor.modules}
                formats={SmartTextEditor.formats}
                bounds={"#root"}
                placeholder={this.props?.placeholder}
                readOnly={this.props?.readOnly}
            />
        );
    }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
SmartTextEditor.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
SmartTextEditor.formats = [
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
    "table"
];

export default SmartTextEditor;
