import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...i: ClassValue[]) => twMerge(clsx(i));

export const WHATSAPP = "5492604017239";
export const EMAIL = "info@andex.tech";
export const INSTAGRAM = "https://www.instagram.com/andex.tech/";
export const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
