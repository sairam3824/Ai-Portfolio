import type { ReactNode } from "react";

type HomeSectionHeaderProps = {
    num: string;
    title: ReactNode;
    subtitle: string;
};

export const HomeSectionHeader = ({ num, title, subtitle }: HomeSectionHeaderProps) => (
    <div className="px-1">
        <p className="text-[5rem] font-light leading-none tracking-[-0.12em] text-[#ebe7de] select-none sm:text-[6rem]">
            {num}
        </p>
        <h2 className="portfolio-sans -mt-3 text-[clamp(2.4rem,4vw,3.8rem)] font-semibold tracking-[-0.06em] text-[#1b2433]">
            {title}
        </h2>
        <p className="mt-3 max-w-[42ch] text-[1.05rem] leading-8 text-[#6f7a8d]">{subtitle}</p>
    </div>
);
