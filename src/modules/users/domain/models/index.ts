export interface IUser {
  id: string
  name: string
  email: string
  password: string
  avatar: string
  roles: string
  created_at: Date
  updated_at: Date
}

export interface IUserToken {
  id: string
  token: string
  user_id: string
  created_at: Date
  updated_at: Date
}

export interface ICreateSession {
  email: string
  password: string
}

export interface IResponseSession {
  user: IUser
  token: string
}

export interface ICreateUser {
  name: string
  email: string
  password: string
  roles: string
}

export interface IDeleteUser {
  id: string
}

export interface IPaginateUser {
  per_page: number
  total: number
  current_page: number
  data: IUser[]
}

export interface IResetPassword {
  token: string
  password: string
}

export interface ISendForgotPassword {
  email: string
}

export interface IShowProfile {
  user_id: string
}

export interface IUpdateProfile {
  user_id: string
  name: string
  email: string
  password?: string
  old_password?: string
}

export interface IUpdateUser {
  id: string
  name: string
  email: string
  roles: string
}

export interface IUpdateUserAvatar {
  user_id: string
  avatarFilename: string
}

export interface IShowUser {
  id: string
}
