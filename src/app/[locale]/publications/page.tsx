"use client";

import './page.scss'
import jsonData from '../../../data/publicationsData.json';
import { useTranslations } from 'next-intl';
import { Button, Chip, IconButton } from '@mui/material';
import { KeyboardDoubleArrowRightRounded } from '@mui/icons-material';

export const PublicationCategoryColor: Record<string, string> = {
    prefectureRelations: "burlywood",
    visaPassport: "cornflowerblue",
    nationality: "darkcyan"
}

export default function Publications() {
    const t = useTranslations('publicationsPage')

    return (
        <>
            <div className='publicationsPage'>
                <div className='titleContainer'>
                    <p>
                        {t(jsonData.publicationsPageHeaderKey)}
                    </p>
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
                                    <IconButton size='small' href={`/publications/${item.slug}?id=${index}`}>
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