'use client'

import React,{ useState} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { FontPage } from '@/components/login/font'


export default function Home() {

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
  )

  const userSchema = z.object({
    name: z.string({
      required_error: "Nombre es requerido",
    }).min(3, "El nombre debe tener como minimo 3 caracteres"),
    lastname: z.string({
      required_error: "Apellido es requerido",
    }).min(3, "El Apellido debe tener como minimo 3 caracteres"),
    email: z.string({
      required_error: "Correo es requerido",
    }).email(),
    password: z.string({
      required_error: "La contrasena es requerida",
    }).min(3, 'La contrasena es requeridad')
  });

  type UserType = z.infer<typeof userSchema>

    const form = useForm<UserType>({ 
      resolver: zodResolver(userSchema),
      defaultValues: {
        name: "",
        lastname: "",
        email: "",
        password: "",
      }
    })

    console.log(form.formState.errors)

    const onSubmit = form.handleSubmit((values: UserType) => {
      console.log(values)
      //Aqui ya se puede enviar los datos al servidor en este caso Supabase
    })

  return (
    <div className="p-10">
    <FontPage />
    <Card className="p-5">
      <CardHeader>
        <CardTitle className="text-center">Crear una cuenta</CardTitle>
      </CardHeader>
      <CardContent>
      <Form {...form}>
      <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
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
            <FormLabel className="text-gray-600 font-sans">Apellido</FormLabel>
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
            <FormLabel className="text-gray-600 font-sans">Correo Electronico</FormLabel>
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
            <FormLabel className="text-gray-600 font-sans">Contrasena</FormLabel>
            <br />
            <FormControl>
              
              <Password
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              header={header} 
              footer={footer}
              type="text" {...field}  
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
    
        <Button className="bg-[#82F8C6] text-black hover:text-white">Registrar</Button>
      </form>
      </Form>
      </CardContent>
    </Card>
    </div>
  );
}
