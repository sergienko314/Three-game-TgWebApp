import { useEffect } from 'react';
export const tg = window.Telegram.WebApp;
export const userId = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_ADMIN : tg.initDataUnsafe.user?.id
export const userName = tg.initDataUnsafe.user?.username && tg.initDataUnsafe.user?.username !== '' ? tg.initDataUnsafe.user?.username : null
export const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
export const userAdmin = String(process.env.REACT_APP_ADMIN) === String(userId)
export const URL_SITE = process.env.REACT_APP_URL_SITE

export const ApiSite = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3002'
    : URL_SITE;

tg.expand();



const Helper = () => {

    const displayIsExpanded = tg.isExpanded
    useEffect(() => {
        tg.expand();

    }, [displayIsExpanded])

}
export default Helper