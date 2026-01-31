import { Github, Linkedin, Mail } from "lucide-react";
import BentoCard from "./BentoCard";

const AvatarCard = () => {
    return (
        <BentoCard className="col-span-12 md:col-span-4 row-span-2 items-center justify-center !bg-gradient-to-b !from-white !to-gray-50/80" delay={100}>
            <div className="w-full flex flex-col gap-3">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2 text-center">Let's Connect</h3>
                <a
                    href="https://github.com/sairam3824"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/50 hover:bg-blue-100/80 text-gray-600 hover:text-blue-700 transition-all duration-300 group ring-1 ring-blue-100/50"
                >
                    <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                        <Github className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm">github.com/sairam3824</span>
                </a>

                <a
                    href="https://www.linkedin.com/in/sairam-maruri/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/50 hover:bg-blue-100/80 text-gray-600 hover:text-blue-700 transition-all duration-300 group ring-1 ring-blue-100/50"
                >
                    <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                        <Linkedin className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm truncate">linkedin.com/in/sairam-maruri</span>
                </a>

                <a
                    href="mailto:sairam.maruri@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/50 hover:bg-blue-100/80 text-gray-600 hover:text-blue-700 transition-all duration-300 group ring-1 ring-blue-100/50"
                >
                    <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                        <Mail className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm">sairam.maruri@gmail.com</span>
                </a>
            </div>
        </BentoCard>
    );
};

export default AvatarCard;
