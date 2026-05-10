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

    return (
        <article className="container relative max-w-3xl py-6 lg:py-10 mx-auto">
            <div>
                {post.date && (
                    <time
                        dateTime={post.date}
                        className="block text-sm text-muted-foreground mb-2"
                    >
                        {new Date(post.date).toLocaleDateString()}
                    </time>
                )}
                <h1 className="mt-2 inline-block font-heading text-4xl font-bold leading-tight lg:text-5xl mb-4">
                    {post.title}
                </h1>
                <div className="flex gap-2 mb-4 mt-2">
                    {post.tags?.map(tag => <Tag tag={tag} key={tag} />)}
                </div>
                {post.description ? (
                    <p className="text-xl text-muted-foreground mt-4 mb-8">
                        {post.description}
                    </p>
                ) : null}
            </div>
            
            <hr className="my-8 border-muted" />
            <MDXContent code={post.body} />
        </article>
    )
}
