"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import { ModalDeleteProps } from "@interfaces/interface-items";
import trashIcon from '@/assets/icons/trash.png';

const ModalDelete: React.FC<ModalDeleteProps> = ({ isOpen, isLoading, onClose, onDelete, titleName }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-600 p-6 rounded-md shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Image src={trashIcon} alt="Trash Icon" width={100} height={100} />
          </div>
          <h2 className="text-lg font-bold text-center">
            Apakah Kamu Yakin Ingin Menghapus {titleName}?
          </h2>
          <p className="text-center mt-2 text-md">
            {titleName} yang terhapus tidak bisa dikembalikan lagi, pastikan {titleName} yang dipilih sudah benar.
          </p>
          <div className="flex justify-between w-full mt-6">
            <Button
              onClick={onClose}
              disabled={isLoading}
              variant="outline"
              className="flex-1 mx-2 border-2 border-red text-red-foreground bg-white hover:bg-gold hover:text-blonde hover:border-0"
            >
              Tidak, Kembali
            </Button>
            <Button
              onClick={onDelete}
              disabled={isLoading}
              className="flex-1 mx-2 bg-red dark:text-white hover:bg-gold hover:text-blonde dark:hover:text-blonde "
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-4 w-4 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                <span>Iya Hapus</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
