"use client";

import { Box } from "@mui/system";
import "./page.scss";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import jsonData from "../../../data/contactData.json";
import { useTranslations } from "next-intl";
import { SendEmail } from "@/app/actions"

interface formValuesObject {
    value: string,
    error: boolean
}

export default function Contact() {
    const data: any = jsonData;
    const t = useTranslations("contactPage")
    const formsDataInitialState = Object.keys(data.formSection.forms).reduce((stateObj, key) => {
        stateObj[key] = {
            value: "",
            error: false
        };
        return stateObj
    }, {} as Record<string, formValuesObject>);

    const [formsValues, setFormsValues] = useState(formsDataInitialState);

    const handleFormsValuesChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        let errorVal = formsValues[name].error;
        if (typeof data.formSection.forms[name].regex != "undefined") {
            let regex = new RegExp(data.formSection.forms[name]["regex"]);
            regex.test(value) ? errorVal = false : errorVal = true;
        }
        else if (data.formSection.forms[name].required == true) {
            if (value == "")
                errorVal = true;
            else {
                errorVal = false;
            }
        }
        if ((typeof data.formSection.forms[name].required == "undefined" || data.formSection.forms[name].required == false) && value == "") {
            errorVal = false;
        }
        setFormsValues(prevValues => ({
            ...prevValues,
            [name]: {
                value: value,
                error: errorVal
            }
        }));
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const btn = event.currentTarget
        btn.disabled = true;
        let errorInForm = false;
        for (let key of Object.keys(formsValues)) {
            if (formsValues[key].error == true) {
                errorInForm = true;
                break;
            }
            else if (data.formSection.forms[key].required == true && formsValues[key].value == "") {
                errorInForm = true;
                break;
            }
        }
        if (!errorInForm) {
            await SendEmail(JSON.parse(JSON.stringify({
                fname: formsValues["fname"].value,
                lname: formsValues["lname"].value,
                email: formsValues["email"].value,
                phone: formsValues["phone"].value,
                msg: formsValues["msg"].value
            }))).then((response) => {
                if (response) {
                    alert(t(jsonData.formSection.submitSuccessMessageKey));
                    clearFormValues();
                }
                else {
                    alert(t(jsonData.formSection.submitFailureMessageKey));
                }
            }).catch((e) => {
                alert(t(jsonData.formSection.submitFailureMessageKey));
                console.log(e)
            });
        }
        else {
            alert(t(jsonData.formSection.submitBadFormMessageKey))
        }
        btn.disabled = false;
    }

    const clearFormValues = () => {
        for (let key of Object.keys(formsValues)) {
            setFormsValues(prevValues => ({
                ...prevValues,
                [key]: {
                    value: "",
                    error: false
                }
            }));
        }
    };

    return <>
        <div className="contactPageContainer">
            <div className="contactFormContainer">
                <h1 className="title">{t(jsonData.formSection.formTitleKey)}</h1>
                <Box className='contactForm'>
                    {Object.keys(formsValues).map((key) => {
                        const config = data.formSection.forms[key];
                        return (
                            <TextField
                                key={key}
                                label={t(config.labelKey)}
                                name={key}
                                value={formsValues[key].value}
                                onChange={handleFormsValuesChange}
                                placeholder={t(config.placeholderKey)}
                                error={formsValues[key].error}
                                required={config.required}
                                {...config.formControlProps}
                            />
                        );
                    })}
                    <Button disableTouchRipple sx={{ backgroundColor: 'black', color: 'gold' }} className="form-submit-button" onClick={handleSubmit}>{t(data.formSection.submitButtonTextKey)}</Button>
                </Box>
            </div>
            <div className="imgContainer">
                <img src={jsonData.sideImgSrc} />
            </div>
        </div>
    </>
}