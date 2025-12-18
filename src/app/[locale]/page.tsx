import { ejercicios } from "#site/content";
import { EjercicioItem } from "@/components/academia/ejercicio-item";
import { SubscriptionPlansDialog } from "@/components/academia/subscription-plans-dialog";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/i18n/routing";
import { cn, getEjerciciosByLocale, sortPosts, Locale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { userInCookiesUC } from "@log-ui/core/presentation/controllers/user";

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'home'});
  
  return {
    title: t('hero.title'),
    description: t('hero.subtitle')
  }
}

export default async function Home({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'home'});
  
  const localePosts = getEjerciciosByLocale(ejercicios, locale);
  const latestPosts = sortPosts(localePosts).slice(0, 5);
  const user = await userInCookiesUC();

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
        <div className="container flex flex-col gap-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
            {t('hero.title')}
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Link href="/ejercicios" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}>
              {t('cta.exercises')}
            </Link>
            <SubscriptionPlansDialog buttonTitle={t('cta.pricing')} user={user} />
          </div>
        </div>
      </section>
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60">
        <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-secondary text-center">
          {t('featured.title')}
        </h3>
        <ul className="flex flex-col">
          {latestPosts.map(post => <li key={post.slug} className="first:border-t first:border-border">
            <EjercicioItem slug={post.slug} title={post.title} description={post.description} date={post.date} tags={post.tags} />
          </li>)}
        </ul>
      </section>
    </>
  );
}