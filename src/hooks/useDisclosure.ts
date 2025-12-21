import { useState, useCallback } from "react";

interface UseDisclosureOptions {
  open?: boolean;
  defaultOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

interface UseDisclosureReturn {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  setOpen: (value: boolean) => void;
}

export function useDisclosure({
  open: controlledOpen,
  defaultOpen,
  onClose,
  onOpen,
}: UseDisclosureOptions = {}): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen || false);

  const open = controlledOpen !== undefined ? controlledOpen : isOpen;

  const handleOpen = useCallback(() => {
    if (onOpen) onOpen();
    setIsOpen(true);
  }, [onOpen]);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    setIsOpen(false);
  }, [onClose]);

  const handleToggle = useCallback(() => {
    open ? handleClose() : handleOpen();
  }, [open, handleOpen, handleClose]);

  return {
    open,
    onOpen: handleOpen,
    onClose: handleClose,
    onToggle: handleToggle,
    setOpen: setIsOpen,
  };
}
