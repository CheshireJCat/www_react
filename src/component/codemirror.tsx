import CodeMirror from "codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/yonce.css"
import React, { useEffect, useRef, useState } from "react"

const mobile =
    typeof navigator === 'undefined' ||
    navigator.userAgent.match(/android/i) ||
    navigator.userAgent.match(/webos/i) ||
    navigator.userAgent.match(/iphone/i) ||
    navigator.userAgent.match(/ipad/i) ||
    navigator.userAgent.match(/ipod/i) ||
    navigator.userAgent.match(/blackberry/i) ||
    navigator.userAgent.match(/windows phone/i)

const CodeMirrorEditor: React.FC<{
    value: string;
    onChange: (p: { target: { value: string } }) => void;
}> = (props) => {
    let editorRef = useRef<HTMLTextAreaElement>(null)
    let editor = useRef<CodeMirror.EditorFromTextArea>()

    useEffect(() => {
        if (!mobile && editorRef.current) {
            editor.current = CodeMirror.fromTextArea(editorRef.current, {
                ...props, theme: "yonce"
            })
            editor.current.on('change', handleChange)
        }
    }, [])

    useEffect(() => {
        if (!editor.current) return

        if (props.value && editor.current.getValue() !== props.value) {
            editor.current.setValue(props.value)
        }
    }, [props.value])

    function handleChange() {
        if (!editor.current) return

        const newVal = editor.current.getValue()
        if (newVal === props.value) return


        props.onChange({ target: { value: newVal } })

        // if (editor.current.getValue() !== props.value) {
        //     editor.current.setValue(props.value)
        // }

    }

    return (
        <textarea
            ref={editorRef}
            value={props.value}
            onChange={props.onChange}
        />
    )
}

export default CodeMirrorEditor