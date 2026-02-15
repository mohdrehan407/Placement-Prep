import { useRef, useEffect } from "react"

export function Progress({ value, className }) {
    return (
        <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-100 ${className}`}>
            <div
                className="h-full w-full flex-1 bg-[hsl(245,58%,51%)] transition-all ease-out duration-1000"
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </div>
    )
}
