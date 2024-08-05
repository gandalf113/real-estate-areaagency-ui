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

    console.log('submitContactForm called with:', props, link);

    const text = `ID: ${crmId}\nCRM: ${provider}\nOgłoszenie: ${link}\n\nImię: ${name}\nEmail: ${email}\nTelefon: ${phoneNumber}\n\nWiadomość: ${message}`;
    const body = { chat_id: process.env.TELEGRAM_CHAT_ID, text: text }

    try {
        const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log('Telegram message sent successfully');
            return { success: true };
        } else {
            console.error('Error sending Telegram message:', await response.text());
            return { success: false };
        }
    } catch (error) {
        console.error('Error in submitContactForm:', error);
        return { success: false };
    }
}

export async function fetchListingImages(id: number) {
    const url = process.env.API_BASE_URL + '/listings/' + id + '/images';

    console.log('fetchListingImages called with ID:', id);

    try {
        const res = await fetch(url, { next: { revalidate: 900 } });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Error fetching listing images:', errorText);
            throw new Error('Failed to fetch data');
        }

        const json = await res.json();
        console.log('Fetched listing images successfully:', json.images);
        return json.images;
    } catch (error) {
        console.error('Error in fetchListingImages:', error);
        throw new Error('Failed to fetch data');
    }
}
