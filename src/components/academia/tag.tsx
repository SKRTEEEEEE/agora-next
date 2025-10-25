import { slug } from "github-slugger"
import { badgeVariants } from "../ui/badge";
import { Link } from "@/libs/i18n/routing";

interface TagProps {
    tag: string;
    current?: boolean;
    count?: number;
}

export function Tag({ tag, current, count }: TagProps) {
    const href = {
        pathname: "/academia/temas-ejercicios/[tema]",
        params: { tema: slug(tag) }
    } as const
    
    return <Link 
        className={badgeVariants({ 
            variant: current ? "default" : "secondary", 
            className: "no-underline rounded-md" 
        })} 
        href={href}
    >
        {tag} {count ? `( ${count} )` : null}
    </Link>
}
