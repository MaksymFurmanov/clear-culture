import { ProductGroup } from "@prisma/client";

export function getProductsSeedData(productGroups: ProductGroup[]){
  return [
    {
      name: "Bottle, black",
      price: 20,
      photoUrl: "https://clear-culture-bucket.s3.us-east-1.amazonaws.com/products/bottle.png",
      color: "Black",
      groupId: productGroups[0].id
    },
    {
      name: "Reusable eye masks, transparent",
      price: 40,
      photoUrl: "https://clear-culture-bucket.s3.us-east-1.amazonaws.com/products/eye-masks.png",
      color: "Transparent",
      colorHEX: "#F2EFEC",
      groupId: productGroups[1].id
    },
/*    {
      name: "Reusable eye masks, pink",
      price: 40,
      photoUrl: "",
      color: "Pink",
      colorHEX: "#FD287B",
      groupId: productGroups[1].id
    },
    {
      name: "Reusable eye masks, green",
      price: 40,
      photoUrl: "",
      color: "Green",
      colorHEX: "#4BB852",
      groupId: productGroups[1].id
    },
    {
      name: "Reusable eye masks, purple",
      price: 40,
      photoUrl: "",
      color: "Purple",
      colorHEX: "#877CB4",
      groupId: productGroups[1].id
    },
    {
      name: "Reusable eye masks, orange",
      price: 40,
      photoUrl: "",
      color: "Orange",
      colorHEX: "#E89F4F",
      groupId: productGroups[1].id
    },*/
    {
      name: "Reusable Make up pads",
      price: 45,
      photoUrl: "https://clear-culture-bucket.s3.us-east-1.amazonaws.com/products/eye-masks.png",
      groupId: productGroups[2].id
    },
    {
      name: "Reusable Notebook, black",
      price: 60,
      photoUrl: "https://clear-culture-bucket.s3.us-east-1.amazonaws.com/products/notebook.png",
      groupId: productGroups[3].id
    },
/*    {
      name: "Reusable Razor",
      price: 15,
      photoUrl: "",
      groupId: productGroups[4].id
    }*/
  ];
}