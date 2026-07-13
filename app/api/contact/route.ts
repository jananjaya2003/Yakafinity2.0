import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { createLead } from "@/lib/leads";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().email().max(120),
  phone: z.string().max(40).optional(),
  company: z.string().max(100).optional(),
  service: z.string().min(2).max(100),
  budget: z.string().max(80).optional(),
  message: z.string().trim().min(20).max(3000),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const lead = await createLead(body);

    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || "Yakafinity <onboarding@resend.dev>",
        to: process.env.CONTACT_TO_EMAIL,
        replyTo: body.email,
        subject: `New ${body.service} enquiry from ${body.name}`,
        text: `Name: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone || "—"}\nCompany: ${body.company || "—"}\nBudget: ${body.budget || "—"}\n\n${body.message}`,
      });

      if (error) throw new Error(`Email delivery failed: ${error.message}`);
    }

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", issues: error.issues }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Unable to submit enquiry" }, { status: 500 });
  }
}
