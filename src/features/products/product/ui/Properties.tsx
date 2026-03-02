"use client";

import { useEffect, useState } from "react";
import randomColor from "randomcolor";

export default function Properties({ color }: {
  color: string | null
}) {
  const productProps: string[] = [];
  if (color) productProps.push(color);

  const [productColors, setProductColors] =
    useState<Record<string, string> | null>(null);

  useEffect(() => {
    if (productProps.length === 0) {
      setProductColors(null);
      return;
    }

    const colorMap: Record<string, string> = {};
    productProps.forEach(prop => {
      colorMap[prop] = randomColor({ luminosity: "light" });
    });
    setProductColors(colorMap);
  }, [color]);

  return (
    productColors && (
      <div className={"mb-4"}>
        {productProps.map((prop, index) => {
          return (
            <div key={index}
                 className={"rounded-full w-fit py-0.5 px-4"}
                 style={{ backgroundColor: productColors[prop] }}
            >
              <p>
                {prop}
              </p>
            </div>
          );
        })}
      </div>
    )
  );
}