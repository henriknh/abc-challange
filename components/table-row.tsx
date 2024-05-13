'use client';

import { useRouter } from "next/navigation";
import { ReactNode } from "react"

export interface TableRowProps {
    href?: string;
    className?: string;
    children: ReactNode;
}

export function TableRow({children, href, className}: TableRowProps) {

    const router = useRouter();

    return <tr onClick={() => router.push(href)} className={className}>{children}</tr>
}