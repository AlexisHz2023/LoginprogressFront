"use client"

import React from "react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { entrenadorAPI } from "../../../utils/supabase/api"
import { Toaster, toast } from "react-hot-toast"
import { CustomPhoneInput } from "@/components/ui/customphoneinput"
import { v4 as uuidv4 } from "uuid"

// Add Colombian cities array.  You'll need to populate this with your actual city data.
const colombianCities = [
  "Barranquilla",
  "Bucaramanga",
  "Bogotá",
  "Cali",
  "Cartagena",
  "Cúcuta",
  "Ibagué",
  "Manizales",
  "Medellín",
  "Montería",
  "Neiva",
  "Pasto",
  "Popayán",
  "Pereira",
  "Quibdó",
  "Santa Marta",
  "Sincelejo",
  "Tunja",
  "Valledupar",
  "Villavicencio",
]

export default function LoginPage() {
  const userSchema = z.object({
    entrenador: z.enum(["Si", "No"], {
      required_error: "Este dato es requerido",
    }),
    name: z
      .string({
        required_error: "Nombre es requerido",
      })
      .min(3, "El nombre debe tener como minimo 3 caracteres"),
    genero: z.enum(["Masculino", "Femenino"], {
      required_error: "Este dato es requerido",
    }),
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
    telefono: z.string({}),
    ciudad: z.string({
      required_error: "Ciudad es requerida",
    }),

    ocupacion: z.string({}),
  })


  type UserType = z.infer<typeof userSchema>

  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      genero: "Femenino",
      lastname: "",
      email: "",
      telefono: "+57",
      ciudad: "",
      ocupacion: "",
      entrenador: "No",
    },
  })

  const onSubmit = form.handleSubmit(async (values: UserType) => {
    try {
      const entrenadorData = {
        id: uuidv4(),
        nombre: values.name,
        apellido: values.lastname,
        correo: values.email,
        telefono: values.telefono,
        ciudad: values.ciudad,
        genero: values.genero,
        entrenador: values.entrenador === "Si",
        profesion: values.ocupacion,
        terminos: true,
        promociones: true,
      }

      const response = await entrenadorAPI.create(entrenadorData)
      console.log("Entrenador creado:", response)

      toast.success("Usuario creado exitosamente!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#10B981",
          color: "white",
        },
      })

      form.reset()
    } catch (error) {
      console.error("Error al crear entrenador:", error)
      toast.error("Error al crear el usuario. Por favor, intente nuevamente.", {
        duration: 3000,
        position: "top-center",
      })
    }
  })

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased overflow-hidden">
      <Toaster />

      <div className="max-w-2xl mx-auto p-4 gap-0 z-20 grid  grid-cols-2 ">
        <div className="bg-black w-[30rem] relative rounded-l-lg right-40 flex flex-col items-center justify-center antialiased p-10 shadow-lg">
          <img src="icons.png" className="w-96 h-auto z-20" />

          <div className="p-2 relative -top-20 flex flex-col items-center text-center">
            <p className="text-[#82F8C6] text-lg nunito-sans-900">
              Gestiona a tus clientes de manera digital. Completa estos datos y no te pierdas ningún detalle en nuestro
              proceso.
            </p>
          </div>
        </div>
        <Card className="p-5">
          <CardHeader>
            <CardTitle className="text-center text-xl font-sans">Formulario</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
                <FormField
                  control={form.control}
                  name="entrenador"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-sans">Entrenador</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu respuesta" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Si", "No"].map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex">
                  <div className="p-2">
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
                            <p className="text-red-400 text-sm">{form.formState.errors?.name.message}</p>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="p-2">
                    <FormField
                      name="lastname"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 font-sans">Apellidos</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>

                          {form.formState.errors?.lastname && (
                            <p className="text-red-400 text-sm">{form.formState.errors?.lastname.message}</p>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="genero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-sans">Género</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu género" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Masculino", "Femenino"].map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-sans">Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      {form.formState.errors?.email && (
                        <p className="text-red-400 text-sm">{form.formState.errors?.email.message}</p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  name="telefono"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-sans">Número telefónico</FormLabel>
                      <FormControl>
                        <CustomPhoneInput
                          value={field.value}
                          onChange={(phone) => form.setValue("telefono", phone)}
                        />
                      </FormControl>
                      {form.formState.errors?.telefono && (
                        <p className="text-red-400 text-sm">{form.formState.errors?.telefono.message}</p>
                      )}
                    </FormItem>
                  )}
                />

                {/* Updated Ciudad FormField */}
                <FormField
                  name="ciudad"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-sans">Ciudad</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu ciudad" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {colombianCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors?.ciudad && (
                        <p className="text-red-400 text-sm">{form.formState.errors?.ciudad.message}</p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  name="ocupacion"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-sans">
                        Ocupación <span className="text-red-500">*</span> este campo es opcional
                      </FormLabel>
                      <br />
                      <FormControl>
                        <Input type="text" {...field}></Input>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="items-top flex space-x-2">
                  <Checkbox id="terms1" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-sans leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Aceptar términos y condiciones
                    </label>
                    <p className="text-sm text-muted-foreground font-sans">
                      Acepta nuestros Términos de servicio y Política de privacidad.
                    </p>
                  </div>
                </div>

                <div className="items-top flex space-x-2">
                  <Checkbox id="terms2" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms2"
                      className="text-sm font-sans leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <p className="text-gray-600">
                        ¿Permites que <span className="text-black">progressPro </span>pro te envie informacion sobre el
                        dia de lanzamiento y promociones?
                      </p>
                    </label>
                  </div>
                </div>
                <Button className="bg-[#82F8C6] font-sans text-black hover:text-white">Enviar</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <BackgroundBeams />
    </div>
  )
}

