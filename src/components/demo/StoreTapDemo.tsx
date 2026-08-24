"use client";

import React, { useState, useRef } from 'react';
import { Wifi, WifiOff, Monitor, MousePointerClick } from 'lucide-react';

export default function StoreTapDemo() {
  const [isOnline, setIsOnline] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleNetwork = () => {
    const newState = !isOnline;
    setIsOnline(newState);
    
    // Send postMessage to the iframe to toggle its internal demo mode hook
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ 
        type: newState ? 'FORCE_ONLINE' : 'FORCE_OFFLINE' 
      }, '*');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-16">
      
      {/* External Control Panel (The Simulator Controls) */}
      <div className="mb-8 p-6 bg-[#09090b] border border-zinc-800 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative z-20">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <span className="text-blue-500">🎮</span> Live System Embed
          </h3>
          <p className="text-zinc-400 text-sm">
            Experience the <b>actual StoreTap system</b> right here! Try turning off the internet below, making a sale, and turning it back on to see our seamless background sync in action!
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-zinc-900 p-3 rounded-xl border border-zinc-800 shrink-0">
          <span className="text-sm font-medium text-zinc-300">Network Connection:</span>
          <button 
            onClick={toggleNetwork}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isOnline ? 'translate-x-8' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm font-bold w-16 ${isOnline ? 'text-emerald-500' : 'text-red-500'}`}>
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* The Computer Frame Wrapper */}
      <div 
        className="relative rounded-2xl overflow-hidden border-[12px] border-[#1e1e21] shadow-2xl bg-[#0d1117] h-[750px] group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        
        {/* Iframe displaying the actual live StoreTap system with auto-login hook */}
        <iframe 
          ref={iframeRef}
          src="https://storetap-v2-1.free.je?demo=true" 
          className="w-full h-full border-none bg-white"
          title="StoreTap Live Demo"
          allow="fullscreen"
        />

        {/* Hover Overlay Hint (Optional, just makes it feel interactive) */}
        <div className={`absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs px-4 py-2 rounded-full flex items-center gap-2 transition-opacity duration-300 pointer-events-none ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          <MousePointerClick size={14} />
          Feel free to click around! It's fully functional.
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-500">
        <Monitor size={16} />
        <span>Powered by the actual StoreTap Cloud Engine</span>
      </div>
    </div>
  );
}
