import Decimal from "decimal.js";

export default function Receipt({
                                  price,
                                  delivery
                                }: {
  price: Decimal,
  delivery: Decimal
}) {
  const total = price.add(delivery);

  return (
    <div className={"bg-light-green rounded-lg px-6 py-4 mx-4 mb-8"}>
      <div className={"mb-6"}>
        <div className={"flex justify-between"}>
          <p>
            Price
          </p>
          <p>
            {price.toString()} €
          </p>
        </div>

        <div className={"flex justify-between"}>
          <p>
            Delivery
          </p>
          <p>
            {delivery.toString()} €
          </p>
        </div>
      </div>

      <div className={"flex justify-between"}>
        <p className={"text-base"}>
          Total
        </p>
        <p className={"text-base"}>
          {total.toString()} €
        </p>
      </div>
    </div>
  );
}