import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Title({ children }: Props) {
  return (
    <h1 className="text-primary font-display text-4xl font-bold my-12 line-clamp-1">
      {children}
    </h1>
  );
}
