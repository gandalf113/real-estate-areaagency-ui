'use server'

export async function submitContactForm(props: {
    crmId: string,
    provider: string,
    name: string,
    email: string,
    phoneNumber: string,
    message: string
}, link: string) {
    const { crmId, provider, name, email, phoneNumber, message } = props;

    const text = `ID: ${crmId}\nCRM: ${provider}\nOgłoszenie: ${link}\n\nImię: ${name}\nEmail: ${email}\nTelefon: ${phoneNumber}\n\nWiadomość: ${message}`;
    const body = {             chat_id: process.env.TELEGRAM_CHAT_ID, text: text}

    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        body: JSON.stringify(body),
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