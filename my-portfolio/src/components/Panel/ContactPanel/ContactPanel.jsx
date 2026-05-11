import { useState } from "react";
import emailjs from "@emailjs/browser";
import PanelShell from "../PanelShell";
import "./ContactPanel.css";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ICONS = {
  github:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  email: "https://api.iconify.design/mdi/email.svg?color=ffffff",
  linkedin:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg",
};

export default function ContactPanel() {
  const [form, setForm] = useState({ email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("sent");
      setForm({ email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <PanelShell name="CONTACT">
      <div className="contact-layout">
        <div className="contact-info">
          <h3 className="contact-heading">Have a project in mind?</h3>
          <p className="contact-sub">
            My inbox is always open for new opportunities.
          </p>
          <ul className="contact-links">
            <li>
              <a
                href="https://github.com/Fluotop"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={ICONS.github} alt="" className="contact-icon" />
                <span>Fluotop</span>
              </a>
            </li>
            <li>
              <a href="mailto:bendm77@gmail.com">
                <img src={ICONS.email} alt="" className="contact-icon" />
                <span>bendm77@gmail.com</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ben-de-maesschalck/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={ICONS.linkedin} alt="" className="contact-icon" />
                <span>Ben De Maesschalck</span>
              </a>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="contact-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="contact-field">
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </label>
          <label className="contact-field">
            <span>Message</span>
            <textarea
              name="message"
              rows="2"
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>
          <button
            type="submit"
            className="contact-submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Submit"}
          </button>
          {status === "sent" && (
            <p className="contact-status contact-status-success">
              Thanks — I'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="contact-status contact-status-error">
              Something went wrong. Please try again or email me directly.
            </p>
          )}
        </form>
      </div>
    </PanelShell>
  );
}
