import { BreadCrumbsProps } from "@interfaces/interface-items";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Breadcumbs = ({ title, breadCrumbs }: BreadCrumbsProps) => {
    return (
        <>
            <h1 className="text-[20px] font-bold mb-2">{title}</h1>
            <ol className="inline-flex text-sm items-center space-x-1 md:space-x-2">
            {breadCrumbs.map((item, index) => (
                <li className="inline-flex items-center" key={index}>
                    {index !== 0 ? (
                        <Link
                            href={item.url}
                            className="text-[12px] text-gold dark:text-blonde font-semibold"
                        >
                            {item.name}
                        </Link>
                    ) : (
                        <span
                            className="text-[12px] cursor-not-allowed"
                            aria-disabled="true"
                        >
                            {item.name}
                        </span>
                    )}
                    {breadCrumbs.length - 1 !== index && (
                        <ChevronRight className="ml-2" size={14}/>
                    )}
                </li>
            ))}
            </ol>
        </>
    );
};

export default Breadcumbs;