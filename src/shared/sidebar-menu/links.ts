import { SidebarLink } from "@/src/shared/sidebar-menu/sidebar-menu.types";

const links: SidebarLink[] = [
  {
    caption: "Cart",
    href: "/cart",
    src: "/img/sidebar/cart.svg"
  },
  {
    caption: "Product catalog",
    href: "/catalog/1",
    src: "/img/sidebar/product-catalog.svg"
  },
  {
    caption: "Profile",
    href: "/profile",
    src: "/img/sidebar/profile.svg"
  },
  {
    caption: "Favorites",
    href: "/favorites",
    src: "/img/sidebar/favorites.svg"
  },
  {
    caption: "Orders",
    href: "/orders",
    src: "/img/sidebar/orders.svg"
  },
  {
    caption: "Addresses",
    href: "/address-book",
    src: "/img/sidebar/address.svg"
  },
];

export default links;