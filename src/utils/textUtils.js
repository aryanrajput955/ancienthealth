
export const stripHtml = (html) => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const text = doc.body.textContent || "";
    // Replace non-breaking spaces (\u00A0) with regular spaces and collapse multiple spaces
    return text.replace(/[\u00A0\s]+/g, ' ').trim();
}
