import React, { useEffect, useMemo, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  children: string;
}

/*
* Component that renders mermaid charts, uses memoization to cache graph between
* renders. Needed because React.StrictMode re-renders components and on the
* second pass Mermaid renders an empty graph. I dont know why. But thats how it
* is.
*/
const Mermaid = ({ children }: MermaidProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [svgContent, setSvgContent] = useState<string | null>(null);

  // Memoize the SVG content
  const memoizedSvg = useMemo(() => svgContent, [svgContent]);

  useEffect(() => {
    const renderChart = async () => {
      if (chartContainerRef.current) {
        try {
          mermaid.initialize({ startOnLoad: false });
          const { svg } = await mermaid.render('mermaidChart', children);
          setSvgContent(svg); // Update state with rendered SVG
        } catch (error) {
          console.error('Error rendering Mermaid chart:', error);
        }
      }
    };

    renderChart();
  }, [children]); // Depend on `children` to re-render if it changes

  useEffect(() => {
    if (chartContainerRef.current && memoizedSvg) {
      chartContainerRef.current.innerHTML = memoizedSvg;
    }
  }, [memoizedSvg]); // Depend on `memoizedSvg` to update container

  return <div ref={chartContainerRef} />;
};

export default Mermaid;