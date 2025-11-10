// "ejemplo de componente personalizado"

import { RoleType } from "@log-ui/core/domain/entities/role.type";
import { userInCookiesUC } from "@log-ui/core/presentation/controllers/user";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CalloutProps {
    children?: ReactNode;
    type?: "default"|"warning"|"danger";
    role?: "default"|"verificado"|"student"|"student_pro";
}

function CalloutWarning ({type}:{type: "subscrito"|"verificado"|"premium"})  {
    const messages = {
        subscrito: "⚠️ Tienes que estar subscrito para ver este contenido",
        verificado: "⚠️ Tienes que estar verificado para ver este contenido",
        premium: "⚠️ Necesitas una suscripción premium para ver este contenido"
    }
    return <div className="py-6 my-2 items-start rounded-sm border border-l-2 px-4 w-full border-destructive bg-destructive/10">{messages[type]}</div>
}

function CalloutContainer({ children, type, ...props }: { children: React.ReactNode; type: string; [key: string]: unknown }) {
    return (
        <div
            className={cn(
                "my-2 items-start rounded-sm border border-l-2 px-2 w-full",
                {
                    "border-destructive bg-destructive/5": type === "danger",
                    "border-yellow-900 bg-yellow-50/5": type === "warning",
                }
            )}
            {...props}
        >
            <div>{children}</div>
        </div>
    );
}

export async function Callout({
    children,
    type= "warning",
    role= "student",
    ...props
}: CalloutProps) {
    const user = await userInCookiesUC()
    
    // Verificar rol student (incluye ADMIN y ambos tipos de STUDENT)
    if(role==="student"){ 
        if (!user || (user.role !== RoleType.ADMIN && user.role !== RoleType.STUDENT && user.role !== RoleType.STUDENT_PRO)) {
            return <CalloutWarning type="subscrito" />;
        }
        return <CalloutContainer type={type} {...props}>{children}</CalloutContainer>;
    }
    
    // Verificar rol student_pro (solo ADMIN y STUDENT_PRO)
    if(role==="student_pro"){ 
        if (!user || (user.role !== RoleType.ADMIN && user.role !== RoleType.STUDENT_PRO)) {
            return <CalloutWarning type="premium" />;
        }
        return <CalloutContainer type={type} {...props}>{children}</CalloutContainer>;
    }
    
    // Verificar que el usuario esté verificado
    if(role==="verificado"){
        if(!user) return <CalloutWarning type="verificado"/>
        return <CalloutContainer type={type} {...props}>{children}</CalloutContainer>;
    }
    
    // Mostrar por defecto sin restricciones
    return <CalloutContainer type={type} {...props}>{children}</CalloutContainer>;  
}
