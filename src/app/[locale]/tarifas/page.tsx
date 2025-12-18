import PlainsComparisonTable from "@/components/academia/plains-comparison-table";
import { SubscriptionPlanCard } from "@/components/academia/subscription-plans-card";
import { plansBasicInfo } from "@/lib/data";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/lib/utils";

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}) {
    const {locale} = await params;
    const t = await getTranslations({locale, namespace: 'pricing'});
    
    return {
        title: t('title'),
    }
}

export default async function TarifasPage({params}: {params: Promise<{locale: Locale}>}) {
    const {locale} = await params;
    const t = await getTranslations({locale, namespace: 'pricing'});
    
    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold text-center mb-10">{t('title')}</h1>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {plansBasicInfo.map((plan, index) => (
                    <SubscriptionPlanCard key={index} plan={plan} />
                ))}
            </div>
            <PlainsComparisonTable />
        </div>
    )
}
