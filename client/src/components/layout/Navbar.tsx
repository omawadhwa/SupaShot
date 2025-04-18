import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Menu, ImageIcon, Bell, User } from "lucide-react";

const Navbar: React.FC = () => {
  const [location] = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <ImageIcon className="h-6 w-6 text-[#10b981] mr-2" />
              <Link href="/">
                <span className="font-bold text-lg cursor-pointer">ScreenshotBeautifier</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/editor">
                <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location === "/editor" 
                    ? "border-[#10b981] text-gray-900" 
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}>
                  Editor
                </a>
              </Link>
              <Link href="/templates">
                <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Templates
                </a>
              </Link>
              <Link href="/examples">
                <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Examples
                </a>
              </Link>
              <Link href="/pricing">
                <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Pricing
                </a>
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="ml-3 relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Your Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link href="/editor">Editor</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/templates">Templates</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/examples">Examples</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/pricing">Pricing</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
