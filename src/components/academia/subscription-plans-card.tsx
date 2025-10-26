import { Check } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { plansBasicInfo } from "@/lib/data"
import { userInCookiesUC } from "@/core/presentation/controllers/user"
import { RoleType } from "@/core/domain/entities/role.type"
import { generatePaymentLink } from "@/lib/utils"
import { CustomConnectButton } from "../custom-connect-button"

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center">
          <Check className="mr-2 h-4 w-4 text-green-500" />
          {feature}
        </li>
      ))}
    </ul>
  )
}

async function PlanButton({ planPrice, planName }: { planPrice: string; planName: string }) {
  const user = await userInCookiesUC()
  
  // Plan Gratuito
  if (planPrice === "0€") {
    if (!user) {
      return (
        <div className="w-full">
          <CustomConnectButton connectButtonLabel="Comenzar gratis" />
        </div>
      )
    }
    if (user.role === null || user.role === RoleType.STUDENT || user.role === RoleType.STUDENT_PRO || user.role === RoleType.ADMIN) {
      return <Button className="w-full" disabled variant="secondary">Tu plan actual</Button>
    }
    return <Button className="w-full" disabled variant="outline">Incluido en tu plan</Button>
  }
  
  // Plan Básico
  if (planName === "Plan Básico") {
    if (!user) {
      return <Button className="w-full">Inicia sesión</Button>
    }
    if (user.role === null) {
      const link = generatePaymentLink(user.id, "STUDENT")
      return (
        <Link href={link} className="w-full">
          <Button className="w-full">Probar gratis</Button>
        </Link>
      )
    }
    if (user.role === RoleType.STUDENT) {
      return <Button className="w-full" disabled variant="secondary">Tu plan actual</Button>
    }
    const link = generatePaymentLink(user.id, "STUDENT")
    return (
      <Link href={link} className="w-full">
        <Button className="w-full" variant="secondary">
          {user.role === RoleType.STUDENT_PRO ? "Cambiar plan" : "Primer mes gratis"}
        </Button>
      </Link>
    )
  }
  
  // Plan Premium
  if (planName === "Plan Premium") {
    if (!user) {
      return <Button className="w-full">Inicia sesión</Button>
    }
    if (user.role === null || user.role === RoleType.STUDENT) {
      const link = generatePaymentLink(user.id, "STUDENT_P")
      return (
        <Link href={link} className="w-full">
          <Button className="w-full">{user.role ? "Incrementar plan" : "Obtener premium"}</Button>
        </Link>
      )
    }
    if (user.role === RoleType.STUDENT_PRO) {
      return <Button className="w-full" disabled variant="secondary">Tu plan actual</Button>
    }
    return <Button className="w-full" disabled variant="outline">Incluido en tu plan</Button>
  }
  
  return <Button className="w-full">Suscribirse</Button>
}

export async function SubscriptionPlanCard({ plan }: { plan: typeof plansBasicInfo[number] }) {
  return (
    <Card className="w-full flex flex-col">
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-4xl font-bold">
          {plan.price}
          <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
        </p>
        {plan.subtitle && (
          <p className="text-sm text-muted-foreground mt-2">{plan.subtitle}</p>
        )}
        <FeatureList features={plan.features.slice(0, 3)} />
        {(plan.features.length > 3 || plan.extraFeatures) && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="mt-2 p-0 h-auto font-normal">
                Ver más características
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{plan.name} - Todas las características</DialogTitle>
                <DialogDescription>
                  Lista completa de características para el {plan.name.toLowerCase()}.
                </DialogDescription>
              </DialogHeader>
              <FeatureList features={plan.features} />
              {plan.extraFeatures && (
                <>
                  <h4 className="font-semibold mt-4">Características adicionales:</h4>
                  <FeatureList features={plan.extraFeatures} />
                </>
              )}
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
      <CardFooter>
        <PlanButton planPrice={plan.price} planName={plan.name} />
      </CardFooter>
    </Card>
  )
}
