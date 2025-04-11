export interface brandsRes {
    results: number
    metadata: Metadata
    data: brandsData[]
  }
  
  export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage: number
  }
  
  export interface brandsData {
    _id: string
    name: string
    slug: string
    image: string
    createdAt: string
    updatedAt: string
  }
  