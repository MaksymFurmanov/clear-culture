import { ProductGroup } from "@/types/database";

const products: ProductGroup[] = [
  {
    id: "0",
    name: "Bottles",
    classic_variant_id: "0",
    description: "public/placeholders/products/product-description/bottles.mdx"
  },
  {
    id: "1",
    name: "Eye masks",
    classic_variant_id: "1",
    description: "public/placeholders/products/product-description/eye-masks.mdx",
    page_url: "/eye-masks"
  },
  {
    id: "2",
    name: "Make up pads",
    classic_variant_id: "2",
    description: "public/placeholders/products/product-description/make-up-pads.mdx",
  },
  {
    id: "3",
    name: "Reusable notebook",
    classic_variant_id: "3",
    description: "public/placeholders/products/product-description/reusable-notebook.mdx",
    page_url: "/reusable-notebook"
  }
];

export default products;