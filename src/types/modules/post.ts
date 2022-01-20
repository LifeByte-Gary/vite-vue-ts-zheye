export interface Post {
  id: number
  column: string
  title: string
  content: string
  image: {
    _id: string
    url: string
  }
  createdAt: string
}

export type Posts = Post[]
