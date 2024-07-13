'use server'

const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export async function submitContactForm(props: {
    name: string,
    email: string,
    countryCode: string,
    phoneNumber: string,
    message: string
}, link: string) {
    const { name, email, countryCode, phoneNumber, message } = props;

    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/contact-form', {
        method: 'POST',
        body: JSON.stringify({ link, name, email, countryCode, phoneNumber, message }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        return { success: true };
    } else {
        return { success: false };
    }
}

export async function submitContactFormDepr(formData: FormData) {
    // const { name, email, countryCode, phoneNumber, reason, message } = props;

    const name = formData.get('name');
    const email = formData.get('email')?.toString();
    const countryCode = formData.get('countryCode');
    const phoneNumber = formData.get('phoneNumber');
    const reason = formData.get('reason');
    const message = formData.get('message');

    await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/contact-form', {
        method: 'POST',
        body: JSON.stringify({ name, email, countryCode, phoneNumber, reason, message }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}