import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

type DeleteAddressModalProps = {
  addressId: string;
  handleDelete: (addressId: string) => void;
};

const DeleteAddressModal = ({
  addressId,
  handleDelete,
}: DeleteAddressModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button
            variant="destructive"
            className="hover:bg-destructive/10 rounded-full bg-white px-3 py-1.5 text-xs font-medium transition-colors"
          >
            Delete
          </Button>
        }
      ></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yakin mau hapus alamat ini?</DialogTitle>
          <DialogDescription>
            Alamat ini akan dihapus permanen dan tidak bisa dipulihkan lagi.
          </DialogDescription>
          <div className="flex justify-end gap-4">
            <Button
              variant="destructive"
              onClick={() => handleDelete(addressId)}
            >
              Hapus
            </Button>
            <DialogClose
              render={
                <Button type="button" variant={"outline"}>
                  Batal
                </Button>
              }
            ></DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAddressModal;
