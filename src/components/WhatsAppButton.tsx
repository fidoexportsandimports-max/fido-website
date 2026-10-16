import { site } from "@/lib/site";

export default function WhatsAppButton() {
  const href = `https://wa.me/91${site.phone}?text=${encodeURIComponent("Hello FIDO Exports and Imports, I would like to enquire about your products.")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-4 z-40 flex items-center gap-2.5 rounded-full bg-[#25d366] px-4 py-3 text-[15px] font-bold text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition hover:scale-105 sm:right-6 sm:px-5 sm:py-3.5"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="ping-soft absolute inset-0 rounded-full bg-white/50" />
        <svg viewBox="0 0 24 24" className="relative h-6 w-6 fill-current" aria-hidden="true">
          <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31A8.2 8.2 0 1 1 12.04 20.1Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.69c-.14-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.29Z" />
        </svg>
      </span>
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
