import Decimal from "decimal.js";

export default function sumAllDecimal(pricesAndAmount: [string, number][]): Decimal {
  let sum = new Decimal(0);
  pricesAndAmount.forEach((priceAndAmount) => {
    const [price, amount] = priceAndAmount;
    sum = sum.add(new Decimal(price).mul(amount));
  });

  return sum;
}