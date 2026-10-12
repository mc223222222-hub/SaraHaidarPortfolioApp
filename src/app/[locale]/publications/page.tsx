"use client";

import './page.scss'
import jsonData from '../../../data/publicationsData.json';
import { useLocale, useTranslations } from 'next-intl';
import { localizedPath, isLocale } from '@/lib/seo';
import { Button, Chip, IconButton } from '@mui/material';
import { KeyboardDoubleArrowRightRounded } from '@mui/icons-material';

export const PublicationCategoryColor: Record<string, string> = {
    prefectureRelations: "burlywood",
    visaPassport: "cornflowerblue",
    nationality: "darkcyan"
}

export default function Publications() {
    const t = useTranslations('publicationsPage')
    const rawLocale = useLocale()
    const locale = isLocale(rawLocale) ? rawLocale : 'en'

    return (
        <>
            <div className='publicationsPage'>
                <div className='titleContainer'>
                    <h1>
                        {t(jsonData.publicationsPageHeaderKey)}
                    </h1>
                </div>
                <div className='publicationsContainer'>
                    {
                        jsonData.content.map((item, index) => {
                            return (
                                <div key={index} className='publicationContainer'>
                                    <div className='publicationTeaserHeader'>
                                        <p className='teaserTitle'>{t('content.' + item.previewTitleKey)}</p>
                                        <Chip sx={{ color: "white", backgroundColor: PublicationCategoryColor[item.contentCategory] }} size='small' label={t(item.contentCategory)} />
                                    </div>
                                    <p className='teaserContent'>{t('content.' + item.previewContentKey)}</p>
                                    <IconButton size='small' href={localizedPath(locale, `/publications/${item.slug}`)}>
                                        <KeyboardDoubleArrowRightRounded />
                                    </IconButton>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}