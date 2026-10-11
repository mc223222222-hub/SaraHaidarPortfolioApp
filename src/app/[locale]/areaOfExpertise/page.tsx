"use client";

import './page.scss';
import jsonData from '../../../data/areaOfExpertiseData.json';
import { useTranslations } from 'next-intl';
import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function AreaOfExpertise() {
    const t = useTranslations("areaOfExpertisePage")
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <div className='areaOfExpertisePage'>
                <div className='introPage page'>
                    <div className='imgContainer'>
                        <img src={jsonData.patternImgSrc} />
                    </div>
                    <p className='header glassBg'>{t('firstPageHeader')}</p>
                </div>
                <div className='contentPage page'>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs allowScrollButtonsMobile variant='scrollable' scrollButtons="auto" value={value} onChange={handleChange} aria-label="basic tabs example">
                                {
                                    jsonData.content.tabs.map((item, index) => {
                                        return <Tab key={index} label={t('tabsContent.' + item.titleKey)} {...a11yProps(index)} />
                                    })
                                }
                            </Tabs>
                        </Box>
                        {
                            jsonData.content.tabs.map((item, index) => {
                                return (
                                    <CustomTabPanel key={index} value={value} index={index}>
                                        <div className='tabsContentText'>
                                            {
                                                t.rich('tabsContent.' + item.contentKey, {
                                                    ol: (chunks) => <ol type='A'>{chunks}</ol>,
                                                    ul: (chunks) => <ul>{chunks}</ul>,
                                                    li: (chunks) => <li>{chunks}</li>,
                                                    strong: (chunks) => <strong>{chunks}</strong>,
                                                    h2: (chunks) => <h2 className='title'>{chunks}</h2>,
                                                    p: (chunks) => <p>{chunks}</p>
                                                })
                                            }
                                        </div>
                                    </CustomTabPanel>
                                )
                            })
                        }
                    </Box>
                </div>
            </div >
        </>
    )
}