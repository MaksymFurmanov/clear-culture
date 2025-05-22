import { ProductGroup } from "@/types/database";

const products: ProductGroup[] = [
  {
    id: "0",
    name: "Bottles",
    classic_variant_id: "0",
    description: "### Sleek, Durable, and Eco-Friendly\n" +
      "\n" +
      "This metallic bottle is the perfect blend of modern design and environmental consciousness. Crafted from high-quality stainless steel, it’s built to last and designed to reduce single-use plastic waste.\n" +
      "\n" +
      "### Keeps Drinks Hot or Cold\n" +
      "\n" +
      "Thanks to its double-wall insulation, your beverages stay hot for up to 12 hours or refreshingly cold for up to 24. Whether you're heading to work, the gym, or a weekend hike, it's your ideal hydration companion.\n" +
      "\n" +
      "### Lightweight and Leak-Proof\n" +
      "\n" +
      "Despite its sturdy build, the bottle is lightweight and easy to carry. The leak-proof cap ensures no spills in your bag, making it perfect for both everyday use and travel.\n" +
      "\n" +
      "### Sustainable Style\n" +
      "\n" +
      "With its minimalist metallic finish and sleek silhouette, this bottle makes a statement—about your style and your commitment to the planet. Reusable, recyclable, and responsibly made."
  },
  {
    id: "1",
    name: "Eye masks",
    classic_variant_id: "1",
    description: "Transform your sleep routine with our **eco-conscious reusable eye mask**, designed for ultimate comfort and sustainability.\n" +
      "\n" +
      "Made from **soft, breathable materials**, it gently contours to your face to block out light, helping you unwind and sleep soundly.\n" +
      "\n" +
      "Perfect for **travel**, **meditation**, or **daily rest**, this mask is **washable** and **long-lasting**, offering an **eco-friendly alternative** to disposable options.\n" +
      "\n" +
      "Whether you're at home or on the go, enjoy a **restful, rejuvenating experience** while **reducing waste** and supporting a **greener lifestyle**.\n" +
      "![Reusable Eco Eye Mask](/img/eye-masks/mask-usage.jpg)",
    page_url: "/eye-masks"
  },
  {
    id: "2",
    name: "Make up pads",
    classic_variant_id: "2"
  },
  {
    id: "3",
    name: "Reusable notebook",
    classic_variant_id: "3"
  }
];

export default products;