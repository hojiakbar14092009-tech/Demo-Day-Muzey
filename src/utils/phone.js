/** Turns a display phone number ("+33 1 40 20 53 17") into a tel: link. */
export const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`
