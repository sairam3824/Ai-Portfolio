import { useState } from "react";
import { ArrowUpRight, Bot, Brain, Cloud, Code2, Github, Linkedin, Mail, MessageSquare, Phone, Shield, Zap } from "lucide-react";
import Seo from "@/shared/Seo";
import { profileDetails } from "@/data/siteMetadata";
import { MessageDialog } from "@/features/contact/MessageDialog";

const socials = [
    { label: "GitHub", href: profileDetails.socials.github, icon: Github, handle: "github.com/sairam3824" },
    { label: "LinkedIn", href: profileDetails.socials.linkedin, icon: Linkedin, handle: "linkedin.com/in/sairam-maruri" },
] as const;

export const ContactPage = () => {
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);

    return (
        <>
            <Seo
                title={`${profileDetails.name} | Contact`}
                description="Contact page for Sai Ram Maruri with direct reach-out options, secure message dialog, and social links."
                pageType="ContactPage"
                keywords={[
                    "Contact Sai Ram Maruri",
                    "Hire GenAI Engineer",
                    "AI Engineer Contact",
                    "ML Engineer India",
                    "Portfolio Contact Page",
                ]}
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Contact", url: "/contact" },
                ]}
            />

            <div className="flex flex-col gap-6">
                {/* ═══ HERO ═══ */}
                <section>
                    <div className="relative overflow-hidden rounded-[2.8rem] bg-[linear-gradient(180deg,#fbf8f1_0%,#f4eee1_100%)] px-6 py-8 shadow-[0_24px_80px_rgba(61,52,36,0.05)] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                        <div className="pointer-events-none absolute left-[8%] top-10 h-40 w-40 rounded-full bg-[#dce6b8]/45 blur-3xl" />
                        <div className="pointer-events-none absolute right-[8%] top-24 h-40 w-40 rounded-full bg-[#e6dbc2]/65 blur-3xl" />

                        <p className="relative text-sm font-semibold uppercase tracking-[0.24em] text-[#798255]">Contact</p>

                        <div className="relative mt-6 max-w-[1100px]">
                            <h1 className="portfolio-sans text-[clamp(4rem,10vw,8rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-[#11100c]">
                                Start a conversation.{" "}
                                <span className="bg-[linear-gradient(180deg,#72873a_0%,#5a6f1f_100%)] bg-clip-text text-transparent">
                                    Build something real.
                                </span>
                            </h1>
                            <p className="mt-8 max-w-[46ch] text-[clamp(1.12rem,1.9vw,1.55rem)] leading-[1.6] text-[#6f695c]">
                                Reach out for GenAI product work, engineering collaborations, system design conversations, or anything interesting you want to ship next.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ═══ MESSAGE + CHANNELS + SOCIALS ═══ */}
                <section>
                    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                        {/* Left — message CTA */}
                        <button
                            type="button"
                            onClick={() => setMessageDialogOpen(true)}
                            className="group relative overflow-hidden rounded-[2.4rem] bg-[linear-gradient(135deg,#6f862a_0%,#5d7414_100%)] px-8 py-9 text-left text-white shadow-[0_24px_70px_rgba(93,116,20,0.28)] transition-transform duration-200 hover:-translate-y-1"
                        >
                            <div className="pointer-events-none absolute -right-10 -top-6 text-[13rem] text-white/10">
                                <MessageSquare className="h-48 w-48" />
                            </div>

                            <div className="relative max-w-[34rem]">
                                <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-white/15">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <h2 className="mt-8 portfolio-sans text-[clamp(2.2rem,4vw,4.6rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
                                    Send a secure message.
                                </h2>
                                <p className="mt-6 text-lg leading-8 text-white/85">
                                    Open the private message dialog for collaboration proposals, technical questions, feedback, or portfolio inquiries.
                                </p>

                                <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#5d7414]">
                                    Write a Message
                                    <ArrowUpRight className="h-4 w-4" />
                                </div>
                            </div>
                        </button>

                        {/* Right — channels + socials stacked */}
                        <div className="grid gap-6">
                            {/* Channels */}
                            <article className="rounded-[2.2rem] border border-[#e3dccf] bg-[#fffdf8] px-7 py-7 shadow-[0_20px_60px_rgba(61,52,36,0.05)] transition-transform duration-200 hover:-translate-y-1">
                                <div className="flex items-center gap-3">
                                    <Shield className="h-5 w-5 text-[#5d7414]" />
                                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#798255]">Channels</p>
                                </div>

                                <div className="mt-6 grid gap-4">
                                    <a
                                        href={`mailto:${profileDetails.email}`}
                                        className="group flex items-center gap-4 rounded-[1.5rem] border border-[#e3dccf] bg-[#fbfaf6] px-5 py-4 transition-all duration-200 hover:-translate-y-1 hover:border-[#5d7414]/30"
                                    >
                                        <Mail className="h-5 w-5 text-[#5d7414]" />
                                        <span className="text-base font-semibold text-[#17150f] group-hover:text-[#5d7414] transition-colors">{profileDetails.email}</span>
                                    </a>

                                    <a
                                        href={`tel:${profileDetails.phone.replace(/\s+/g, "")}`}
                                        className="group flex items-center gap-4 rounded-[1.5rem] border border-[#e3dccf] bg-[#fbfaf6] px-5 py-4 transition-all duration-200 hover:-translate-y-1 hover:border-[#5d7414]/30"
                                    >
                                        <Phone className="h-5 w-5 text-[#5d7414]" />
                                        <span className="text-base font-semibold text-[#17150f] group-hover:text-[#5d7414] transition-colors">{profileDetails.phone}</span>
                                    </a>
                                </div>
                            </article>

                            {/* Socials */}
                            <article className="rounded-[2.2rem] border border-[#e3dccf] bg-[#fffdf8] px-7 py-7 shadow-[0_20px_60px_rgba(61,52,36,0.05)] transition-transform duration-200 hover:-translate-y-1">
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#798255]">Socials</p>
                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    {socials.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group flex flex-col items-center gap-3 rounded-[1.5rem] border border-[#e3dccf] bg-[#fbfaf6] px-4 py-5 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#5d7414]/30"
                                        >
                                            <social.icon className="h-5 w-5 text-[#5d7414]" />
                                            <span className="text-sm font-semibold text-[#17150f] group-hover:text-[#5d7414] transition-colors">
                                                {social.handle}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                {/* ═══ WHAT I WORK ON ═══ */}
                <section>
                    <div className="rounded-[2.2rem] border border-[#e3dccf] bg-[#fffdf8] px-7 py-8 shadow-[0_20px_60px_rgba(61,52,36,0.05)] sm:px-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#798255]">What I Work On</p>
                        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                            {([
                                { icon: Brain, label: "GenAI Products", desc: "LLM-powered apps & SaaS" },
                                { icon: Bot, label: "AI Agents", desc: "Agentic workflows & A2A" },
                                { icon: Code2, label: "Full-Stack Dev", desc: "React, Node, Python" },
                                { icon: Cloud, label: "Cloud & DevOps", desc: "AWS, Docker, CI/CD" },
                                { icon: Zap, label: "System Design", desc: "Scalable architectures" },
                            ] as const).map((item) => (
                                <div key={item.label} className="flex items-start gap-3">
                                    <item.icon className="h-5 w-5 shrink-0 mt-0.5 text-[#5d7414]" />
                                    <div>
                                        <p className="text-[0.95rem] font-semibold text-[#17150f]">{item.label}</p>
                                        <p className="mt-0.5 text-[0.82rem] text-[#8a8377]">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <MessageDialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen} />
        </>
    );
};

export default ContactPage;
