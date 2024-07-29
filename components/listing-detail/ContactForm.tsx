'use client';

import {IListing, LanguageType} from "@/types";
import Select from "react-select";
import translations from "@/app/translations";
import {useEffect, useState} from "react";
import {submitContactForm} from "@/app/actions";
import {PhoneInput} from 'react-international-phone';
import 'react-international-phone/style.css';

const ContactForm = ({listing, lang}: { listing: IListing, lang: LanguageType }) => {
    const t = translations[lang].contactForm;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [reason, setReason] = useState<{
        value: 'needMoreInfo' | 'scheduleVisit' | 'other',
        label: string
    }>({
        value: 'needMoreInfo' as const,
        label: t.reason.needMoreInfo.label
    });
    const [message, setMessage] = useState('');

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [submitResult, setSubmitResult] = useState<{ success: boolean } | null>(null);

    const options = [
        {
            value: 'needMoreInfo' as const,
            label: t.reason.needMoreInfo.label
        },
        {
            value: 'scheduleVisit' as const,
            label: t.reason.scheduleVisit.label
        },
        {
            value: 'other' as const,
            label: t.reason.other.label
        }
    ];

    useEffect(() => {
        switch (reason.value) {
            case 'needMoreInfo':
                setMessage(t.reason.needMoreInfo.content);
                break;
            case 'scheduleVisit':
                setMessage(t.reason.scheduleVisit.content);
                break;
            case 'other':
                setMessage(t.reason.other.content);
                break;
        }
    }, [reason.value, t.reason.needMoreInfo.content, t.reason.other.content, t.reason.scheduleVisit.content]);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    useEffect(() => {
        setErrors((prevState) => {
            return {...prevState, name: ''};
        });
    }, [name]);

    useEffect(() => {
        setErrors((prevState) => {
            return {...prevState, email: ''};
        });
    }, [email]);

    useEffect(() => {
        setErrors((prevState) => {
            return {...prevState, phoneNumber: ''};
        });
    }, [phoneNumber]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!name) newErrors.name = t.validation.nameRequired;
        if (!email || !validateEmail(email)) newErrors.email = t.validation.invalidEmail;
        if (!message || message.length === 0) newErrors.message = t.validation.messageRequired;

        if (Object.keys(newErrors).length === 0) {
            // Call /api/contact-form endpoint with the form data.
            const response = await submitContactForm({
                crmId: listing.crm_id,
                provider: listing.provider,
                name,
                email,
                phoneNumber,
                message
            }, window.location.href);
            setSubmitResult(response);
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`w-full flex flex-col gap-4 font-light text-sm rounded`}>
            <div className={`w-full`}>
                <input
                    name={'name'}
                    type="text"
                    placeholder={`${t.name}*`}
                    className={`w-full px-3 py-2 rounded outline-none border border-gray-300 hover:border-gray-500 focus:border-gray-500 ${errors.name ? '' : ''}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
                <input
                    name={'email'}
                    type="email"
                    placeholder={`${t.email}*`}
                    className={`w-full px-3 py-2 rounded outline-none border border-gray-300 hover:border-gray-500 focus:border-gray-500 ${errors.email ? '' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <PhoneInput
                defaultCountry={lang === 'pl' ? 'pl' : lang === 'ua' ? 'ua' : lang === 'ru' ? 'by' : 'us'}
                value={phoneNumber}
                onChange={(phone) => setPhoneNumber(phone)}
                className={`w-full`}
                inputClassName={`w-full`}
            />

            <Select
                name={'reason'}
                options={options}
                value={reason}
                onChange={(selectedOption: any) => setReason(selectedOption)}
            />
            <textarea
                name={'message'}
                placeholder={t.message}
                className={`w-full px-3 py-2 rounded h-44 resize-none outline-none border border-gray-300 hover:border-gray-500 focus:border-gray-500`}
                maxLength={200}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            <button type="submit"
                    className={`bg-[#FF0000] text-white rounded py-2 ${submitResult && 'opacity-75 contrast-50'}`}
                    disabled={!!submitResult}>{t.send}</button>
            {submitResult?.success &&
                <p className={`tetx-xl`}>{t.sendResultSuccess}</p>
            }
            {(submitResult && !submitResult?.success) && <p>{t.sendResultError}</p>}
        </form>
    );
}

export default ContactForm;
