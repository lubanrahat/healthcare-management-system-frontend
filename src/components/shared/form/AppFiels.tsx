import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form"
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

type AppFielsProps = {
    field: AnyFieldApi;
    label: string;
    placeholder?: string;
    type?: string;
    append?: React.ReactNode;
    prepend?: React.ReactNode;
    disabled?: boolean;
    className?: string;

}

export default function AppFiels({ field, label, placeholder, type = "text", append, prepend, disabled, className }: AppFielsProps) {
    return (
        <div className={cn("space-y-1.5", className)}>
            <Label htmlFor={field.name} className={cn("font-medium", disabled && "cursor-not-allowed opacity-50")}>{label}</Label>
            <div className="relative">
                {prepend && <div className="absolute left-2 top-1/2 -translate-y-1/2">{prepend}</div>}
                <Input
                    type={type}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={() => field.handleBlur()}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        prepend && "pl-10",
                        append && "pr-10",
                        field.state.meta.errors.length > 0 && "border-red-500 focus-visible:ring-red-500"
                    )}
                />
                {append && <div className="absolute right-2 top-1/2 -translate-y-1/2">{append}</div>}
            </div>
            {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-red-500">{field.state.meta.errors[0]}</p>
            )}
        </div>
    )
}