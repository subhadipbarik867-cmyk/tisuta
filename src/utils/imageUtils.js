// src/utils/imageUtils.js
// Safe image URL extractor handling both string URLs, object structures, and local assets

export const getImgUrl = (img) => {
    if (!img) return '';
    let url = '';
    if (typeof img === 'string') {
        url = img;
    } else if (typeof img === 'object') {
        if (img.url && typeof img.url === 'string') {
            url = img.url;
        } else if (img.image) {
            return getImgUrl(img.image);
        }
    }

    if (!url) return '';
    
    // Automatically prepend Vite BASE_URL for local public assets if not already prefixed
    if (url.startsWith('/images/')) {
        const base = import.meta.env.BASE_URL || '/';
        return `${base.replace(/\/$/, '')}${url}`;
    }
    
    return url;
};

export default getImgUrl;
