import React, { useEffect, useRef, useState } from "react";

const Modal = ({
  onClose,
  onConfirm,
  title,
  description,
  isOpen,
  textCancel = "Cancelar",
  textConfirm = "Confirmar",
}) => {
  const modalRef = useRef(null);
  const firstElementRef = useRef(null);
  const lastElementRef = useRef(null);
  const [isOverlayClickDisabled, setOverlayClickDisabled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (!isOverlayClickDisabled) {
      onClose();
    }
  };

  const handleModalClick = () => {
    setOverlayClickDisabled(true);
    setTimeout(() => {
      setOverlayClickDisabled(false);
    }, 300);
  };

  const handleTabKeyPress = (event) => {
    if (event.key === "Tab") {
      if (
        event.shiftKey &&
        document.activeElement === firstElementRef.current
      ) {
        event.preventDefault();
        lastElementRef.current?.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElementRef.current
      ) {
        event.preventDefault();
        firstElementRef.current?.focus();
      }
    }
    if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            tabIndex={0}
            className="absolute size-full bg-black/40 outline-none"
            onClick={handleOverlayClick}
            onKeyDown={handleTabKeyPress}
          />
          <div
            className="relative z-10 size-full max-w-lg p-4 md:h-auto"
            onClick={handleModalClick}
          >
            <div
              className="relative rounded-3xl bg-white p-3 text-center shadow md:p-8"
              onKeyDown={handleTabKeyPress}
            >
              <div className="mb-4 text-gray-500">
                <h3 className="mb-3 text-2xl font-semibold  text-[#202124]">
                  {title}
                </h3>
                <p>{description}</p>
              </div>
              <div>
                <div className="items-center gap-4 sm:flex sm:gap-0">
                  <button
                    type="button"
                    onClick={onClose}
                    ref={firstElementRef}
                    className=" w-full rounded-s-xl  px-4 py-2 font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {textCancel}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    ref={lastElementRef}
                    className="
                     w-full rounded-e-xl border-transparent border px-4 py-2 sm:border-l-black text-center font-bold text-royal-amethyst hover:bg-gray-100"
                  >
                    {textConfirm}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
