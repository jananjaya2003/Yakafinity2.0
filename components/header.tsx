"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site-data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("yakafinity-theme");
    const useLight = saved === "light" || (!saved && window.matchMedia("(prefers-color-scheme: light)").matches);
    setLight(useLight);
    document.documentElement.classList.toggle("light", useLight);
  }, []);

  function toggleTheme() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("yakafinity-theme", next ? "light" : "dark");
  }

  return <header className="site-header fixed inset-x-0 top-0 z-50">
    <div className="relative flex h-24 w-full items-center justify-between rounded-b-[28px] border-x border-b border-white/15 bg-[#07111f] px-5 shadow-[0_18px_60px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-2xl sm:px-8 lg:bg-[#07111f]/80 lg:px-[max(40px,calc((100vw-1180px)/2))]">
      <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-aqua/70 to-transparent" />
      <Link href="/" className="group flex items-center gap-3 font-display text-lg font-bold tracking-[.16em]">
        <Image src="/yakafinity-logo.png" width={108} height={108} sizes="108px" quality={70} priority alt="Yakafinity logo" className="h-[108px] w-[108px] rounded-2xl object-cover drop-shadow-[0_0_18px_rgba(96,230,210,.22)] transition-transform duration-300 group-hover:scale-105" />
        <span className="hidden sm:inline">YAKAFINITY</span>
      </Link>
      <div className="hidden items-center gap-3 lg:flex"><nav className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[.035] p-1.5">
        {nav.map(n => <Link className="rounded-full px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white" key={n.label} href={n.href}>{n.label}</Link>)}
        <Link href="/contact" className="ml-1 inline-flex min-h-10 items-center gap-2 rounded-full bg-gradient-to-r from-white to-slate-200 px-5 text-sm font-bold text-ink shadow-lg shadow-electric/10 transition-transform hover:-translate-y-0.5">Start a project <span>↗</span></Link>
      </nav><button onClick={toggleTheme} className="theme-toggle grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:rotate-6 hover:bg-white/10" aria-label={light ? "Switch to night mode" : "Switch to day mode"} title={light ? "Night mode" : "Day mode"}>{light ? <Moon size={20}/> : <Sun size={20}/>}</button></div>
      <div className="flex items-center gap-2 lg:hidden"><button onClick={toggleTheme} className="theme-toggle grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5" aria-label={light ? "Switch to night mode" : "Switch to day mode"}>{light ? <Moon size={20}/> : <Sun size={20}/>}</button><button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button></div>
    </div>
    {open && <nav className="shell mt-2 max-h-[calc(100dvh-120px)] overflow-y-auto rounded-3xl border border-white/10 bg-[#07111f]/95 px-6 py-6 shadow-2xl backdrop-blur-2xl lg:hidden">
      {nav.map(n => <Link onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-lg transition-colors hover:bg-white/5" key={n.label} href={n.href}>{n.label}</Link>)}
      <Link onClick={() => setOpen(false)} href="/contact" className="button mt-4 w-full">Start a project</Link>
    </nav>}
  </header>;
}
