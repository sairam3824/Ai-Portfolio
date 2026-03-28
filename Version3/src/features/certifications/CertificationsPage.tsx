import { ArrowRight, ArrowUpRight } from "lucide-react";
import Seo from "../../shared/Seo";
import { certifications } from "./certificationsData";
import { profileDetails } from "@/data/siteMetadata";

const providerCount = new Set(
    certifications.map((certification) => {
        if (certification.title.startsWith("AWS")) return "AWS";
        if (certification.title.startsWith("Oracle")) return "Oracle";
        if (certification.title.startsWith("IBM")) return "IBM";
        if (certification.title.startsWith("Azure")) return "Microsoft";
        if (certification.title.startsWith("Machine Learning with Python")) return "IBM";
        if (certification.title.startsWith("Introduction to Databases")) return "Meta";
        if (certification.title.includes("Coding Ninjas")) return "Coding Ninjas";
        return certification.title.split(" ")[0];
    }),
).size;

const cloudCredentials = certifications.filter((certification) =>
    /(AWS|Azure|Cloud|Oracle|Databases)/i.test(certification.title),
).length;

const aiCredentials = certifications.filter((certification) =>
    /(AI|ML|Machine Learning|RAG|Vector|Generative)/i.test(certification.title),
).length;

const CertificationsPage = () => {
    return (
        <div className="flex flex-col gap-8">
            <Seo
                title="Certifications | Sai Ram Maruri — Cloud & AI"
                description="Professional certifications by Sai Ram Maruri across AWS, Oracle, IBM, Azure, cloud systems, vector search, RAG, and generative AI."
                keywords={["AWS Certification", "Oracle GenAI Certification", "Oracle AI Vector Search", "IBM RAG Certification", "Azure Certification", "AI Certifications India", "Cloud Certifications", "Sai Ram Maruri Certifications"]}
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Certifications", url: "/certifications" },
                ]}
            />

            <section className="rounded-[2.8rem] border border-[#e3ded2] bg-[linear-gradient(180deg,#fcfaf5_0%,#f7f2e8_100%)] px-6 py-8 shadow-[0_24px_80px_rgba(36,32,20,0.05)] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[#868071]">
                    Certifications / Verified Proof
                </p>

                <div className="mt-8 max-w-[1080px]">
                    <h1 className="portfolio-sans max-w-[10ch] text-[clamp(3.4rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-[#11100c]">
                        Credentials that back the work.
                    </h1>
                    <p className="mt-7 max-w-[44ch] text-[clamp(1.05rem,1.8vw,1.4rem)] leading-[1.6] text-[#6f695c]">
                        A portfolio of cloud, AI, vector search, and systems certifications that supports the projects, experiments, and product work shown across this site.
                    </p>
                </div>

                <div className="mt-10">
                    <a
                        href={profileDetails.socials.credly}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#ff6b00] px-6 py-3 text-[0.92rem] font-semibold text-white shadow-[0_8px_24px_rgba(255,107,0,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,107,0,0.35)]"
                    >
                        View my Credly Profile <ArrowUpRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-[1.8rem] border border-[#e3dccf] bg-[#fffdf8] px-5 py-5">
                        <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#81806e]">Total Credentials</p>
                        <p className="mt-3 text-[3rem] font-semibold leading-none tracking-[-0.08em] text-[#11100c]">{certifications.length}</p>
                        <p className="mt-3 text-[0.98rem] leading-7 text-[#6f695c]">Professional proof points collected across cloud, infrastructure, and generative AI.</p>
                    </div>
                    <div className="rounded-[1.8rem] border border-[#e3dccf] bg-[#fffdf8] px-5 py-5">
                        <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#81806e]">Organizations</p>
                        <p className="mt-3 text-[3rem] font-semibold leading-none tracking-[-0.08em] text-[#11100c]">{providerCount}+</p>
                        <p className="mt-3 text-[0.98rem] leading-7 text-[#6f695c]">Issued by AWS, Oracle, IBM, Microsoft, Meta, and other learning platforms.</p>
                    </div>
                    <div className="rounded-[1.8rem] border border-[#e3dccf] bg-[#fffdf8] px-5 py-5">
                        <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#81806e]">Focus Areas</p>
                        <p className="mt-3 text-[1.8rem] font-semibold leading-tight tracking-[-0.05em] text-[#11100c]">{aiCredentials} AI-focused and {cloudCredentials} cloud-focused credentials.</p>
                    </div>
                </div>
            </section>

            <section className="border-t border-[#e1dbcf] pt-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[4.5rem] font-light leading-none tracking-[-0.1em] text-[#ebe7de]">01</p>
                        <h2 className="portfolio-sans -mt-2 text-[clamp(2.2rem,3.8vw,3.6rem)] font-semibold tracking-[-0.06em] text-[#1b2433]">
                            Full Library
                            <span className="text-[#4c74ff]">.</span>
                        </h2>
                    </div>
                    <p className="max-w-[36ch] text-[1.05rem] leading-8 text-[#6f7a8d]">
                        Every certification in one place, kept simple and easy to verify.
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    {certifications.map((certification, index) => (
                        <a
                            key={certification.title}
                            href={certification.link}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center justify-between gap-4 rounded-[1.8rem] border border-[#e3dccf] bg-[#fffdf8] px-6 py-5 shadow-[0_12px_34px_rgba(61,52,36,0.04)] transition-transform duration-200 hover:-translate-y-0.5"
                        >
                            <div className="min-w-0">
                                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#8e97a8]">
                                    {String(index + 1).padStart(2, "0")}
                                </p>
                                <p className="mt-2 text-[1.05rem] font-semibold leading-7 text-[#243042] transition-colors group-hover:text-[#4c74ff]">
                                    {certification.title}
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-2 text-[0.88rem] font-semibold text-[#243042] transition-colors group-hover:text-[#4c74ff]">
                                View
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CertificationsPage;
