import { ejercicios } from "#site/content"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Tag } from "@/components/academia/tag"
import { MDXContent } from "@/components/academia/mdx-components"

import "./mdx.css"

interface PostPageProps {
    params: Promise<{
        slug: string[]
    }>
}

const metadataBlog = {
    author: "Agora Next"
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const sP = await params;
    const slug = sP.slug.join("/")
    const post = ejercicios.find(post => post.slugAsParams === slug)
    
    if (!post) {
        return {}
    }
    
    const ogSearchParams = new URLSearchParams();
    ogSearchParams.set("title", post.title)

    return {
        title: post.title,
        description: post.description,
        authors: { name: metadataBlog.author },
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            url: post.slug,
            images: [
                {
                    url: `/api/og?${ogSearchParams.toString()}`,
                    width: 1200,
                    height: 600,
                    alt: post.title,
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [`/api/og?${ogSearchParams.toString()}`]
        }
    }
}

export default async function PostPage(props: PostPageProps) {
    const sP = await props.params;
    const slug = sP.slug.join("/")
    const post = ejercicios.find(post => post.slugAsParams === slug)
    
    if (!post || !post.published) {
        notFound()
    }

    return <article className="container py-8 max-w-4xl mx-auto">
        <div className="bg-card border border-border/30 rounded-2xl shadow-lg shadow-primary/10 overflow-hidden">
            <div className="p-8 md:p-12 lg:px-16">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                    {post.title}
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags?.map(tag => <Tag tag={tag} key={tag} />)}
                </div>
                
                {post.description ? (
                    <p className="text-lg md:text-xl text-foreground mb-8 italic border-l-4 border-primary pl-4 py-2">
                        {post.description}
                    </p>
                ) : null}
                
                <div className="flex items-center text-sm text-foreground border-t border-border/30 pt-6 mt-6">
                    <time dateTime={post.date} className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </time>
                </div>
            </div>
            
            <div className="px-8 md:px-12 lg:px-16 pb-8">
                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-a:text-primary prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-4 hover:prose-a:text-primary/80 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:text-foreground prose-blockquote:bg-muted/10 prose-pre:bg-muted/50 prose-pre:text-foreground prose-pre:p-4 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:max-w-full prose-code:text-foreground prose-code:bg-muted/60 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-hr:border-border/30 prose-table:text-foreground prose-thead:text-foreground prose-th:text-foreground prose-td:text-foreground border-t border-border/20 pt-8">
                    <MDXContent code={post.body} />
                </div>
            </div>
        </div>
    </article>
}
