// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
// import RichTextEditor from 'react-rte';

// const MyStatefulEditor1 = ({ onChange, value, maxLength, setError, ...restProps }) => {
//   const [editorValue, setEditorValue] = useState(
//     value ? RichTextEditor.createValueFromString(value, "html") : RichTextEditor.createEmptyValue()
//   );
//   const [key, setKey] = useState(0);
//   let editorRef = useRef(null);

//   // Handle image upload and insert into editor
//   const handleImageUpload = useCallback(() => {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'image/*';
//     input.onchange = (event) => {
//       const file = event.target.files[0];
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const base64String = e.target.result;
//         const newEditorValue = editorValue.insertAtomicBlock({
//           type: 'IMAGE',
//           src: base64String,
//         });
//         setEditorValue(newEditorValue);
//         if (onChange) {
//           onChange(newEditorValue.toString('html'));
//         }
//       };
//       reader.readAsDataURL(file);
//     };
//     input.click();
//   }, [editorValue, onChange]);

//   // Toolbar configuration should be after defining handleImageUpload
//   const toolbarConfig = {
//     display: [
//       "INLINE_STYLE_BUTTONS",
//       "BLOCK_TYPE_BUTTONS",
//       "LINK_BUTTONS",
//       "IMAGE_BUTTONS",
//       "HISTORY_BUTTONS"
//     ],
//     INLINE_STYLE_BUTTONS: [
//       { label: "Bold", style: "BOLD", className: "custom-css-class" },
//       { label: "Italic", style: "ITALIC" },
//       { label: "Underline", style: "UNDERLINE" },
//       { label: "Strikethrough", style: "STRIKETHROUGH" }
//     ],
//     BLOCK_TYPE_BUTTONS: [
//       { label: "UL", style: "unordered-list-item" },
//       { label: "OL", style: "ordered-list-item" },
//       { label: "Blockquote", style: "blockquote" }
//     ],
//     LINK_BUTTONS: [
//       { label: "Link", style: "LINK" },
//       { label: "Remove Link", style: "REMOVE_LINK" }
//     ],
//     IMAGE_BUTTONS: [
//       { label: "Image", style: "IMAGE", onClick: handleImageUpload }
//     ],
//     HISTORY_BUTTONS: [
//       { label: "Undo", style: "UNDO" },
//       { label: "Redo", style: "REDO" }
//     ]
//   };

//   useEffect(() => {
//     const editorInstance = editorRef.current?.editor;
//     let timeout;
//     if (editorInstance) {
//       editorRef.current?.editor?.refs?.editor?.addEventListener("paste", (e) => {
//         const clipboardData = e.clipboardData || window.clipboardData;
//         const pastedText = clipboardData.getData('Text');
//         const pastedHtml = clipboardData.getData('text/html');
//         if (pastedHtml || pastedText) {
//           let pasted = pastedText || pastedHtml;
//           const currentTextLength = editorValue.getEditorState().getCurrentContent().getPlainText('').length;
//           if (maxLength && currentTextLength + pasted?.length >= maxLength) {
//             timeout = setTimeout(() => {
//               setError(`You are pasting characters more than the maximum limit`);
//             }, 50);
//             e.preventDefault();
//           }
//         }
//       })
//     }
//     return () => {
//       if (timeout) {
//         clearTimeout(timeout);
//       }
//     };
//   }, [editorValue, value, onChange]);

//   const handleChange = (value) => {
//     const content = value.toString('html');
//     const textLength = value.getEditorState().getCurrentContent().getPlainText('')?.trim()?.length;

//     if (maxLength && textLength > maxLength) {
//       setError(`Maximum length reached`);
//     } else {
//       setError('');
//       setEditorValue(value);
//       if (onChange) {
//         onChange(content);
//       }
//     }
//     setKey((prevKey) => prevKey + 1);
//   };

//   return (
//     <RichTextEditor
//       key={key}
//       value={editorValue}
//       ref={editorRef}
//       toolbarConfig={toolbarConfig}
//       onChange={handleChange}
//       {...restProps}
//     />
//   );
// };

// MyStatefulEditor1.propTypes = {
//   onChange: PropTypes.func,
//   value: PropTypes.string,
//   maxLength: PropTypes.number,
//   setError: PropTypes.func.isRequired,
// };

