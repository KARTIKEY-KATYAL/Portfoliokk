import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["kartikeykatyal2003@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f9fafb; color: #222; padding: 32px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
              <tr>
                <td style="padding: 32px 32px 16px 32px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                  <h1 style="margin: 0; color: #0ea5e9; font-size: 2rem; letter-spacing: 1px;">Portfolio Contact</h1>
                  <p style="margin: 8px 0 0 0; color: #64748b; font-size: 1rem;">You have a new message from your portfolio website.</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 24px 32px 8px 32px;">
                  <h2 style="margin: 0 0 16px 0; font-size: 1.2rem; color: #222;">Contact Details</h2>
                  <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 1rem;">
                    <tr>
                      <td style="padding: 4px 0; color: #64748b; width: 90px;">Name:</td>
                      <td style="padding: 4px 0; color: #222; font-weight: 500;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 4px 0; color: #64748b;">Email:</td>
                      <td style="padding: 4px 0;"><a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a></td>
                    </tr>
                  </table>
                  <h2 style="margin: 24px 0 8px 0; font-size: 1.2rem; color: #222;">Message</h2>
                  <div style="background: #f1f5f9; padding: 18px 20px; border-radius: 8px; color: #222; font-size: 1rem; white-space: pre-line; line-height: 1.6;">
                    ${message}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 24px 32px 24px 32px; text-align: center; color: #94a3b8; font-size: 0.95rem; border-top: 1px solid #f0f0f0;">
                  <p style="margin: 0;">&copy; ${new Date().getFullYear()} Kartikey Katyal Portfolio</p>
                </td>
              </tr>
            </table>
          </div>
        `,
    });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
