export type productType = {
    availability: boolean
    brand: string
    categoryId: string
    color: string
    description: string
    dimensions: { length: number; width: number; height: number }
    image: string
    launchDate: string
    material: string
    name: string
    price: number
    size: string
    weight: number
    _id: string
    category: string
}
export type reviewListType = {
    author: string
    date: string
    description: string
    productId: string
    rating: number
    title: string
    _id: string
}
export type filterDataType = {
    brands: string[]
    colors: string[]
    materials: string[]
    sizes: string[]
}
