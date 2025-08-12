import Circle from "@/public/img/circle.svg";

const actualCircleStyles = {fill: "#C3CCC0", stroke: "#2A2C35"};

export default function StatusBreadcrumbs({
                                             status,
                                             processedDate,
                                             shippedDate,
                                             arrivingDate,
                                           }: {
  status: string,
  processedDate: string | null,
  shippedDate: string | null,
  arrivingDate: string | null,
}) {

  return (
    <div className={"w-3/4 mx-auto mt-10 mb-18"}>
      <div className={"bg-dark-blue h-1 w-full"} />
      <div className={"flex relative mb-4"}>
        <Circle className={"w-6 fill-dark-blue absolute -left-3 -bottom-3"}
            style={status === "Processed" ? actualCircleStyles : {}}
        />
        <Circle className={"w-6 fill-dark-blue absolute left-[calc(50%-0.75em)] -bottom-3"}
                style={status === "Shipped" ? actualCircleStyles : {}}
        />
        <Circle className={"w-6 fill-dark-blue absolute -right-3 -bottom-3"}
                style={status === "Arrived" ? actualCircleStyles : {}}
        />
      </div>

      <div className={"flex relative"}>
        <div className={"absolute -left-9"}>
          <p className={"text-center text-base"}>
            Processed <br/>
            {processedDate}
          </p>
        </div>

        <div className={"absolute left-[calc(50%-2.5em)]"}>
          <p className={"text-center text-base"}>
            Shipped <br />
            {shippedDate}
          </p>
        </div>

        <div className={"absolute -right-5"}>
          <p className={"text-center text-base"}>
            Arrived <br />
            {arrivingDate}
          </p>
        </div>
      </div>
    </div>
  );
}