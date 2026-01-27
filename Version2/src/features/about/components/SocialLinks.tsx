import { Github, Linkedin } from "lucide-react";

export const SOCIAL_LINKS = [
    { icon: Github, label: "GitHub", href: "https://github.com/sairam3824", category: "social" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sairam-maruri", category: "social" },
];

export const SocialLinks = () => {
    return (
        <div className="pt-6 space-y-4">
            <p className="text-sm font-medium text-foreground">Connect with me</p>
            <div className="grid grid-cols-2 gap-4">
                {SOCIAL_LINKS.map((social, index) => (
                    <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 rounded-xl bg-card border-2 border-border hover:border-blue-500 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                        aria-label={social.label}
                    >
                        <social.icon className="w-5 h-5 text-blue-600 group-hover:text-blue-400 transition-colors" />
                        <span className="text-sm font-medium">{social.label}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};
