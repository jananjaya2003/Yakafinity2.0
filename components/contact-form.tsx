"use client";
import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { services } from "@/lib/site-data";

export function ContactForm(){
 const [state,setState]=useState<"idle"|"loading"|"success"|"error">("idle");
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setState("loading");const form=new FormData(e.currentTarget);const payload=Object.fromEntries(form.entries());const res=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});setState(res.ok?"success":"error");if(res.ok)e.currentTarget.reset();}
 if(state==="success")return <div className="glass-card grid min-h-[460px] place-items-center text-center"><div><CheckCircle2 size={52} className="mx-auto text-aqua"/><h2 className="mt-6 font-display text-3xl">Message received.</h2><p className="mt-4 text-slate-400">Thank you. We’ll review your project and respond within one business day.</p><button onClick={()=>setState("idle")} className="button button-ghost mt-8">Send another</button></div></div>;
 return <form onSubmit={submit} className="glass-card grid gap-5 sm:grid-cols-2">
  <label className="text-xs uppercase tracking-widest text-slate-400">Your name *<input required name="name" className="field mt-2 normal-case tracking-normal" placeholder="Full name"/></label>
  <label className="text-xs uppercase tracking-widest text-slate-400">Work email *<input required type="email" name="email" className="field mt-2 normal-case tracking-normal" placeholder="you@company.com"/></label>
  <label className="text-xs uppercase tracking-widest text-slate-400">Phone<input name="phone" className="field mt-2 normal-case tracking-normal" placeholder="+94 ..."/></label>
  <label className="text-xs uppercase tracking-widest text-slate-400">Company<input name="company" className="field mt-2 normal-case tracking-normal" placeholder="Company name"/></label>
  <label className="text-xs uppercase tracking-widest text-slate-400">Service *<select required name="service" defaultValue="" className="field mt-2 normal-case tracking-normal"><option value="" disabled>Select a service</option>{services.map(s=><option key={s.slug}>{s.title}</option>)}</select></label>
  <label className="text-xs uppercase tracking-widest text-slate-400">Estimated budget<select name="budget" className="field mt-2 normal-case tracking-normal"><option>Not sure yet</option><option>LKR 50k – 150k</option><option>LKR 150k – 500k</option><option>LKR 500k+</option></select></label>
  <label className="text-xs uppercase tracking-widest text-slate-400 sm:col-span-2">Tell us about the project *<textarea required minLength={20} name="message" rows={6} className="field mt-2 resize-none normal-case tracking-normal" placeholder="What are you looking to build, and what should it achieve?"/></label>
  <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4"><p className="text-xs text-slate-500">By submitting, you agree to be contacted about this enquiry.</p><button disabled={state==="loading"} className="button" type="submit">{state==="loading"?<Loader2 className="animate-spin" size={18}/>:<>Send enquiry <ArrowUpRight size={18}/></>}</button></div>{state==="error"&&<p className="text-sm text-red-300 sm:col-span-2">Something went wrong. Please check the fields and try again.</p>}
 </form>
}
