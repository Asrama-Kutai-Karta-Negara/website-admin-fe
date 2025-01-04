"use client";

import { Edit, Eye, MoreVertical, Trash } from "lucide-react";

import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { ProjectActionsProps } from "@interfaces/interface-items";
import Link from "next/link";
import { useState } from "react";
import ModalDelete from "@ui/data/modal-delete";
import { deleteItem } from "@constant/condition/general";
import { useQueryClient } from "./hook";

export function ProjectActions<TData>({ row, path }: ProjectActionsProps<TData>) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const id = row.getValue("id");
  const generatedEditUrl = `/${path}/edit/${id}`;

  const { isLoading, deleteQuery } = useQueryClient();

  const handleDelete = async () => {

    const validId = id && typeof id === 'string' ? id : ''; 
    console.log("Item to delete:", validId);
    await deleteQuery(validId, path, () => {
      window.location.href = path;
    });
    if(!isLoading){
      setDeleteModalOpen(false);
    }
  };
  const titleName = deleteItem.find(item => item.key === path) || deleteItem.find(item => item.key === 'not-found');

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4 text-blue-500 dark:text-blue-200" />
          Detail
        </DropdownMenuItem>
        <Link href={generatedEditUrl}>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4 text-green-500 dark:text-green-200" />
            Edit
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>
          <Trash className="mr-2 h-4 w-4 text-red-500 dark:text-red-200" />
          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <ModalDelete
      isOpen={isDeleteModalOpen}
      isLoading={isLoading}
      onClose={() => setDeleteModalOpen(false)}
      onDelete={handleDelete}
      titleName={titleName?.label}
    />
    </>
  );
}
