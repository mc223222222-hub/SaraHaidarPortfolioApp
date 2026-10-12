"use client";

import "./page.scss";
import { useLocale, useTranslations } from 'next-intl';
import { isLocale } from "@/lib/seo";
import { ALT, HIDDEN_H1 } from "@/lib/seo-copy";
import jsonData from "../../../data/aboutMePageData.json"
import JsonParagraphsDataFormatService from "@/services/JsonParagraphsHelper";

export default function AboutMe() {
    const t = useTranslations("aboutMePage")
    const rawLocale = useLocale()
    const locale = isLocale(rawLocale) ? rawLocale : 'en'
    let numberedListItemCounterObj = { index: 1 };
    return (
        <>
            <div className="aboutMePage page">
                <div className="flex--col titleImgContainer">
                    <div className="imgContainer">
                        <img src={jsonData.portraitImgSrc} alt={ALT[locale].portrait} />
                    </div>
                </div>
                <div className="aboutMeContent">
                    <h1 className="sr-only">{HIDDEN_H1[locale].aboutMe}</h1>
                    <p className="title">{t('title')}</p>
                    <div className="textContent">
                        {
                            jsonData.textContent.map((item, index) => {

                                return (
                                    <div key={index}>
                                        {
                                            item.paragraphs.map((subItem, subIndex) =>
                                                t.has(subItem.content) ? JsonParagraphsDataFormatService.formatJsonDataText(subIndex, { content: t.raw(subItem.content), paragraphListType: subItem.paragraphListType }, numberedListItemCounterObj) : null
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}