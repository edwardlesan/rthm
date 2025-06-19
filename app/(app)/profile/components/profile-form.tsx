"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Upload, X } from "lucide-react";

const profileSchema = z.object({
  username: z.string().min(1, "Numele este obligatoriu").max(30),
  bio: z.string().max(160, "Bio prea lung").optional(),
  location: z.string().max(100, "Locație prea lungă").optional(),
  avatarUrl: z.string().url("URL invalid").optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<ProfileFormValues>({
    username: "",
    bio: "",
    location: "",
    avatarUrl: "",
  });

  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialValues,
  });

  const { watch, reset, control, handleSubmit } = form;

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/me");

        if (res.status === 200) {
          const data: ProfileFormValues = {
            username: res.data.username,
            bio: res.data.bio || "",
            location: res.data.location || "",
            avatarUrl: res.data.avatarUrl || "",
          };

          setInitialValues(data);
          reset(data);
        }
      } catch {
        toast({
          variant: "destructive",
          title: "Eroare",
          description: "Nu s-a putut încărca profilul.",
        });
      }
    };

    fetchUser();
  }, [reset, toast]);

  // Submit form data
  const onSubmit = async (values: ProfileFormValues) => {
    setLoading(true);
    try {
      await axios.patch("/api/user", values);
      toast({
        variant: "success",
        title: "Succes",
        description: "Profilul a fost actualizat.",
      });
      setIsEditing(false);
      setInitialValues(values);
    } catch (error: any) {
      const description =
        error.response?.data?.message || "Eroare la actualizarea profilului.";
      toast({
        variant: "destructive",
        title: "Eroare",
        description,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset(initialValues);
    setIsEditing(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      form.setValue("avatarUrl", previewUrl);
    }
  };

  const handleClearAvatar = () => {
    form.setValue("avatarUrl", "");
  };

  const avatarUrl = watch("avatarUrl");
  const username = watch("username");

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6e">
        {/* Avatar Upload */}
        <FormField
          control={control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Avatar</FormLabel>
              <div className="flex items-center space-x-2">
                <Avatar className="size-14 border-2 border-slate-300">
                  <AvatarImage src={field.value} />
                  <AvatarFallback className="text-slate-300">
                    {username?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <FormControl>
                  <Input
                    disabled={!isEditing}
                    placeholder="https://link-avatar.png"
                    {...field}
                  />
                </FormControl>

                {/* Buttons */}
                {isEditing && (
                  <div className="flex space-x-2">
                    {/* Upload */}
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="size-10 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center justify-center text-white"
                    >
                      <Upload className="w-4 h-4" />
                    </button>

                    {/* Clear avatar */}
                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={handleClearAvatar}
                        className="size-10 bg-red-500 hover:bg-red-600 rounded-md flex items-center justify-center text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Username */}
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Nume utilizator</FormLabel>
              <FormControl>
                <Input
                  disabled={!isEditing}
                  placeholder="Introduceți numele"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Locație</FormLabel>
              <FormControl>
                <Input
                  disabled={!isEditing}
                  placeholder="Suceava, România"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bio */}
        <FormField
          control={control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Bio</FormLabel>
              <FormControl>
                <Textarea
                  disabled={!isEditing}
                  placeholder="Scurtă descriere despre tine..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
          >
            {isEditing ? "Anulează" : "✏️ Editează"}
          </Button>

          {isEditing && (
            <Button
              type="submit"
              disabled={loading}
              className="border-2 border-blue-500"
            >
              {loading ? "Se salvează..." : "💾 Salvează"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
