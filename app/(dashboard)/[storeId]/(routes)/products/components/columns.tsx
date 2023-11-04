"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string
  name: string
  price: string
  category: string
  favorite: string
  hypoallergenic: string
  isFeatured: boolean
  isOutOfStock: boolean
  createdAt: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isOutOfStock",
    header: "Out Of Stock",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "favorite",
    header: "Favorite",
  },
  {
    accessorKey: "hypoallergenic",
    header: "Hypoallergenic",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.hypoallergenic}
        <div 
        className="h-6 w-6 rounded-full border"
        style={{ backgroundColor: row.original.hypoallergenic }}
        />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({  row }) => < CellAction data={row.original} />
  }
 
]
