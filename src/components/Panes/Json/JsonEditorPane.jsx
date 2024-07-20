import React, { useRef, useEffect } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { defaultTabBinding } from '@codemirror/commands';
import { json } from '@codemirror/lang-json';

const basicExtensions = [
  basicSetup,
  keymap.of([defaultTabBinding]),
  json(),
  EditorState.tabSize.of(2),
];

export default function JsonEditorPanel({
  paneValue,
  setPaneValue,
  isEditable = true,
}) {
  const editorRef = useRef();
  const viewRef = useRef();

  useEffect(() => {
    if (editorRef.current === null) return;

    const state = EditorState.create({
      doc: paneValue,
      extensions: [
        ...basicExtensions,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setPaneValue(update.state.doc.toString());
          }
        }),
        EditorView.editable.of(isEditable),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };

  }, [editorRef.current, isEditable]);

  useEffect(() => {
    if (viewRef.current) {
      const currentDoc = viewRef.current.state.doc.toString();
      if (currentDoc !== paneValue) {
        viewRef.current.dispatch({
          changes: { from: 0, to: currentDoc.length, insert: paneValue },
        });
      }
    }
  }, [paneValue]);

  return <div ref={editorRef} style={{paddiing: '0px',}}></div>;
}
