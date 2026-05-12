"use client";

import { CiWarning } from "react-icons/ci";

interface ErrorModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export const ErrorModal = ({ isOpen, message, onClose }: ErrorModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      {/* Modal Box */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <CiWarning />
          </div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">Action Failed</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-8 font-medium">
          {message}
        </p>
        
        <button 
          onClick={onClose} 
          className="w-full bg-black text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-sm"
        >
          DISMISS
        </button>
      </div>
    </div>
  );
};