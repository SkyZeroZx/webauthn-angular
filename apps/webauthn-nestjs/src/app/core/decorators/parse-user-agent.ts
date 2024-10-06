export const parseUserAgent = (userAgent: string): string => {
	const browserMap = [
		{ regex: /Chrome\/(\d+)/, name: 'Chrome' },
		{ regex: /Firefox\/(\d+)/, name: 'Firefox' },
		{ regex: /Safari\/(\d+)/, name: 'Safari', exclude: /Chrome/ },
		{ regex: /Edg\/(\d+)/, name: 'Edge' },
		{ regex: /OPR\/(\d+)/, name: 'Opera' }
	];

	const osMap = [
		{
			regex: /Windows NT (\d+\.\d+)/,
			name: (osVersion: string) => `Windows ${osVersion}`,
			platform: 'Microsoft Windows'
		},
		{
			regex: /Mac OS X (\d+[._]\d+)/,
			name: (osVersion: string) => `Mac OS X ${osVersion.replace('_', '.')}`,
			platform: 'Apple Mac'
		},
		{
			regex: /Android (\d+[.\d]*)/,
			name: (osVersion: string) => `Android ${osVersion}`,
			platform: 'Android'
		},
		{ regex: /iPhone|iPad/, name: () => 'iOS', platform: 'Apple iPhone/iPad' },
		{ regex: /Linux/, name: () => 'Linux', platform: 'Linux' }
	];

	const findMatch = (map) =>
		map.find(
			(item) => item.regex.test(userAgent) && (!item.exclude || !item.exclude.test(userAgent))
		);

	const browserInfo = findMatch(browserMap) || { name: 'Unknown Browser' };
	const osInfo = findMatch(osMap) || { name: 'Unknown OS', platform: 'Unknown Platform' };

	const osVersion = RegExp.$1 || '';

	const browser = browserInfo.name;
	const os = typeof osInfo.name === 'function' ? osInfo.name(osVersion) : osInfo.name;
	const platform = osInfo.platform;

	return `${browser}/${os}/${platform}`;
};
