"use client";

import { useForm } from "react-hook-form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { AuthGoogleButton } from "../ui/auth-google-button";
// import { GoogleSignInButton } from "../ui/GoogleSignInButton";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Adresa de email este obligatorie" })
    .email({
      message: "Introduceți o adresă de email validă",
    }),
  password: z
    .string()
    .min(1, { message: "Câmp obligatoriu" })
    .min(8, { message: "Parola trebuie să conțină minim 8 caractere" }),
});

export function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("form submitted", values);
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
        <Button className="w-full mt-10" variant="secondary" type="submit">
          Autentificare
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground text-slate-200">
          sau
        </span>
        <Separator className="flex-1" />
      </div>

      <AuthGoogleButton>Auntetifică-te cu Google</AuthGoogleButton>

      <p className="text-center text-sm text-slate-200 mt-4">
        Nu aveți un cont?&nbsp;
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          Înregistrați-vă
        </Link>
      </p>
    </Form>
  );
}
