"use client"
import { updateUser } from "@/actions/user";
import { Button } from "../ui/button";
import { useActiveAccount } from "thirdweb/react";
import { signLoginPayload } from "thirdweb/auth";
import { generatePayload } from "@/actions/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useEffect, useState, type JSX } from "react";
import { Label } from "../ui/label";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger, DialogDescription, DialogTitle } from "../ui/dialog";
import { UserCog } from "lucide-react";
import { Separator } from "../ui/separator";
import DeleteUserButton from "./delete-user-button";

const FormButtonLabelDef = () => {
  return (
      <>
          <UserCog width={20} height={20} />
          <span className="inline-block sm:hidden px-2">Configuración</span>
          <p className="hidden sm:sr-only">Configuración usuario</p>
      </>
  );
};

const userSchema = z.object({
    nick: z.string().min(5, { message: "⚠️ Debe tener 5 caracteres como mínimo." }).max(25, { message: "⚠️ Debe tener 25 caracteres como máximo." }).optional(),
    img: z.string().nullable().optional(),
    email: z.string().email({ message: "El email debe ser válido" }).nullable().optional(),
  })

type User = {
  id: string;
  nick: string | null;
  img: string | null;
  email: string | null;
  address: string;
  role: string | null;
}

export default function UserFormDialog({ 
  user, 
  formButtonLabel, 
  buttonLabelVariant="outline", 
  buttonLabelClass="px-2" 
}: { 
  user: User | false | null, 
  formButtonLabel?: JSX.Element, 
  buttonLabelVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined, 
  buttonLabelClass?:string 
}) {
  const account = useActiveAccount()
  const [previewImage, setPreviewImage] = useState<string | null>(user ? user.img : null)
  const [isUser, setIsUser] = useState<boolean>(false)

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nick: "",
      img: null,
      email: undefined,
    },
  });

  useEffect(() => {
    form.reset({
      nick: user ? user.nick! : "",
      img: user ? user.img : null,
      email: user ? user.email || undefined : undefined,
    });
    setPreviewImage(user ? user.img : null);
    setIsUser(user ? true : false)
  }, [user, account, form]);

  async function onSubmit(formData: z.infer<typeof userSchema>) {
    if (!account || !user) {
      console.error("Please connect your wallet or log in")
      return
    }

    const payload = await generatePayload({ address: account.address })
    const signatureRes = await signLoginPayload({ account, payload })
    const updatedData = {
      ...formData,
      email: (typeof formData.email === "string") ? formData.email : null,
      img: form.getValues().img || null
    };

    await updateUser(user.id, signatureRes, updatedData);
  }

  const isFormDisabled = !user

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={buttonLabelClass} variant={buttonLabelVariant}>
          {formButtonLabel||<FormButtonLabelDef/>} 
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            Editar perfil
          </DialogTitle>
          <DialogDescription className="text-xs">
            Editar tu información como usuario
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="nick"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nick</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="👾 De 5 a 25 caracteres" disabled={isFormDisabled} />
                  </FormControl>
                  <FormDescription>Este será tu nombre público.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''}  placeholder="ejemplo@correo.com" disabled={isFormDisabled} />
                  </FormControl>
                  <FormDescription>Email para verificación.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="picture">Imagen Perfil</Label>
              <FormDescription className="text-xs">
                Próximamente podrás subir tu propia imagen de perfil
              </FormDescription>
            </div>
            
            <DialogFooter>
              <div className="flex w-full gap-4 flex-col">
                <div className="flex justify-end">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cerrar
                    </Button>
                  </DialogClose>
                </div>

                <Button
                  type="submit"
                  disabled={isFormDisabled || !account}
                  className="w-full"
                >
                  {isFormDisabled ? "Inicia sesión para actualizar" : "Actualizar Perfil"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
        <Separator className="my-2" />
        <div className="grid grid-cols-1 gap-4">
          {isUser && user && <DeleteUserButton id={user.id} address={user.address} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
