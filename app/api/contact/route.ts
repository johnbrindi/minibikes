import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Configure transporter — uses env vars set in .env.local
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Hustler Minibikes Contact" <${process.env.SMTP_USER}>`,
      to: 'sheltiepawspromise787@gmail.com',
      replyTo: email,
      subject: subject ? `[Contact Form] ${subject} – from ${name}` : `[Contact Form] Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #1a1a1a; border-bottom: 3px solid #c9a84c; padding-bottom: 10px; margin-bottom: 20px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
              <td style="padding: 10px 0; color: #1a1a1a;">${name}</td>
            </tr>
            <tr style="background: #f0f0f0;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 10px; color: #1a1a1a;"><a href="mailto:${email}" style="color: #c9a84c;">${email}</a></td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Subject:</td>
              <td style="padding: 10px 0; color: #1a1a1a;">${subject}</td>
            </tr>` : ''}
            <tr style="background: #f0f0f0;">
              <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Message:</td>
              <td style="padding: 10px; color: #1a1a1a; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #aaa; text-align: center;">
            Sent via Hustler Minibikes contact form • Reply directly to this email to respond to the customer.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
