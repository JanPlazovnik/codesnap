import hljs from 'highlight.js';
import Select from './ui/Select';
import {
	useSettingsState,
	LanguageSetting,
	paddingOptions,
	PaddingSetting,
	gradients,
	GradientSetting,
} from '../store/zustand';
import { useCallback } from 'react';
import { toPng } from 'html-to-image';
import Button from './ui/shared/Button';
import React from 'react';

const Settings = React.forwardRef((_, ref: any) => {
	const settings = useSettingsState();

	const takeScreenshot = useCallback(async () => {
		try {
			// Make sure the ref is set and the div exists
			if (!ref || !ref.current) return;

			// Convert the div to a PNG
			const imageUrl = await toPng(ref.current, { cacheBust: true });

			// Create a link to download the image
			const link = document.createElement('a');
			link.download = `codesnap-${+new Date()}-${settings.language}.png`;
			link.href = imageUrl;
			link.click();
		} catch (e: any) {
			console.error(e);
		}
	}, [ref]);

	return (
		<div className="flex flex-row gap-4 fixed bottom-20 bg-neutral-300 dark:bg-neutral-900/70 p-2 rounded-lg z-10">
			<div className="flex flex-col gap-1">
				<div className="flex flex-row items-center justify-center h-full gap-1">
					{gradients.map((gradient: string, index: number) => (
						<div
							key={index}
							className="w-5 h-5 rounded-full bg-white cursor-pointer border-2 border-neutral-500"
							style={{ background: gradient }}
							onClick={() => settings.setGradient(gradient as GradientSetting)}
						/>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-1">
				<Select
					value={settings.padding}
					options={paddingOptions as unknown as string[]}
					onChange={(option: string) => settings.setPadding(option as PaddingSetting)}
				/>
			</div>

			<div className="flex flex-col gap-1">
				<Select
					value={settings.language}
					options={['auto', 'none', ...hljs.listLanguages()]}
					onChange={(option: string) => settings.setLanguage(option as LanguageSetting)}
				/>
			</div>

			<div className="flex flex-col justify-end">
				<Button onClick={takeScreenshot}>
					<span className="font-semibold">Export</span>
				</Button>
			</div>
		</div>
	);
});

export default Settings;
