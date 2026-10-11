'use client'

import './localeSwitcher.scss';
import { useLocale, useTranslations } from 'next-intl';
import { changeLocale } from '@/app/actions'
import { usePathname, useRouter } from '@/i18n/navigation';
import { Button } from '@mui/material';
import { getLocaleSwitcherButtonStyle } from '@/styles/mainTheme';
import { useEffect, useState } from 'react';
import { Language } from '@mui/icons-material';

export default function LocaleSwitcher() {
	const t = useTranslations('LocaleSwitcher');
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [currentLocale, setCurrentLocale] = useState('...');

	const toggleLocale = async (e: React.FormEvent) => {
		let newLocale = locale == 'en' ? 'fr' : 'en';
		if (locale != newLocale) {
			router.replace(pathname, { locale: newLocale });
		}
		await changeLocale(newLocale);
	}

	useEffect(() => {
		setCurrentLocale(locale);
	}, [locale]);

	return (
		<>
			<Button sx={getLocaleSwitcherButtonStyle()} className='toggleButton' variant='outlined' onClick={toggleLocale}>
				<Language sx={{ position: 'absolute' }} />
				<span>
					{currentLocale.toUpperCase()}
				</span>
			</Button>
		</>
	);

}