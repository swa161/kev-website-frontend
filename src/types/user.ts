export type User = {
  id: number
  title: string
  description: string
  image_filename: string
  create_at: string
  phone_number: string
  email: string
  address: string
  first_name: string
  last_name: string
  password: string
  auth_token: string
  cv_filename: string
}


export type HeroProps = {
    user: User | null
    refreshUser?: () => Promise<void>
}