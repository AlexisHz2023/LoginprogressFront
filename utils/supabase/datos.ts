export interface entrenadores {
  id: string // Cambiado a string ya que es un UUID
  nombre: string
  apellido: string 
  correo: string 
  genero: string
  ciudad: string 
  telefono: string
  entrenador: boolean
  profesion: string
  terminos: boolean
  promociones: boolean

}
  
export type NewEntrenadores = Omit<entrenadores, 'id'>
export type UpdateUser = Partial<entrenadores>