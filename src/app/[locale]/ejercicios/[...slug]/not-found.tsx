'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ejercicios } from '#site/content';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag } from '@/components/academia/tag';
import { Link } from '@/lib/i18n/routing';
import { RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ArticleSuggestion {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: string[];
}

export default function NotFoundArticle() {
  const pathname = usePathname();
  const t = useTranslations('exercises'); // Using exercises namespace for consistency
  const [suggestedArticles, setSuggestedArticles] = useState<ArticleSuggestion[]>([]);
  const [currentLocale, setCurrentLocale] = useState<string>('');

  useEffect(() => {
    // Extract locale from pathname
    const pathSegments = pathname.split('/');
    const locale = pathSegments[1]; // Assuming format is /locale/ejercicios/...
    setCurrentLocale(locale);

    // Get articles in the current locale
    const localeArticles = ejercicios
      .filter(article => article.locale === locale && article.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3); // Get 3 most recent articles

    setSuggestedArticles(localeArticles);
  }, [pathname]);

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Card className="bg-card border border-border/30 rounded-2xl shadow-lg shadow-primary/10 overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
            {t('notFound.title', { defaultValue: 'Artículo no encontrado' })}
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            {t('notFound.description', { defaultValue: 'El artículo que buscas no está disponible en el idioma seleccionado' })}
          </p>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">
              {t('notFound.suggested', { locale: currentLocale.toUpperCase(), defaultValue: `Artículos sugeridos en ${currentLocale.toUpperCase()}:` })}
            </h3>
            <div className="space-y-4">
              {suggestedArticles.length > 0 ? (
                suggestedArticles.map((article) => (
                  <Card key={article.slug} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 text-left">
                      <h4 className="font-bold text-lg mb-2">
                        <Link 
                          href={{
                            pathname: "/ejercicios/[...slug]",
                            params: { 
                              slug: article.slug.startsWith("ejercicios/") 
                                ? article.slug.substring("ejercicios/".length).split("/") 
                                : article.slug.split("/")
                            }
                          }}
                          className="text-primary hover:underline"
                        >
                          {article.title}
                        </Link>
                      </h4>
                      {article.description && (
                        <p className="text-muted-foreground text-sm mb-2">
                          {article.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {article.tags?.map(tag => (
                          <Tag key={tag} tag={tag} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(article.date).toLocaleDateString(currentLocale, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>{t('notFound.noArticles', { defaultValue: 'No hay artículos disponibles en este idioma' })}</p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ejercicios">
              <Button variant="outline" className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                {t('notFound.goBack', { defaultValue: 'Volver a todos los artículos' })}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
