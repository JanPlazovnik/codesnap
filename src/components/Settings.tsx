import hljs from 'highlight.js';
import Select from './ui/Select';
import {
	useSettingsState,
	LanguageSetting,
	paddingOptions,
	PaddingSetting,
} from '../store/zustand';

export default function Settings() {
	const settings = useSettingsState();

	return (
		<div className="flex flex-row gap-4 fixed bottom-20">
			<div className="flex flex-col gap-2">
				<span>Padding</span>
				<Select
					value={settings.padding}
					options={paddingOptions as unknown as string[]}
					onChange={(option: string) => settings.setPadding(option as PaddingSetting)}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<span>Language</span>
				<Select
					value={settings.language}
					options={['auto', 'none', ...hljs.listLanguages()]}
					onChange={(option: string) => settings.setLanguage(option as LanguageSetting)}
				/>
			</div>
		</div>
	);
}
