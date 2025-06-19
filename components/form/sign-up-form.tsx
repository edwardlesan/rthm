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
import { z } from "zod";
import { object, string } from "zod";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const formSchema = object({
  username: string()
    .min(1, { message: "Numele de utilizator este obligatoriu" })
    .max(30, {
      message: "Numele de utilizator nu poate depăși 30 caractere",
    }),
  email: string()
    .min(1, { message: "Adresa de email este obligatorie" })
    .email({
      message: "Introduceți o adresă de email validă",
    }),
  password: string()
    .min(1, { message: "Câmp obligatoriu" })
    .min(8, { message: "Parola trebuie să conțină minim 8 caractere" }),
  confirmPassword: string().min(1, {
    message: "Confirmarea parolei este obligatorie",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Parolele nu se potrivesc",
});

export type TSignUpFormValues = z.infer<typeof formSchema>;

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<TSignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: TSignUpFormValues) => {
    try {
      await axios.post("/api/user", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      toast({
        variant: "success",
        title: "Succes",
        description: "Utilizator creat cu succes!",
      });
      router.push("/sign-in");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Eroare la crearea utilizatorului!",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nume de utilizator</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe1" {...field} />
                </FormControl>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmați parola</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirmați parola"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-10 border-2 border-blue-500" type="submit">
          🧑‍💻 Înregistrare
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">sau</span>
        <Separator className="flex-1" />
      </div>

      <p className="text-center text-sm text-slate-200 mt-4">
        Aveți deja un cont?&nbsp;
        <Link className="text-blue-500 hover:underline" href="/sign-in">
          Autentificați-vă
        </Link>
      </p>
    </Form>
  );
}
