import { cn } from "#/lib/utils";
import { Button, type ButtonProps } from "./Button";

interface TabsProps {
  className?: string;
  children: React.ReactNode;
}

export function Tabs({ children, className }: TabsProps) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

export function TabTrigger({ className, children, ...props }: ButtonProps) {
  return (
    <Button
      variant="ghost"
      size="lg"
      className={cn("bg-box", className)}
      {...props}
    >
      {children}
    </Button>
  );
}

export function TabTriggerGroup({ children, className }: TabsProps) {
  return <div className={cn(className)}>{children}</div>;
}

export function TabContent({ children, className }: TabsProps) {
  return <div className={cn("", className)}>{children}</div>;
}
