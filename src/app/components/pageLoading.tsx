"use client";
import { useState, useEffect } from "react";

export function PageLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); 
  }, []); 

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",        
          top: "50%",               
          left: "50%",             
          transform: "translate(-50%, -50%)", 
          zIndex: 9999,             
        }}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  return null;
}
