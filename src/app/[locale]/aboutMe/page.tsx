"use client";

import "./page.scss";
import { useTranslations } from 'next-intl';
import jsonData from "../../../data/aboutMePageData.json"
import JsonParagraphsDataFormatService from "@/services/JsonParagraphsHelper";

export default function AboutMe() {
    const t = useTranslations("aboutMePage")
    let numberedListItemCounterObj = { index: 1 };
    return (
        <>
            <div className="aboutMePage page">
                <div className="flex--col titleImgContainer">
                    <div className="imgContainer">
                        <img src={jsonData.portraitImgSrc} />
                    </div>
                </div>
                <div className="aboutMeContent">
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