// hooks/useTranslation.ts
import { usePathname } from 'next/navigation';
import translations from '@/app/translations';
import {LanguageType, Translations} from '@/types';

const useTranslation = (): Translations => {
    const lang = usePathname().split('/')[1] as LanguageType;

    const t = translations[lang] || translations['pl'];

    return t;
};

export default useTranslation;
