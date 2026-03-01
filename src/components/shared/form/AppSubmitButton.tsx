import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type AppSubmitButtonProps = {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    variant?: "default" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

export default function AppSubmitButton({ children, className, disabled, loading, variant, size }: AppSubmitButtonProps) {
    return (
        <Button
            type="submit"
            className={cn(className)}
            disabled={disabled || loading}
            variant={variant}
            size={size}
        >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : children}
        </Button>
    )
}