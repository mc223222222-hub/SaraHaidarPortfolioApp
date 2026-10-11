"use client";

import "./page.scss"
import { Button } from "@mui/material";
import { useParams } from "next/navigation";
import jsonData from "../../../../data/publicationsData.json";
import { useTranslations } from "next-intl";
import { PublicationCategoryColor } from "../page";

export default function PublicationPage() {

    const slug = useParams().slug;
    const t = useTranslations('publicationsPage')
    const pubData = jsonData.content.find(item => item.slug == slug)
    const pubContentKey = pubData?.contentKey

    return (
        <>
            <div className="singlePubPage">
                <div className="publication">
                    {
                        pubContentKey ?
                            t.rich('content.' + pubContentKey,
                                {
                                    ol: (chunks) => <ol type='A'>{chunks}</ol>,
                                    ul: (chunks) => <ul>{chunks}</ul>,
                                    li: (chunks) => <li>{chunks}</li>,
                                    strong: (chunks) => <strong>{chunks}</strong>,
                                    h2: (chunks) => <h2 className='title'>{chunks}</h2>,
                                    h3: (chunks) => <h3 className='title'>{chunks}</h3>,
                                    p: (chunks) => <p>{chunks}</p>
                                }
                            ) :
                            ''
                    }
                    <Button sx={{ backgroundColor: PublicationCategoryColor[pubData ? pubData.contentCategory : ""], color: "white" }} href='/publications'>{t('publicationGoBackButton')}</Button>
                </div>
            </div>
        </>
    )
}