import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Seo from "./shared/Seo";

const NotFoundPage = () => {
    return (
        <div className="relative overflow-hidden rounded-[2.8rem] border border-[#e3ded2] bg-[linear-gradient(180deg,#fcfaf5_0%,#f7f2e8_100%)] px-6 py-14 text-center shadow-[0_24px_80px_rgba(36,32,20,0.05)] sm:px-10 sm:py-16 lg:px-14">
            <Seo
                title="404 | Sai Ram Maruri"
                description="The page you are looking for could not be found."
                robots="noindex,follow"
            />
            <div className="pointer-events-none absolute left-6 top-6 text-[5rem] font-light leading-none tracking-[-0.12em] text-[#ece7db] sm:text-[7rem]">
                404
            </div>

            <div className="relative mx-auto max-w-[44rem]">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[#868071]">
                    Page Not Found
                </p>
                <h1 className="portfolio-sans mt-10 text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-[#11100c]">
                    This page does not exist.
                </h1>
                <p className="mx-auto mt-8 max-w-[34ch] text-[1.08rem] leading-8 text-[#6f695c]">
                    The route you tried to open is not part of this portfolio. Use the main navigation to continue exploring.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-full bg-[#dbe7ae] px-7 py-4 text-base font-semibold text-[#17150f] transition-transform duration-200 hover:-translate-y-0.5"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back Home
                    </Link>
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 rounded-full border border-[#d7d0c4] bg-white px-7 py-4 text-base font-semibold text-[#17150f] transition-transform duration-200 hover:-translate-y-0.5"
                    >
                        View Projects
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
