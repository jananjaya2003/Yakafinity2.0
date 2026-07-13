"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Bot, ImagePlus, Loader2, Send, Sparkles, X } from "lucide-react";

type Message = { role: "user" | "assistant"; text: string };
type AttachedImage = { name: string; preview: string; mimeType: "image/jpeg" | "image/png" | "image/webp" | "image/gif"; data: string };

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: "Hi! Ask me a question or attach an image for analysis." }]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<AttachedImage>();
  const [loading, setLoading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  function attach(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) || file.size > 7_000_000) return;
    const reader = new FileReader();
    reader.onload = () => {
      const preview = String(reader.result);
      setImage({ name: file.name, preview, mimeType: file.type as AttachedImage["mimeType"], data: preview.split(",")[1] });
    };
    reader.readAsDataURL(file);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const prompt = input.trim() || (image ? "Describe and analyze this image." : "");
    if (!prompt || loading) return;
    setMessages(current => [...current, { role: "user", text: image ? `${prompt} 📎 ${image.name}` : prompt }]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: prompt, image: image ? { mimeType: image.mimeType, data: image.data } : undefined }) });
      const data = await response.json();
      setMessages(current => [...current, { role: "assistant", text: response.ok ? data.answer : data.error || "I couldn't complete that request." }]);
    } catch {
      setMessages(current => [...current, { role: "assistant", text: "The AI service is temporarily unavailable." }]);
    } finally {
      setImage(undefined);
      if (fileInput.current) fileInput.current.value = "";
      setLoading(false);
    }
  }

  return <>
    {open && <section aria-label="Yakafinity AI assistant" className="fixed bottom-24 right-4 z-[60] flex h-[min(650px,calc(100dvh-120px))] w-[min(420px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#07111f]/95 text-white shadow-[0_24px_90px_rgba(0,0,0,.5)] backdrop-blur-2xl sm:bottom-28 sm:right-7">
      <header className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-electric/20 to-aqua/10 px-5 py-4">
        <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-electric to-aqua text-ink"><Bot size={21}/></span><div><h2 className="font-display font-bold">Yakafinity AI</h2><p className="text-[11px] text-aqua">Powered by Gemini</p></div></div>
        <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label="Close AI assistant"><X size={19}/></button>
      </header>
      <div className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
        {messages.map((message, index) => <div key={index} className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "ml-auto rounded-br-md bg-electric text-white" : "rounded-bl-md border border-white/10 bg-white/5 text-slate-200"}`}>{message.text}</div>)}
        {loading && <div className="flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300"><Loader2 size={16} className="animate-spin"/> Thinking…</div>}
      </div>
      {image && <div className="mx-4 mb-2 flex items-center gap-3 rounded-xl border border-aqua/30 bg-aqua/10 p-2"><img src={image.preview} alt="Attached preview" className="h-12 w-12 rounded-lg object-cover"/><span className="min-w-0 flex-1 truncate text-xs">{image.name}</span><button onClick={() => setImage(undefined)} aria-label="Remove image"><X size={16}/></button></div>}
      <form onSubmit={submit} className="border-t border-white/10 p-3"><div className="flex items-end gap-2 rounded-2xl border border-white/15 bg-white/5 p-2 focus-within:border-aqua/60"><input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={attach} className="hidden"/><button type="button" onClick={() => fileInput.current?.click()} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-slate-300 hover:bg-white/10 hover:text-aqua" aria-label="Attach image"><ImagePlus size={20}/></button><textarea value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} rows={1} placeholder="Ask anything…" className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-1 py-2 text-sm text-white outline-none placeholder:text-slate-500"/><button disabled={loading || (!input.trim() && !image)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-aqua text-ink disabled:opacity-40" aria-label="Send message"><Send size={18}/></button></div><p className="mt-2 text-center text-[10px] text-slate-500">Images up to 7 MB · AI can make mistakes</p></form>
    </section>}
    <button onClick={() => setOpen(value => !value)} className="fixed bottom-24 right-5 z-50 grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-gradient-to-br from-electric to-aqua text-white shadow-[0_14px_40px_rgba(79,124,255,.4)] transition-transform hover:-translate-y-1 sm:bottom-28 sm:right-7" aria-label={open ? "Close AI assistant" : "Open AI assistant"}>{open ? <X/> : <Sparkles/>}</button>
  </>;
}
