export interface JsonParagraphsDataInterface {
    title: string;
    paragraphs: {content: string, paragraphListType: ParagraphsListTypeEnum | string}[];
}

export enum ParagraphsListTypeEnum {
    "numbered" = <any>"numbered",
    "bulletPoint" = <any>"bulletPoint",
    "hyphen" = <any>"hyphen"
}