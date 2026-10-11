import * as React from 'react';

interface EmailTemplateProps {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    msg: string;
}

export default function EmailTemplate(props: EmailTemplateProps) {
    return (
        <div>
            <p>Email sent from {props.fname + " " + props.lname}</p>
            <p>Email : {props.email}</p>
            <p>Phone : {props.phone}</p>
            <p>Message : {props.msg}</p>
        </div>
    );
}