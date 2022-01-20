export interface Post {
  id: number
  title: string
  content: string
  image: {
    _id: string
    url: string
  }
  createdAt: string
  columnId: string
}

export type Posts = Post[]
