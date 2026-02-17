"use client";

import type { MDXComponents } from 'mdx/types'
import { ReactNode } from "react";
import MdxImage from "@/components/mdx/mdx-image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: ({ children, ...props }): ReactNode => (
      <p
        style={{
          padding: '0.75em 0',
          maxWidth: '50em',
          margin: 'auto',
        }}
        {...props}
      >
        {children}
      </p>
    ),

    h3: ({ children, ...props }): ReactNode => (
      <h3
        style={{
          fontWeight: 'bold',
          fontSize: '1.1rem',
          padding: '1.5em 0',
        }}
        {...props}
      >
        {children}
      </h3>
    ),
    MDXImage: ({...props}): ReactNode => (
      <MdxImage {...props}/>
    ),

    ...components,
  }
}