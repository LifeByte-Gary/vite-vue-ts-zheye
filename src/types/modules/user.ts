export interface User {
  _id: string
  email: string
  nickName: string
  description: string
  avatar: {
    _id: string
    url: string
  }
  column: string
  createdAt?: string
}
