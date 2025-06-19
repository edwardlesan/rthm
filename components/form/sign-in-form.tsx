"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, string } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useToast } from "@/hooks/use-toast";

// Schema & Type
export const SignInSchema = z.object({
  email: string()
    .min(1, { message: "Adresa de email este obligatorie" })
    .email({ message: "Introduceți o adresă de email validă" }),
  password: string()
    .min(1, { message: "Câmp obligatoriu" })
    .min(8, { message: "Parola trebuie să conțină minim 8 caractere" }),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;

export function SignInForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Email sau parolă incorecte.",
      });
    } else {
      toast({
        variant: "success",
        title: "Succes",
        description: "Bine ai revenit!",
      });
      router.refresh();
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@exemplu.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parolă</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Introduceți parola"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-10 border-2 border-blue-500">
          🔐 Autentificare
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground text-slate-200">
          sau
        </span>
        <Separator className="flex-1" />
      </div>

      <p className="text-center text-sm text-slate-200 mt-4">
        Nu aveți un cont?{" "}
        <Link href="/sign-up" className="text-blue-500 hover:underline">
          Înregistrați-vă
        </Link>
      </p>
    </Form>
  );
}
