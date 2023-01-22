import hljs from 'highlight.js';
import {
	useSettingsState,
	LanguageSetting,
	paddingOptions,
	PaddingSetting,
} from '../store/zustand';

export default function Settings() {
	const settings = useSettingsState();

	return (
		<div className="flex flex-row gap-5 fixed bottom-10 p-4 border-2 rounded-lg border-solid">
			<div className="flex gap-2">
				<label htmlFor="language">Language</label>
				<select
					id="language"
					value={settings.language}
					onChange={(e) => settings.setLanguage(e.target.value as LanguageSetting)}
				>
					<option value="none">None</option>
					<option value="auto">Auto</option>
					{hljs.listLanguages().map((language: string) => (
						<option key={language} value={language}>
							{language}
						</option>
					))}
				</select>
			</div>

			<div className="flex gap-2">
				<label htmlFor="padding">Padding</label>
				<select
					id="padding"
					value={settings.padding}
					onChange={(e) =>
						settings.setPadding(parseInt(e.target.value) as PaddingSetting)
					}
				>
					{paddingOptions.map((padding: number) => (
						<option key={padding} value={padding}>
							{padding}px
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
