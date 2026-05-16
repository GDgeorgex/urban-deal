export interface Product {
  id: number
  name: string
  brand: string
  cat: string
  price: string
  desc: string
  sizes: string[]
  img: string
  imgs: string[]
  isPreorder: boolean
  preorderPrice?: string
  regularPrice?: string
  discountPct?: number
  expectedArrival?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Air Max 90",
    brand: "Nike",
    cat: "სნიკერები",
    price: "₾ 650",
    desc: "ლეგენდარული Air Max კუშნინგი. უვადო სილუეტი, ქუჩის ენერგია.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80"
    ],
    isPreorder: false
  },
  {
    id: 2,
    name: "Jordan 1 Retro High OG",
    brand: "Jordan",
    cat: "სნიკერები",
    price: "₾ 1,100",
    desc: "ლეგენდა. Heritage ფერები, პრემიუმ ტყავი, დაუჯაბნელი ქუჩის კრედი.",
    sizes: ["40", "41", "42", "43", "44"],
    img: "https://images.unsplash.com/photo-1556906781-9a414e2a9c86?w=600&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1556906781-9a414e2a9c86?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    isPreorder: false
  },
  {
    id: 3,
    name: "Yeezy Boost 350 V2",
    brand: "Adidas",
    cat: "სნიკერები",
    price: "₾ 980",
    desc: "Primeknit ზედაპირი, Full-length Boost კუშნინგი. ჰაიპ-ეპოქის OG სილუეტი.",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    img: "https://images.unsplash.com/photo-1607522370275-f6fd21012ec1?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1607522370275-f6fd21012ec1?w=800&q=80"],
    isPreorder: false
  },
  {
    id: 4,
    name: "Dunk Low Retro",
    brand: "Nike",
    cat: "სნიკერები",
    price: "₾ 720",
    desc: "კლასიკური სკეიტ-ეპოქის სტილი. სუფთა ხაზები, პრემიუმ ტყავი.",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    img: "https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=600&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    isPreorder: false
  },
  {
    id: 5,
    name: "Essentials Hoodie",
    brand: "Fear of God",
    cat: "ჰუდები",
    price: "₾ 520",
    desc: "Heavyweight cotton fleece, dropped shoulders, მინიმალური ბრენდინგი.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80"],
    isPreorder: false
  },
  {
    id: 6,
    name: "Classic Cargo Pants",
    brand: "Carhartt",
    cat: "შარვლები",
    price: "₾ 390",
    desc: "Rugged canvas, utility pockets. ქუჩისთვის შექმნილი.",
    sizes: ["S", "M", "L", "XL"],
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"],
    isPreorder: false
  },
  {
    id: 7,
    name: "Ultraboost 22",
    brand: "Adidas",
    cat: "სნიკერები",
    price: "₾ 860",
    desc: "Responsive Boost midsole, Primeknit. Performance meets ქუჩის სტილი.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80"],
    isPreorder: false
  },
  {
    id: 8,
    name: "Box Logo Tee",
    brand: "Supreme",
    cat: "მაისურები",
    price: "₾ 320",
    desc: "კლასიკური Box Logo, heavyweight cotton. Instant სტრიტვეარ კლასიკი.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"],
    isPreorder: false
  },
  {
    id: 9,
    name: "550 Court Classic",
    brand: "New Balance",
    cat: "სნიკერები",
    price: "₾ 580",
    desc: "Basketball heritage, court-inspired. Versatile ყოველდღიური სნიკერი.",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"],
    isPreorder: false
  },
  // PRE-ORDER ITEMS
  {
    id: 10,
    name: "Air Jordan 4 Retro",
    brand: "Jordan",
    cat: "სნიკერები",
    price: "₾ 1,400",
    preorderPrice: "₾ 1,120",
    regularPrice: "₾ 1,400",
    discountPct: 20,
    expectedArrival: "2025-08-15",
    desc: "მომავლის ჩემპიონი. ევროპიდან პირდაპირ — დაჯავშნე ახლავე.",
    sizes: ["40", "41", "42", "43", "44"],
    img: "https://images.unsplash.com/photo-1556906781-9a414e2a9c86?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1556906781-9a414e2a9c86?w=800&q=80"],
    isPreorder: true
  },
  {
    id: 11,
    name: "Nike Air Force 1 Low '07",
    brand: "Nike",
    cat: "სნიკერები",
    price: "₾ 560",
    preorderPrice: "₾ 448",
    regularPrice: "₾ 560",
    discountPct: 20,
    expectedArrival: "2025-07-20",
    desc: "სუფთა კლასიკი. ყველანაირ სტილთან. უნივერსალური სნიკერი.",
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"],
    isPreorder: true
  },
  {
    id: 12,
    name: "Adidas Samba OG",
    brand: "Adidas",
    cat: "სნიკერები",
    price: "₾ 620",
    preorderPrice: "₾ 496",
    regularPrice: "₾ 620",
    discountPct: 20,
    expectedArrival: "2025-07-10",
    desc: "Samba — ყველაზე ტრენდული სნიკერი 2025. შეიძინე სანამ გამოიცხრება.",
    sizes: ["40", "41", "42", "43", "44"],
    img: "https://images.unsplash.com/photo-1607522370275-f6fd21012ec1?w=600&q=80",
    imgs: ["https://images.unsplash.com/photo-1607522370275-f6fd21012ec1?w=800&q=80"],
    isPreorder: true
  }
]
