export type Review = {
  imgSrc: string,
  text: string,
  author: string
}

const reviews: Review[] = [
  {
    imgSrc: "/img/reviews-gallery/solid-conditioner.jpg",
    text: "This solid plastic-free eco conditioner has completely transformed my hair care routine. After years of using bottled conditioners, I am amazed at how soft and manageable my hair feels with this sustainable option. Plus, I'm proud to be cutting down on plastic waste while still getting salon-quality results.",
    author: "Emilia Schmidt"
  },
  {
    imgSrc: "/img/reviews-gallery/cleansing-rounds.jpg",
    text: "These reusable cleaning rounds have revolutionized my daily skincare regimen. Unlike disposable cotton pads, these rounds are both durable and gentle on my skin. It's great to reduce waste without compromising on quality and effectiveness.",
    author: "Sophia Rossi"
  },
  {
    imgSrc: "/img/reviews-gallery/razor.jpg",
    text: "Switching to this eco reusable razor has been a game-changer for me. After years of using disposable razors, I am thrilled with the smooth shave and durable design of this sustainable alternative. Not only am I reducing waste, but I'm also enjoying a superior shaving experience.",
    author: "Lukas Müller"
  }
];

export default reviews;