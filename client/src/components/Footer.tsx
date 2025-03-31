import React from "react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center gap-16">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 font-sans">AceBot</h3>
            <p className="text-gray-300 text-sm max-w-sm">Your AI learning companion featuring Quizy for CBSE science subjects, JEE Mains and BITSAT preparation.</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-base font-semibold mb-4 font-sans">Subjects We Can Help Enhance</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Physics</li>
              <li>Chemistry</li>
              <li>Mathematics</li>
              <li>Biology</li>
            </ul>
          </div>
          
          <div className="text-center">
            <h3 className="text-base font-semibold mb-4 font-sans">Exams We Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>CBSE Boards</li>
              <li>JEE Mains</li>
              <li>BITSAT</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 flex flex-col items-center justify-center space-y-4">
          <div className="text-gradient bg-gradient-to-r from-blue-500 to-primary text-xl font-bold">
            AceBot
          </div>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} AceBot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
