import { ProductVariant } from "@/types/database";
import { useMemo } from "react";
import randomColor from "randomcolor";

export default function VariantProperties({ currVariant }: {
  currVariant: ProductVariant
}) {
  const variantProps: string[] = [];
  if (currVariant.color) variantProps.push(currVariant.color);

  const variantColors = useMemo(() => {
    const colorMap: Record<string, string> = {};

    variantProps.forEach(prop => {
      colorMap[prop] = randomColor({ luminosity: "light" });
    });

    return colorMap;
  }, [currVariant]);

  return (
    <>
      {variantProps.length > 0 && (
        <div className={"mb-4"}>
          {variantProps.map((prop: string, index) => {
            return (
              <div key={index}
                   style={{ backgroundColor: variantColors[prop] }}
                   className={"rounded-full w-fit text-sm py-0.5 px-4"}
              >
                <p>
                  {prop}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}