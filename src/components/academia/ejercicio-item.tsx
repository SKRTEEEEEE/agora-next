import { Calendar } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Tag } from "./tag";
import { Link } from "@/lib/i18n/routing";

interface PostItemProps {
    slug: string;
    title: string;
    description?: string;
    date: string;
    tags?: Array<string>
}

export function EjercicioItem({ slug, title, description, date, tags }: PostItemProps) {
    // Remove 'ejercicios/' prefix if present and split the rest
    const slugParts = slug.startsWith("ejercicios/") 
        ? slug.substring("ejercicios/".length).split("/")
        : slug.split("/")
    
    const href = {
        pathname: "/ejercicios/[...slug]",
        params: { slug: slugParts }
    } as const
    
    return <article className="group relative bg-card border border-border/30 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10"></div>
        
        <div className="mb-4">
            <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                <Link href={href} className="block">
                    {title}
                </Link>
            </h2>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
            {tags?.map(tag => <Tag tag={tag} key={tag} />)}
        </div>
        
        <div className="max-w-none text-foreground mb-6 min-h-[60px]">
            {description}
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/20">
            <dl className="flex items-center gap-2">
                <dt className="sr-only">Published On</dt>
                <Calendar className="h-4 w-4 text-foreground" />
                <dd className="text-sm font-medium text-foreground">
                    <time dateTime={date}>{formatDate(date)}</time>
                </dd>
            </dl>
            <Link 
                href={href} 
                className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }), 
                    "group-hover:border-primary group-hover:text-primary transition-colors"
                )}
            >
                <span>Read more</span>
                <span className="ml-2 transition-transform group-hover:translate-x-1">➡️</span>
            </Link>
        </div>
    </article>
}