// const MyStatefulEditor = ({ name, label, maxLength, value, errorMessage, onChange, key, errShow, ...props }) => {
//   const [error, setError] = useState('');

//   return (
//     <>
//       <MyStatefulEditor1
//         value={value ? value : ""}
//         maxLength={maxLength ? maxLength : null}
//         setError={setError}
//         key={key}
//         onChange={(content) => {
//           onChange(content);
//         }}
//         {...props}
//       />
//       {error && errShow ? errShow : true && <p className="form_error_msg">{error}</p>}
//       <input type="hidden" name={name} value={value} required />
//     </>
//   );
// };

// export default MyStatefulEditor;



import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';

const MyStatefulEditor1 = ({ onChange, value, maxLength, setError, ...restProps }) => {
  const [editorValue, setEditorValue] = useState(
    value ? RichTextEditor.createValueFromString(value, "html") : RichTextEditor.createEmptyValue()
  );
  const [key, setKey] = useState(0);
  let editorRef = useRef(null);

  // Handle image upload and insert into editor
  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        const newEditorValue = editorValue.setContentFromString(`${editorValue.toString('html')}<img src="${base64String}" alt="Uploaded Image" />`, 'html');
        setEditorValue(newEditorValue);
        if (onChange) {
          onChange(newEditorValue.toString('html'));
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }, [editorValue, onChange]);

  // Toolbar configuration
  const toolbarConfig = {
    display: [
      "INLINE_STYLE_BUTTONS",
      "BLOCK_TYPE_BUTTONS",
      "LINK_BUTTONS",
      "IMAGE_BUTTONS",
      "HISTORY_BUTTONS"
    ],
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD", className: "custom-css-class" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
      { label: "Strikethrough", style: "STRIKETHROUGH" }
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" },
      { label: "Blockquote", style: "blockquote" }
    ],
    LINK_BUTTONS: [
      { label: "Link", style: "LINK" },
      { label: "Remove Link", style: "REMOVE_LINK" }
    ],
    IMAGE_BUTTONS: [
      { label: "Image", style: "IMAGE", onClick: handleImageUpload }
    ],
    HISTORY_BUTTONS: [
      { label: "Undo", style: "UNDO" },
      { label: "Redo", style: "REDO" }
    ]
  };

  // Handle image paste
  useEffect(() => {
    const editorInstance = editorRef.current?.editor;
    let timeout;
    if (editorInstance) {
      editorRef.current?.editor?.refs?.editor?.addEventListener("paste", (e) => {
        const clipboardData = e.clipboardData || window.clipboardData;
        const items = clipboardData.items;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.indexOf("image") !== -1) {
            const blob = item.getAsFile();
            const reader = new FileReader();
            reader.onload = function (event) {
              const base64String = event.target.result;
              const newEditorValue = editorValue.setContentFromString(
                `${editorValue.toString('html')}<img src="${base64String}" alt="Pasted Image" />`,
                'html'
              );
              setEditorValue(newEditorValue);
              if (onChange) {
                onChange(newEditorValue.toString('html'));
              }
            };
            reader.readAsDataURL(blob);
            e.preventDefault();
          }
        }
      });
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [editorValue, value, onChange]);

  const handleChange = (value) => {
    const content = value.toString('html');
    const textLength = value.getEditorState().getCurrentContent().getPlainText('')?.trim()?.length;

    if (maxLength && textLength > maxLength) {
      setError(`Maximum length reached`);
    } else {
      setError('');
      setEditorValue(value);
      if (onChange) {
        onChange(content);
      }
    }
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <RichTextEditor
      key={key}
      value={editorValue}
      ref={editorRef}
      // toolbarConfig={toolbarConfig}
      onChange={handleChange}
      {...restProps}
    />
  );
};

MyStatefulEditor1.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  setError: PropTypes.func.isRequired,
};

const MyStatefulEditor = ({ name, label, maxLength, value, errorMessage, onChange, key, errShow, ...props }) => {
  const [error, setError] = useState('');

  return (
    <>
      <MyStatefulEditor1
        value={value ? value : ""}
        maxLength={maxLength ? maxLength : null}
        setError={setError}
        key={key}
        onChange={(content) => {
          onChange(content);
        }}
        {...props}
      />
      {error && errShow ? errShow : true && <p className="form_error_msg">{error}</p>}
      <input type="hidden" name={name} value={value} required />
    </>
  );
};

export default MyStatefulEditor;
 
