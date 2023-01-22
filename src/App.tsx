import TextArea from './componets/TextArea';
import Settings from './componets/Settings';
import { LanguageSetting, useSettingsState, PaddingSetting, paddingOptions } from './store/zustand';
import { useEffect } from 'react';

function App() {
	const settings = useSettingsState();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const language = params.get('language');
		const padding = params.get('padding');
		const code = params.get('code');

		if (language) {
			settings.setLanguage(language as LanguageSetting);
		}

		if (padding && paddingOptions.includes(parseInt(padding) as PaddingSetting)) {
			settings.setPadding(parseInt(padding) as PaddingSetting);
		}

		if (code) {
			settings.setCode(btoa(code));
		}
	}, []);

	return (
		<div className="grid min-h-screen place-items-center py-5 relative">
			<TextArea />
			<Settings />
		</div>
	);
}

export default App;
