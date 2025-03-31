import React from "react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center gap-16">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 font-sans">EduAI</h3>
            <p className="text-gray-300 text-sm max-w-sm">Your AI learning companion for CBSE science subjects, JEE Mains and BITSAT preparation.</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-base font-semibold mb-4 font-sans">Subjects</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="#" className="hover:text-white">Physics</Link></li>
              <li><Link href="#" className="hover:text-white">Chemistry</Link></li>
              <li><Link href="#" className="hover:text-white">Mathematics</Link></li>
              <li><Link href="#" className="hover:text-white">Biology</Link></li>
            </ul>
          </div>
          
          <div className="text-center">
            <h3 className="text-base font-semibold mb-4 font-sans">Exams</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="#" className="hover:text-white">CBSE Boards</Link></li>
              <li><Link href="#" className="hover:text-white">JEE Mains</Link></li>
              <li><Link href="#" className="hover:text-white">BITSAT</Link></li>
              <li><Link href="#" className="hover:text-white">Study Resources</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 flex justify-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} EduAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
