import { ejercicios } from "#site/content"
import { EjercicioItem } from "@/components/academia/ejercicio-item";
import { QueryPagination } from "@/components/academia/query-pagination";
import { Tag } from "@/components/academia/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, getEjerciciosByLocale, sortPosts, sortTagsByCount, Locale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

const POSTS_PAGE = 5;

interface BlogPageProps {
    params: Promise<{
        locale: Locale;
    }>;
    searchParams: Promise<{
        page?: string;
    }>;
}

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}) {
    const {locale} = await params;
    const t = await getTranslations({locale, namespace: 'exercises'});
    
    return {
        title: t('title'),
        description: t('description')
    }
}

export default async function EjerciciosPage(props: BlogPageProps) {
    const {locale} = await props.params;
    const searchParams = await props.searchParams;
    const t = await getTranslations({locale, namespace: 'exercises'});
    
    const currentPage = Number(searchParams?.page) || 1;
    const localePosts = getEjerciciosByLocale(ejercicios, locale).filter(post => post.published);
    const sortedPosts = sortPosts(localePosts);
    const totalPages = Math.ceil(sortedPosts.length / POSTS_PAGE);
    const displayPosts = sortedPosts.slice(
        POSTS_PAGE * (currentPage - 1),
        POSTS_PAGE * currentPage
    );

    const tags = getAllTags(ejercicios, locale);
    const sortedTags = sortTagsByCount(tags);

    return <div className="container max-w-6xl py-8 lg:py-12">
        <div className="mb-12 text-center">
            <h1 className="inline-block font-black text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
                {t('title')}
            </h1>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
                {t('description')}
            </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
                <div className="space-y-6">
                    {displayPosts?.length > 0 ? (
                        <ul className="space-y-6">
                            {displayPosts.map(post => {
                                const { slug, date, title, description, tags } = post
                                return <li key={slug}>
                                    <EjercicioItem slug={slug} date={date} title={title} description={description} tags={tags} />
                                </li>
                            })}
                        </ul>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-lg text-foreground">{t('emptyState')}</p>
                        </div>
                    )}
                </div>
                
                <div className="mt-8 flex justify-center">
                    <QueryPagination totalPages={totalPages} className="justify-center" />
                </div>
            </div>
            
            <div className="lg:col-span-4">
                <Card className="sticky top-8 border border-border/30 rounded-2xl shadow-lg shadow-primary/5">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
                            <span className="bg-primary w-3 h-3 rounded-full"></span>
                            {t('tags')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-3">
                        {sortedTags?.map(tag => <Tag tag={tag} key={tag} count={tags[tag]} />)}
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
}
