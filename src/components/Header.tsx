
import React from "react";
import { Mail } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-8 border-b">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-brand-600 text-white rounded-md p-1.5">
            <Mail size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-brand-700">Email Scribe</h1>
            <p className="text-sm text-gray-500">AI-powered email assistant</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-brand-600">
            Templates
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-brand-600">
            Features
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-brand-600">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
