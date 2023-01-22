import { useMemo, useRef, useState } from 'react';
import { useSettingsState } from '../store/zustand';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const example = `/**
* Get a random value from an array
* @param input The input array
* @returns A random value from the array
*/
export function random<T>(input: T[]): T {
   return input[Math.floor(Math.random() * input.length)];
}`;

export default function TextArea() {
	const settings = useSettingsState();
	const [code, setCode] = useState<string>(example);
	const editorRef = useRef<HTMLTextAreaElement>(null);

	const onKeyDown = (e: any) => {
		if (e.key === 'Tab') {
			e.preventDefault();
			setCode(code + '    ');
		}
	};

	const onInput = () => {
		const editor = editorRef.current!;
		editor.style.height = '0px';
		editor.style.height = editor.scrollHeight + 'px';
	};

	const highlighted = useMemo(() => {
		try {
			if (settings.language === 'none') return code;
			if (settings.language === 'auto') return hljs.highlightAuto(code).value;
			return hljs.highlight(settings.language, code).value;
		} catch (error) {
			return code;
		}
	}, [code, settings.language]);

	return (
		<div
			className={`editor-group max-w-[960px] bg-blue-400`}
			style={{ padding: settings.padding }}
		>
			<textarea
				tabIndex={-1}
				autoComplete="off"
				autoCorrect="off"
				autoCapitalize="none"
				spellCheck={false}
				value={code}
				onChange={(e) => setCode(e.target.value)}
				onKeyDown={onKeyDown}
				onInput={onInput}
				ref={editorRef}
			/>
			<div className="editor hljs" dangerouslySetInnerHTML={{ __html: highlighted }}></div>
		</div>
	);
}
