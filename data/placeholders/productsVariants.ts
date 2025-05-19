import { ProductVariant } from "@/types/database";

const productsVariants: ProductVariant[] = [
  {
    id: "0",
    product_id: "0",
    name: "Bottle, black",
    price: 20,
    color: "Black",
    photo_url: "/placeholders/products/bottle.png"
  },
  {
    id: "1",
    product_id: "1",
    name: "Reusable eye masks, transparent",
    price: 40,
    color: "Transparent",
    colorHEX: "#F2EFEC",
    photo_url: "/placeholders/products/eye-masks.png"
  },
  {
    id: "11",
    product_id: "1",
    name: "Reusable eye masks, pink",
    price: 40,
    color: "Pink",
    colorHEX: "#FD287B",
    photo_url: "/placeholders/products/eye-mask-pink.png"
  },
  {
    id: "12",
    product_id: "1",
    name: "Reusable eye masks, green",
    price: 40,
    color: "Green",
    colorHEX: "#4BB852",
    photo_url: "/placeholders/products/eye-mask-green.png"
  },
  {
    id: "13",
    product_id: "1",
    name: "Reusable eye masks, purple",
    price: 40,
    color: "Purple",
    colorHEX: "#877CB4",
    photo_url: "/placeholders/products/eye-mask-purple.png"
  },
  {
    id: "14",
    product_id: "1",
    name: "Reusable eye masks, orange",
    price: 40,
    color: "Orange",
    colorHEX: "#E89F4F",
    photo_url: "/placeholders/products/eye-mask-orange.png"
  },
  {
    id: "2",
    product_id: "2",
    name: "Reusable Make up pads",
    price: 45,
    photo_url: "/placeholders/products/makeup-removers.png"
  },
  {
    id: "3",
    product_id: "3",
    name: "Reusable Notebook, black",
    price: 60,
    photo_url: "/placeholders/products/notebook-main.png"
  }
];

export default productsVariants;