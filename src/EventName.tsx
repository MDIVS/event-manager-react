import { ComponentProps } from "react";

interface EventNameProps extends ComponentProps<'h1'> {
  children: string;
}

export function EventName(props: EventNameProps) {
  return (
    <h1 {...props} className="font-bold text-lg text-yellow-500">
      {props.children}
    </h1>
  )
}