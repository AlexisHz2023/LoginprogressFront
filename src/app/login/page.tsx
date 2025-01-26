"use client";

import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "primereact/divider";
import { useForm } from "react-hook-form";
import { Password } from "primereact/password";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SingUpButton } from "@/components/ui/buttonsing";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FontPage } from "@/components/login/font";
import { entrenadorAPI } from "../../../utils/supabase/api";
import { Toaster, toast } from 'react-hot-toast';

export default function LoginPage() {
  const header = <div className="font-bold mb-3"></div>;
  const footer = (
    <>
      <Divider />
      <p className="text-black">Sugerencias:</p>
      <ul className="pl-0.5 list-disc ml-0.5 mt-0 line-height-3">
        <li>Agrege mayusculas</li>
        <li>Ingrese minusculas</li>
        <li>Ingrese Numeros</li>
        <li>Minimo 8 caracteres</li>
      </ul>
    </>
  );

  const userSchema = z.object({
    name: z
      .string({
        required_error: "Nombre es requerido",
      })
      .min(3, "El nombre debe tener como minimo 3 caracteres"),
    lastname: z
      .string({
        required_error: "Apellido es requerido",
      })
      .min(3, "El Apellido debe tener como minimo 3 caracteres"),
    email: z
      .string({
        required_error: "Correo es requerido",
      })
      .email(),
    password: z
      .string({
        required_error: "La contrasena es requerida",
      })
      .min(3, "La contrasena es requeridad"),
  });

  type UserType = z.infer<typeof userSchema>;

  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values: UserType) => {
    try {
      const entrenadorData = {
        nombre: values.name,
        apellido: values.lastname,
        correo: values.email,
        contrasena: values.password
      };
      
      const response = await entrenadorAPI.create(entrenadorData);
      console.log('Entrenador creado:', response);
      
      // Toast de éxito
      toast.success('Usuario creado exitosamente!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#10B981',
          color: 'white',
        },
      });
      
      form.reset({
        name: "",
        lastname: "",
        email: "",
        password: ""
      });

    } catch (error) {
      console.error('Error al crear entrenador:', error);
      toast.error('Error al crear el usuario. Por favor, intente nuevamente.', {
        duration: 3000,
        position: 'top-center',
      });
    }
  });

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased overflow-hidden">
      <Toaster />
      <div className="max-w-2xl mx-auto p-4 gap-4 z-20 grid  grid-cols-2 ">
        <FontPage />
        <Card className="p-5">
          <CardHeader>
            <CardTitle className="text-center text-xl font-sans">
              Crear una cuenta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-sans">Nombre</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>

                      {form.formState.errors?.name && (
                        <p className="text-red-400 text-sm">
                          {form.formState.errors?.name.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  name="lastname"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-sans">
                        Apellido
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      {form.formState.errors?.lastname && (
                        <p className="text-red-400 text-sm">
                          {form.formState.errors?.lastname.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-sans">
                        Correo Electronico
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      {form.formState.errors?.email && (
                        <p className="text-red-400 text-sm">
                          {form.formState.errors?.email.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-sans">
                        Contrasena
                      </FormLabel>
                      <br />
                      <FormControl>
                        <Password
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          header={header}
                          footer={footer}
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors?.password && (
                        <p className="text-red-400 text-sm">
                          {form.formState.errors?.password.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <Button className="bg-[#82F8C6] font-sans text-black hover:text-white">
                  Registrar
                </Button>

                <div className="flex items-center space-x-2">
                  <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
                  <span className="text-zinc-400 dark:text-zinc-300 text-sm">
                    OR
                  </span>
                  <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
                </div>
                <div className="py-2">
                <SingUpButton></SingUpButton>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <BackgroundBeams />
    </div>
  );
}
