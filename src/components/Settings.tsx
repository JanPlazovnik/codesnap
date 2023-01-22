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
import { useEffect } from 'react';

export default function Settings() {
	const settings = useSettingsState();

	// Update URL with settings
	// useEffect(() => {
	// 	const params = new URLSearchParams(window.location.search);

	// 	if (settings.language) {
	// 		params.set('language', settings.language);
	// 	}

	// 	if (settings.padding) {
	// 		params.set('padding', settings.padding);
	// 	}

	// 	window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
	// }, [settings.language, settings.padding]);

	return (
		<div className="flex flex-row gap-4 fixed bottom-20">
			<div className="flex flex-col gap-1">
				<span className="text-sm">Theme</span>
				<div className="flex flex-row items-center justify-center h-full gap-1">
					{gradients.map((gradient: string) => (
						<div
							className="w-5 h-5 rounded-full bg-white cursor-pointer"
							style={{ background: gradient }}
							onClick={() => settings.setGradient(gradient as GradientSetting)}
						/>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-1">
				<span className="text-sm">Padding</span>
				<Select
					value={settings.padding}
					options={paddingOptions as unknown as string[]}
					onChange={(option: string) => settings.setPadding(option as PaddingSetting)}
				/>
			</div>

			<div className="flex flex-col gap-1">
				<span className="text-sm">Language</span>
				<Select
					value={settings.language}
					options={['auto', 'none', ...hljs.listLanguages()]}
					onChange={(option: string) => settings.setLanguage(option as LanguageSetting)}
				/>
			</div>
		</div>
	);
}
