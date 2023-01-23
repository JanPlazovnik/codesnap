import { useMemo, useRef } from 'react';
import { useSettingsState } from '../store/zustand';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import React from 'react';

const TextArea = React.forwardRef((_, ref) => {
	const { code, ...settings } = useSettingsState();
	const editorRef = useRef<HTMLTextAreaElement>(null);

	const onKeyDown = (e: any) => {
		if (e.key === 'Tab') {
			e.preventDefault();
			settings.setCode(code + '    ');
		}
	};

	const onInput = () => {
		const editor = editorRef.current;
		if (!editor) return;

		editor.style.height = '0px';
		editor.style.height = editor.scrollHeight + 'px';
	};

	const highlighted = useMemo(() => {
		try {
			if (settings.language === 'none') return code;
			if (settings.language === 'auto')
				return hljs.highlightAuto(code).value;
			return hljs.highlight(code, { language: settings.language }).value;
		} catch (error) {
			return code;
		}
	}, [code, settings.language]);

	return (
		<div className="editor-wrapper">
			<div className="editor-resize-blob left-0 translate-x-[-50%] translate-y-[-50%]"></div>
			<div className="editor-resize-blob right-0 translate-x-[50%] translate-y-[-50%]"></div>
			<div
				className={`editor-group font-semibold`}
				style={{
					padding: settings.padding,
					background: settings.gradient,
				}}
				ref={ref as React.RefObject<HTMLDivElement>}
			>
				<textarea
					tabIndex={-1}
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="none"
					spellCheck={false}
					value={code}
					onChange={(e) => settings.setCode(e.target.value)}
					onKeyDown={onKeyDown}
					onInput={onInput}
					ref={editorRef}
				/>
				<div
					className="editor hljs"
					dangerouslySetInnerHTML={{ __html: highlighted }}
				></div>
			</div>
		</div>
	);
});

export default TextArea;
