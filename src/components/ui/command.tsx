"use client"

import * as React from "react"
import { Command as CommandPrimitive, CommandGroup as CommandGroupPrimitive } from "cmdk"
import { PopoverClose } from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Command = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) => (
  <CommandPrimitive
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
)
Command.displayName = CommandPrimitive.displayName

const CommandEmpty = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty
    className={cn("py-6 text-center text-sm font-medium", className)}
    {...props}
  />
)
CommandEmpty.displayName = "CommandEmpty"

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandGroupPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandGroupPrimitive>
>(({ className, ...props }, ref) => (
  <CommandGroupPrimitive
    ref={ref}
    className={cn("overflow-hidden p-1 text-foreground [&>[cmdk-group-heading]]:px-2 [&>[cmdk-group-heading]]:font-medium [&>[cmdk-group-heading]]:text-muted-foreground", className)}
    {...props}
  />
))
CommandGroup.displayName = CommandGroupPrimitive.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))
CommandList.displayName = "CommandList"

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="border-border flex items-center border-b px-3">
    <Search className="mr-2 h-4 w-4 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  </div>
))
CommandInput.displayName = "CommandInput"

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = "CommandItem"

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = "CommandSeparator"

export {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandItem,
  CommandInput,
  CommandSeparator,
}

import { Search } from "lucide-react"
