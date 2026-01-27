import { memo } from "react";
import { Award } from "lucide-react";

const certifications = [
    {
        title: "Oracle Vector AI Search Professional",
        link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=C3418835C36967F3D176B27533502B55888A3CFBEEC3D339189559E070D0F939",
    },
    {
        title: "Oracle Generative AI Professional",
        link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=CC2371A772A07EC0926BE492904B67F3AA59912C48FE5488BAB54F87F914D350",
    },
    {
        title: "AWS Cloud Practitioner",
        link: "https://www.credly.com/badges/eeb97be1-16e8-475b-8f08-d3ffdf051f2e/linked_in_profile",
    },
    {
        title: "IBM RAG and Agentic AI Professional Certificate",
        link: "https://www.credly.com/badges/84dabd2f-4c54-4ad8-b424-8ff9ab85d263/public_url",
    },
    {
        title: "Generative AI for Project Managers Specialization",
        link: "https://www.credly.com/badges/7ecec711-00b3-4e6a-a06f-30ead5c4a6aa/public_url",
    },
    {
        title: "Azure Data Fundamentals",
        link: "https://www.credly.com/badges/3babc93b-cca9-4bde-be5a-0d55b0fcccfc/linked_in_profile",
    },
    {
        title: "Machine Learning with Python (V2) - IBM",
        link: "https://www.credly.com/badges/cd2b7f2d-9801-4b86-b8a0-11e524fda1bb/linked_in_profile",
    },
    {
        title: "AWS Educate ML Foundations",
        link: "https://www.credly.com/badges/ad0fb6d2-6602-4379-acde-8b22ed8f0480/linked_in_profile",
    },
    {
        title: "AWS Academy Cloud Foundations",
        link: "https://www.credly.com/badges/d73abe58-f04a-4288-9c30-bfbe53de87a7/linked_in_profile",
    },
    {
        title: "AWS Academy Cloud Architecting",
        link: "https://www.credly.com/badges/888243cf-190f-4e26-b059-a5a8c3842b27/linked_in_profile",
    },
    {
        title: "Data Science & Machine Learning - Coding Ninjas",
        link: "https://certificate.codingninjas.com/view/2833c71dc5a91a43",
    },
    {
        title: "Introduction to Databases - Meta (Coursera)",
        link: "https://www.coursera.org/account/accomplishments/verify/VRH7E3DRZ5DN",
    },
];

const CertificationItem = memo(({ cert }: { cert: { title: string; link: string } }) => (
    <li
        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/40 
               backdrop-blur-md border border-white/40 rounded-2xl 
               px-6 sm:px-12 py-5 transition-all duration-300 
               hover:bg-white/60 hover:border-blue-400/40 hover:scale-[1.01]
               shadow-sm gap-4 sm:gap-8"
        style={{ contentVisibility: 'auto' }}
    >
        <div className="flex items-center gap-4 sm:gap-6 flex-1 w-full">
            <span className="material-icons-outlined text-blue-500 shrink-0 text-2xl">workspace_premium</span>
            <span className="text-base md:text-lg font-medium text-gray-800 leading-tight">
                {cert.title}
            </span>
        </div>

        <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm md:text-base text-blue-600 font-bold uppercase tracking-widest
                 opacity-90 hover:opacity-100 transition-opacity hover:text-blue-700 shrink-0 self-end sm:self-center"
        >
            View <span className="material-icons-outlined text-sm">arrow_outward</span>
        </a>
    </li>
));

CertificationItem.displayName = 'CertificationItem';

export const CertificationSection = () => {
    return (
        <div className="home-container relative py-12 px-4 max-w-7xl mx-auto min-h-full">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

            {/* Header section */}
            <header className="text-center space-y-8 mb-16 animate-fade-in px-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/40 rounded-full shadow-sm">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Verified Authority</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9]">
                    The Credential <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Vault.
                    </span>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                    Industry-recognized certifications validating technical mastery across cloud architectures and AI systems.
                </p>
            </header>

            <ul className="max-w-5xl mx-auto space-y-4 px-2 pb-12 animate-fade-in relative z-10">
                {certifications.map((cert, index) => (
                    <CertificationItem key={index} cert={cert} />
                ))}
            </ul>

            {/* Journey Footer */}
            <footer className="mt-12 text-center pb-20 animate-fade-in text-gray-400">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
                    <span className="w-16 h-px bg-gray-200" />
                    B.Tech CS • VIT • 2022-2026
                    <span className="w-16 h-px bg-gray-200" />
                </p>
            </footer>
        </div>
    );
};

export default CertificationSection;
