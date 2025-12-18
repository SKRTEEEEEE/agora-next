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

    return <div className="container max-w-4xl py-6 lg:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-4">
            <div className="flex-1 space-y-4">
                <h1 className="inline-block font-black text-4xl lg:text-5xl">
                    {t('title')}
                </h1>
                <p className="text-xl text-muted-foreground">
                    {t('description')}
                </p>
            </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mt-8">
            <div className="col-span-12 col-start-1 sm:col-span-8">
                <hr className="mt-8" />
                {displayPosts?.length > 0 ? (
                    <ul className="flex flex-col">
                        {displayPosts.map(post => {
                            const { slug, date, title, description, tags } = post
                            return <li key={slug}>
                                <EjercicioItem slug={slug} date={date} title={title} description={description} tags={tags} />
                            </li>
                        })}
                    </ul>
                ) : (
                    <p>{t('emptyState')}</p>
                )
                }
                <QueryPagination totalPages={totalPages} className="justify-end mt-4" />
            </div>
            <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
                <CardHeader>
                    <CardTitle>{t('tags')}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {sortedTags?.map(tag => <Tag tag={tag} key={tag} count={tags[tag]} />)}
                </CardContent>
            </Card>
        </div>
    </div>
}
