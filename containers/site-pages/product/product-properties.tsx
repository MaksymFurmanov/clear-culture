'use client';

import { useMemo } from "react";
import randomColor from "randomcolor";

export default function ProductProperties({ color }: {
  color: string | null
}) {
  const productProps: string[] = [];
  if (color) productProps.push(color);
  if (productProps.length === 0) return null;

  const productColors = useMemo(() => {
    const colorMap: Record<string, string> = {};

    productProps.forEach(prop => {
      colorMap[prop] = randomColor({ luminosity: "light" });
    });

    return colorMap;
  }, [color]);

  return (
    <div className={"mb-4"}>
      {productProps.map((prop: string, index) => {
        return (
          <div key={index}
               style={{ backgroundColor: productColors[prop] }}
               className={"rounded-full w-fit py-0.5 px-4"}
          >
            <p>
              {prop}
            </p>
          </div>
        );
      })}
    </div>
  );
}