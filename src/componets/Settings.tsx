import hljs from 'highlight.js';
import { useSettingsState, LanguageSetting } from '../store/zustand';

export default function Settings() {
	const settings = useSettingsState();

	return (
		<div className="flex flex-col gap-2 fixed bottom-10 p-4 border-2 rounded-lg border-solid">
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
		</div>
	);
}
