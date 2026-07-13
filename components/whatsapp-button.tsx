const whatsappUrl = "https://wa.me/94721005844?text=Hi%2CCan%20I%20get%20details%3F";

export function WhatsAppButton() {
  return <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Yakafinity on WhatsApp"
    className="group fixed bottom-5 right-5 z-50 flex min-h-14 items-center gap-3 rounded-full border border-white/20 bg-[#25D366] px-4 text-sm font-bold text-white shadow-[0_14px_40px_rgba(37,211,102,.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_18px_50px_rgba(37,211,102,.5)] sm:bottom-7 sm:right-7 sm:px-5"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current transition-transform duration-300 group-hover:scale-110">
      <path d="M12.04 2a9.84 9.84 0 0 0-8.43 14.91L2 22l5.22-1.58A9.91 9.91 0 1 0 12.04 2Zm0 17.98a8.04 8.04 0 0 1-4.1-1.12l-.3-.18-3.1.94.96-3.02-.2-.31a8.12 8.12 0 1 1 6.74 3.69Zm4.45-6.08c-.24-.12-1.44-.71-1.66-.79-.23-.08-.39-.12-.55.12-.16.25-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21a7.42 7.42 0 0 1-1.36-1.69c-.14-.24-.01-.37.11-.49.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.75-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.7 2.6 4.13 3.65.57.25 1.02.4 1.37.51.58.19 1.11.16 1.52.1.47-.07 1.44-.59 1.64-1.16.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.46-.28Z" />
    </svg>
    <span className="hidden sm:inline">WhatsApp</span>
  </a>;
}
