import React, { useEffect } from "react";

// Define the type for the props
interface ScriptLoaderProps {
  src: string;
  async?: boolean;
  onLoad?: () => void;
}

const Script: React.FC<ScriptLoaderProps> = ({ src, async = true, onLoad }) => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");

    // Set the src attribute to the URL of the external script
    script.src = src;

    // Set whether the script should load asynchronously
    script.async = async;

    // Set an onLoad callback if provided
    if (onLoad) {
      script.onload = onLoad;
    }

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup by removing the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [src, async, onLoad]); // Re-run if src or other props change

  return null; // This component doesn't render anything itself
};

export default Script;
