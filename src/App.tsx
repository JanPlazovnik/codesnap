import TextArea from './components/TextArea';
import Settings from './components/Settings';
import { LanguageSetting, useSettingsState, PaddingSetting, paddingOptions } from './store/zustand';
import { useEffect, useState } from 'react';

function App() {
	const settings = useSettingsState();
	const [ready, setReady] = useState(false);

	// Load settings from URL
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const language = params.get('language');
		const padding = params.get('padding');
		const code = params.get('code');

		if (language) {
			settings.setLanguage(language as LanguageSetting);
		}

		if (padding && paddingOptions.includes(padding as PaddingSetting)) {
			settings.setPadding(padding as PaddingSetting);
		}

		if (code) {
			settings.setCode(atob(code));
		}

		setReady(true);
	}, []);

	return (
		<div className="grid min-h-screen place-items-center py-5 relative">
			{ready && (
				<>
					<TextArea />
					<Settings />
				</>
			)}
		</div>
	);
}

export default App;
