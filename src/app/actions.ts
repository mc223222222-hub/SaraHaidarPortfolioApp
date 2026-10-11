'use server'

import ContactEmail from '@/emails/contactEmail';
import { Resend } from 'resend';
import { setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";

export async function changeLocale(newLocale: string): Promise<void> {
    let cookieStore = await cookies();
    cookieStore.set({ name: 'locale', value: newLocale })
    setRequestLocale(newLocale)
    return
}

export async function getLocale(): Promise<string | undefined> {
    let cookieStore = await cookies();
    return cookieStore.get('locale')?.value;
}


export async function SendEmail(formData: { fname: string, lname: string, email: string, phone: string, msg: string }) {

    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log(formData)
    try {
        const { data, error } = await resend.emails.send({
            from: 's.h@shaidaravocats.com',
            to: ['s.h@shaidaravocats.com'],
            subject: 'Message from website',
            react: ContactEmail(formData),
        });

        if (error) {
            console.log(error + "from server");
            return null;
        }
        console.log(data + "from server")
        return data;
    } catch (error) {
        console.log(error + "from server");
        return null;
    }
}
