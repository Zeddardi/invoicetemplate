import React, { useRef } from 'react';
import { Image, Upload } from 'lucide-react';

interface Props {
  onUpload: (logo: string) => void;
  currentLogo?: string;
}

export default function LogoUploader({ onUpload, currentLogo }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Image size={20} />
        <h3 className="text-lg font-semibold">Company Logo</h3>
      </div>

      {currentLogo ? (
        <div className="space-y-4">
          <img
            src={currentLogo}
            alt="Company logo"
            className="max-h-32 mx-auto"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
          >
            Change Logo
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
          </div>
        </label>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/png,image/jpeg"
        onChange={handleFileChange}
      />
    </div>
  );
}