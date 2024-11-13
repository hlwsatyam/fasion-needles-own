import { Toast } from 'bootstrap';
import React from 'react';
import {
  FaWhatsapp, FaFacebookF, FaInstagram, FaTwitter, FaLink
} from 'react-icons/fa';

const SharePage = () => {
  const currentUrl = window.location.href;

  const handleShare = (platform) => {
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'instagram':
        alert('Instagram sharing is not supported through direct URL.');
        return;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(currentUrl);
       
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-col items-center mb-4   rounded-xl space-y-6 w-full     border-gray-200">
      <h2 className="text-3xl w-full !text-left font-bold text-gray-900 mb-2">Share this Item</h2>
      <div className="flex w-full mt-0  justify-start space-x-2">
        <button
          className=" h-6 w-6 flex items-center justify-center bg-green-500 hover:bg-green-600 rounded-full text-white transition-transform transform hover:scale-110"
          onClick={() => handleShare('whatsapp')}
        >
          <FaWhatsapp size={20} />
        </button>
        <button
          className=" h-6 w-6 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-transform transform hover:scale-110"
          onClick={() => handleShare('facebook')}
        >
          <FaFacebookF size={18} />
        </button>
        <button
          className=" h-6 w-6 flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 rounded-full text-white transition-transform transform hover:scale-110"
          onClick={() => handleShare('instagram')}
        >
          <FaInstagram size={18} />
        </button>
        <button
          className=" h-6 w-6 flex items-center justify-center bg-blue-400 hover:bg-blue-500 rounded-full text-white transition-transform transform hover:scale-110"
          onClick={() => handleShare('twitter')}
        >
          <FaTwitter size={18} />
        </button>
        <button
          className=" h-6 w-6 flex items-center justify-center bg-gray-700 hover:bg-gray-800 rounded-full text-white transition-transform transform hover:scale-110"
          onClick={() => handleShare('copy')}
        >
          <FaLink size={18} />
        </button>
      </div>
     
    </div>
  );
};

export default SharePage;
