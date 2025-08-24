import React, { AnchorHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";

const ScalingUnderlineLink: React.FC<{
  children: ReactNode,
  href: string,
  className?: string,
} & AnchorHTMLAttributes<HTMLAnchorElement>> = ({
                                                  children,
                                                  href,
                                                  className,
                                                  ...rest
                                                }) => {
  return (
    <Link href={href}
          className={clsx("relative group", className)}
          {...rest}
    >
      {children}
      <span
        className="absolute bottom-0 left-1/2 w-full h-[1px] bg-current transform -translate-x-1/2 scale-x-0 duration-300 group-hover:scale-x-100"
      />
    </Link>
  );
};

export default ScalingUnderlineLink;