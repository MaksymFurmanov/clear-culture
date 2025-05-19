export default function Receipt({
                                  price, delivery
                                }: {
  price: number,
  delivery: number
}) {
  const total = price + delivery;

  return (
    <div className={"bg-light-green rounded-lg px-6 py-4 mx-4 mb-8"}>
      <div className={"mb-6"}>
        <div className={"flex justify-between"}>
          <p>
            Price
          </p>
          <p>
            {price} €
          </p>
        </div>

        <div className={"flex justify-between"}>
          <p>
            Delivery
          </p>
          <p>
            {delivery} €
          </p>
        </div>
      </div>

      <div className={"flex justify-between"}>
        <p className={"text-base"}>
          Total
        </p>
        <p className={"text-base"}>
          {total} €
        </p>
      </div>
    </div>
  );
}