import os

CURSOR_CODE = """import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#00FF94] pointer-events-none z-[9999] mix-blend-difference hidden sm:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(0, 255, 148, 0.2)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#00FF94] pointer-events-none z-[10000] hidden sm:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.1 }}
      />
    </>
  );
}
"""

with open(r"c:\Users\yuppp\Desktop\SEOPLANET-2.0-main1\frontend\src\components\ui\CustomCursor.jsx", "w", encoding="utf-8") as f:
    f.write(CURSOR_CODE)

# Add cursor:none to CSS
css_path = r"c:\Users\yuppp\Desktop\SEOPLANET-2.0-main1\frontend\src\index.css"
with open(css_path, "a", encoding="utf-8") as f:
    f.write("\n@media (pointer: fine) { body { cursor: none; } a, button { cursor: none !important; } }\n")

# Inject CustomCursor into App.jsx
app_path = r"c:\Users\yuppp\Desktop\SEOPLANET-2.0-main1\frontend\src\App.jsx"
with open(app_path, "r", encoding="utf-8") as f:
    app_content = f.read()

if "CustomCursor" not in app_content:
    app_content = app_content.replace('import { BrowserRouter', 'import CustomCursor from "./components/ui/CustomCursor";\nimport { BrowserRouter')
    app_content = app_content.replace('<AuthProvider>', '<AuthProvider>\n      <CustomCursor />')
    with open(app_path, "w", encoding="utf-8") as f:
        f.write(app_content)

print("Custom Cursor injected successfully!")
