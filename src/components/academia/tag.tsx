import slugify from "slugify"
import { badgeVariants } from "../ui/badge";
import { Link } from "@/lib/i18n/routing";

// Helper function to match github-slugger behavior
function slug(text: string): string {
  return slugify(text, { lower: true, strict: true })
}

interface TagProps {
    tag: string;
    current?: boolean;
    count?: number;
}

export function Tag({ tag, current, count }: TagProps) {
    const href = {
        pathname: "/temas-ejercicios/[tema]",
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
