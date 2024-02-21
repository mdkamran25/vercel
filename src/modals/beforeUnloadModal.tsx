"use client"
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const BeforeUnloadModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
//   useEffect(() => {
//     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//       event.preventDefault();
//       event.returnValue = '';
//     };
//     if (isOpen) {
//       window.addEventListener('beforeunload', handleBeforeUnload);
//     } else {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     }
//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, [isOpen]);

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50`}>
      <div className="bg-white w-96 p-4 rounded-lg">
        <p className="mb-4">Are you sure you want to leave this page?</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">No</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-500 text-white rounded">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default BeforeUnloadModal;
