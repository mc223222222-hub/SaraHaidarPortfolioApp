import React, { JSX, ReactElement } from "react";
import { ParagraphsListTypeEnum } from "../interfaces/JsonParagraphsDataInterface";

export default class JsonParagraphsDataFormatService {

    constructor() {

    }

    public static formatJsonDataText = (index: number, item: any, numberedListItemCounterObj: { index: number }, className: string = ""): JSX.Element => {
        let pElementChildren = [JsonParagraphsDataFormatService.getListSymbol( numberedListItemCounterObj, item.paragraphListType),
        JsonParagraphsDataFormatService.formatTextWithHtmlTags(item.content)];
        let pElementToReturn = React.createElement(
            "p",
            {
                key: index,
                className: className
            },
            pElementChildren);

        return pElementToReturn;
    }

    //I passed the index as object so the argument taken by the function would be taken by reference. this means that i can change the object through the function.
    public static getListSymbol = (listSubitemIndexObj: { index: number }, paragraphListType: ParagraphsListTypeEnum | string = ""): string => {
        let returnVal = "";

        if (paragraphListType == ParagraphsListTypeEnum.numbered) {
            returnVal = listSubitemIndexObj.index + ".\u0020";
            listSubitemIndexObj.index += 1;
        }

        else if (paragraphListType == ParagraphsListTypeEnum.bulletPoint) {
            returnVal = "\u2022\u0020";
        }

        else if (paragraphListType == ParagraphsListTypeEnum.hyphen) {
            returnVal = "\u2013\u0020";
        }

        else {
            listSubitemIndexObj.index = 1;
            returnVal = paragraphListType.toString() + "";
        }
        return returnVal;
    }

    private static formatTextWithHtmlTags(textToFormat: string): (ReactElement | string)[] {
        let children: (ReactElement | string)[] = []
        let splitNormalAndBoldElementsArray = textToFormat.split(RegExp("(<b>.*?<\/b>)"));
        splitNormalAndBoldElementsArray.map((string, index) => {
            if (string.includes("<b>")) {
                string = string.replace("<b>", "");
                string = string.replace("</b>", "")
                children.push(
                    React.createElement(
                        "b",
                        {
                            key: index
                        },
                        string
                    )
                )
            }
            else {
                children.push(string)
            }
        });
        return children;
    }
}