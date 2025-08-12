import { ProductGroup } from "@prisma/client";

export function getProducts(productGroups: ProductGroup[]){
  return [
    {
      name: "Bottle, black",
      price: 20,
      photoUrl: "https://svscxanowouqzblxoyxy.supabase.co/storage/v1/object/sign/clear-culture/products/img/bottle.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82YzRlY2JiZC04ZWJjLTRhNTctODgwOC03NjNmZTE0YjZmM2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbGVhci1jdWx0dXJlL3Byb2R1Y3RzL2ltZy9ib3R0bGUucG5nIiwiaWF0IjoxNzU0NzIzMTgxLCJleHAiOjE3ODYyNTkxODF9.0ZTcAKcelT9e6AZOOlbtKAdeGIG3bAJ6gBUTQZgexKA",
      color: "Black",
      groupId: productGroups[0].id
    },
    {
      name: "Reusable eye masks, transparent",
      price: 40,
      photoUrl: "https://svscxanowouqzblxoyxy.supabase.co/storage/v1/object/sign/clear-culture/products/img/eye-masks.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82YzRlY2JiZC04ZWJjLTRhNTctODgwOC03NjNmZTE0YjZmM2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbGVhci1jdWx0dXJlL3Byb2R1Y3RzL2ltZy9leWUtbWFza3MucG5nIiwiaWF0IjoxNzU0NzIzNjE1LCJleHAiOjE3ODYyNTk2MTV9.FmorusFyLJgt9yQcajVojHcjH1k8is_7gxLa08Vo2vo",
      color: "Transparent",
      colorHEX: "#F2EFEC",
      groupId: productGroups[1].id
    },
    {
      name: "Reusable eye masks, pink",
      price: 40,
      photoUrl: "https://svscxanowouqzblxoyxy.supabase.co/storage/v1/object/sign/clear-culture/products/img/eye-mask-pink.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82YzRlY2JiZC04ZWJjLTRhNTctODgwOC03NjNmZTE0YjZmM2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbGVhci1jdWx0dXJlL3Byb2R1Y3RzL2ltZy9leWUtbWFzay1waW5rLnBuZyIsImlhdCI6MTc1NDcyMzU1OSwiZXhwIjoxNzg2MjU5NTU5fQ.CzWO0RoyT8KYqR5GgfAXwmgemLtNzLGndvfUX90rw5E",
      color: "Pink",
      colorHEX: "#FD287B",
      groupId: productGroups[1].id
    },
    {
      name: "Reusable eye masks, green",
      price: 40,
      photoUrl: "https://svscxanowouqzblxoyxy.supabase.co/storage/v1/object/sign/clear-culture/products/img/eye-mask-green.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82YzRlY2JiZC04ZWJjLTRhNTctODgwOC03NjNmZTE0YjZmM2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbGVhci1jdWx0dXJlL3Byb2R1Y3RzL2ltZy9leWUtbWFzay1ncmVlbi5wbmciLCJpYXQiOjE3NTQ3MjM0NjksImV4cCI6MTc4NjI1OTQ2OX0.XqI4GBG_VrRjAvR26ogkHxhfuw5bHah-buVnGgbkzDE",
      color: "Green",
      colorHEX: "#4BB852",
      groupId: productGroups[1].id
    },
    {
      name: "Reusable eye masks, purple",
      price: 40,
      photoUrl: "https://svscxanowouqzblxoyxy.supabase.co/storage/v1/object/sign/clear-culture/products/img/eye-mask-purple.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82YzRlY2JiZC04ZWJjLTRhNTctODgwOC03NjNmZTE0YjZmM2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbGVhci1jdWx0dXJlL3Byb2R1Y3RzL2ltZy9leWUtbWFzay1wdXJwbGUucG5nIiwiaWF0IjoxNzU0NzIzNTk2LCJleHAiOjE3ODYyNTk1OTZ9.sfx6hxuVWi1oQdj9KY-QIJziTqHm-DgJXFZ9J3f2zjs",
      color: "Purple",
      colorHEX: "#877CB4",
      groupId: productGroups[1].id
    },
    {
      name: "Reusable eye masks, orange",
      price: 40,
      photoUrl: "https://svscxanowouqzblxoyxy.supabase.co/storage/v1/object/sign/clear-culture/products/img/eye-mask-orange.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82YzRlY2JiZC04ZWJjLTRhNTctODgwOC03NjNmZTE0YjZmM2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbGVhci1jdWx0dXJlL3Byb2R1Y3RzL2ltZy9leWUtbWFzay1vcmFuZ2UucG5nIiwiaWF0IjoxNzU0NzIzNTM4LCJleHAiOjE3ODYyNTk1Mzh9.eEiOrKr9aGHrSATkCYxhxMJascDJkyrPpE2oiANNpJo",
      color: "Orange",
      colorHEX: "#E89F4F",
      groupId: productGroups[1].id
    },
    {
      name: "Reusable Make up pads",
      price: 45,
      photoUrl: "https://svscxanowouqzblxoyxy.supabase.co/storage/v1/object/sign/clear-culture/products/img/makeup-removers.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82YzRlY2JiZC04ZWJjLTRhNTctODgwOC03NjNmZTE0YjZmM2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbGVhci1jdWx0dXJlL3Byb2R1Y3RzL2ltZy9tYWtldXAtcmVtb3ZlcnMucG5nIiwiaWF0IjoxNzU0NzIzNjU4LCJleHAiOjE3ODYyNTk2NTh9.2DFIHiwlXTD3nHdyDd-Me0q7uPSwjr2YNu7kv4oXmts",
      groupId: productGroups[2].id
    },
    {
      name: "Reusable Notebook, black",
      price: 60,
      photoUrl: "https://svscxanowouqzblxoyxy.supabase.co/storage/v1/object/sign/clear-culture/products/img/notebook-main.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82YzRlY2JiZC04ZWJjLTRhNTctODgwOC03NjNmZTE0YjZmM2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbGVhci1jdWx0dXJlL3Byb2R1Y3RzL2ltZy9ub3RlYm9vay1tYWluLnBuZyIsImlhdCI6MTc1NDcyMzY3MCwiZXhwIjoxNzg2MjU5NjcwfQ.y88ugN8UAJNm1sfrcx8Dg2EuzcFu3RrXTmYDycvUSPU",
      groupId: productGroups[3].id
    }
  ];
}