"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => { const query = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)"); const update = () => setShowVideo(query.matches); update(); query.addEventListener("change", update); return () => query.removeEventListener("change", update); }, []);
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const ctx = gsap.context(() => { gsap.from("[data-hero]", { y: 55, opacity: 0, duration: 1, stagger: .11, ease: "power3.out" }); gsap.to("[data-orb]", { x: 30, y: -24, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" }); }, root); return () => ctx.revert(); }, []);
  return <section ref={root} className="relative min-h-[940px] overflow-hidden bg-[radial-gradient(circle_at_70%_25%,#173c68_0%,#0b1d33_38%,#07111f_75%)] pb-20 pt-44 md:min-h-[880px] md:pt-52">
    {showVideo && <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/0712-1.mp4" type="video/mp4"/></video>}
    <div className="absolute inset-0 bg-[#07111f]/75" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#07111f]/95 via-[#07111f]/65 to-[#07111f]/35" />
    <div data-orb className="hero-orb" /><div className="grid-lines" />
    <div className="shell relative z-10">
      <div><div data-hero className="eyebrow"><span className="pulse" /> Digital innovation studio · Sri Lanka / Worldwide</div><h1 data-hero className="mt-8 max-w-5xl font-display text-[clamp(3.5rem,9vw,8.5rem)] font-semibold leading-[.88] tracking-[-.065em]">We engineer<br/><span className="gradient-text">digital momentum.</span></h1><p data-hero className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">Strategy, design and technology working as one. We build high-performance digital products that help ambitious businesses move forward.</p><div data-hero className="mt-10 flex flex-wrap gap-4"><Link href="/contact" className="button">Start a project <ArrowUpRight size={18}/></Link><Link href="/#services" className="button button-ghost">Explore our work <ArrowDownRight size={18}/></Link></div></div>
    </div>
    <div className="shell relative z-10 mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">{[["30+","Projects delivered"],["5+","Core capabilities"],["100%","Outcome focused"],["24/7","Digital presence"]].map(([a,b])=><div className="bg-ink/80 p-6 md:p-8" key={b}><strong className="font-display text-3xl text-white md:text-4xl">{a}</strong><p className="mt-2 text-xs uppercase tracking-widest text-slate-500">{b}</p></div>)}</div>
  </section>;
}
