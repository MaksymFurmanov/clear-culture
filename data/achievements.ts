import { ImgListItem } from "@/types";

export type Achievement = {
  text: string
} & ImgListItem;

const achievements: Achievement[] = [
  {
    src: "/img/about-us/ocean.jpg",
    alt: "",
    width: 1060,
    height: 562,
    text: "Reduced plastic waste by donating 5% of profits to ocean clean-up projects."
  },
  {
    src: "/img/about-us/forest.jpg",
    alt: "",
    width: 3872,
    height: 2592,
    text: "Planted over 8000 trees in collaboration with reforestation initiatives in various countries."
  },
  {
    src: "/img/about-us/env-edu.jpg",
    alt: "",
    width: 1200,
    height: 801,
    text: "Sponsored environmental education programs in schools, reaching 20,000 students globally."
  },
  {
    src: "/img/about-us/beach.jpg",
    alt: "",
    width: 1200,
    height: 730,
    text: "Partnered with local communities to create sustainable farming solutions, benefiting over 500 farmers."
  }
];

export default achievements;