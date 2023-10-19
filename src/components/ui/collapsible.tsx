"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

import "./collapsible.css"
import { cn } from "@/lib/utils"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

type CollapsibleContentProps = Parameters<
  typeof CollapsiblePrimitive.CollapsibleContent
>["0"]
const CollapsibleContent = (props: CollapsibleContentProps) => (
  <CollapsiblePrimitive.CollapsibleContent
    {...props}
    className={cn(props.className, "CollapsibleContent")}
  ></CollapsiblePrimitive.CollapsibleContent>
)

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
