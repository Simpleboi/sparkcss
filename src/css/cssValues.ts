export const cssValues = {
  // Color-related values
  colors: ["red", "blue", "green", "black", "white", "yellow", "cyan", "magenta", "gray", "silver", "navy", "fuchsia", "lime", "olive", "teal", "purple", "aqua", "maroon", "orange", "brown", "pink", "beige", "chartreuse", "gold", "indigo", "violet", "turquoise", "crimson", "peru", "tan"],

  // Layout-related values
  display: ["block", "inline", "inline-block", "flex", "inline-flex", "none", "grid", "inline-grid", "list-item", "table", "table-row", "table-cell", "table-column", "table-caption", "unset", "initial", "revert"],
  position: ["static", "relative", "absolute", "fixed", "sticky"],
  float: ["left", "right", "none", "inherit", "initial", "unset"],
  clear: ["both", "left", "right", "none"],
  
  // Units
  units: ["px", "em", "rem", "%", "vh", "vw", "vmin", "vmax", "ch", "ex", "cm", "mm", "in", "pt", "pc", "deg", "rad", "turn", "ms", "s", "fr", "auto"],
  
  // Text properties
  fontFamily: ["Arial", "Helvetica", "sans-serif", "Georgia", "serif", "Courier", "monospace", "Times New Roman", "Verdana", "Tahoma", "Palatino", "Garamond", "Courier New", "Lucida Console"],
  fontSize: ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "36px", "48px", "64px", "72px", "px", "em", "rem", "vw"],
  fontWeight: ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
  fontStyle: ["normal", "italic", "oblique"],
  textAlign: ["left", "right", "center", "justify", "start", "end", "initial", "inherit"],
  textDecoration: ["none", "underline", "overline", "line-through", "blink"],
  textTransform: ["none", "capitalize", "uppercase", "lowercase"],
  
  // Box model properties
  width: ["auto", "100%", "50%", "25%", "200px", "1rem", "10em", "max-content", "min-content", "fit-content"],
  height: ["auto", "100%", "50%", "25%", "200px", "1rem", "10em", "max-content", "min-content", "fit-content"],
  margin: ["auto", "0", "1rem", "10px", "2%", "5vw"],
  padding: ["0", "1rem", "10px", "2%", "5vw"],
  borderWidth: ["thin", "medium", "thick", "1px", "2px", "5px"],
  borderStyle: ["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset", "none"],
  borderColor: ["black", "white", "red", "green", "blue", "transparent"],
  borderRadius: ["0", "5px", "10px", "50%", "10rem", "1em"],
  boxShadow: ["none", "0 0 5px rgba(0,0,0,0.5)", "0 4px 6px rgba(0,0,0,0.1)", "inset 0 0 5px rgba(0,0,0,0.3)"],
  boxSizing: ["content-box", "border-box"],
  outline: ["none", "1px solid black", "2px solid red", "5px dashed green"],
  
  // Flexbox properties
  flex: ["0 1 auto", "1 1 0", "1 1 100px", "auto", "initial", "none"],
  justifyContent: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "stretch"],
  alignItems: ["stretch", "flex-start", "flex-end", "center", "baseline"],
  alignSelf: ["auto", "flex-start", "flex-end", "center", "baseline", "stretch"],
  flexDirection: ["row", "row-reverse", "column", "column-reverse"],
  flexWrap: ["nowrap", "wrap", "wrap-reverse"],
  gap: ["0", "5px", "10px", "1rem", "2vw"],
  
  // Grid properties
  gridTemplateColumns: ["auto", "repeat(3, 1fr)", "100px 1fr 200px", "1fr 2fr", "minmax(100px, 1fr)"],
  gridTemplateRows: ["auto", "repeat(3, 1fr)", "100px 1fr", "minmax(100px, 1fr)"],
  gridGap: ["0", "5px", "10px", "1rem", "2vw"],
  gridColumn: ["auto", "span 2", "1 / span 3", "1 / 3", "3 / 5"],
  gridRow: ["auto", "span 2", "1 / span 3", "1 / 3", "3 / 5"],
  
  // Background properties
  backgroundColor: ["transparent", "red", "blue", "green", "yellow", "black", "#ff5733", "#33ff57"],
  backgroundImage: ["url('image.jpg')", "none", "linear-gradient(to right, red, blue)", "radial-gradient(circle, red, yellow)"],
  backgroundSize: ["auto", "cover", "contain", "100% 100%", "50% 50%"],
  backgroundPosition: ["top left", "top right", "bottom left", "bottom right", "center", "center center"],
  backgroundRepeat: ["no-repeat", "repeat", "repeat-x", "repeat-y"],
  
  // Transition properties
  transition: ["none", "all 0.3s ease", "opacity 0.5s ease-in-out", "transform 0.2s linear"],
  transitionTimingFunction: ["ease", "linear", "ease-in", "ease-out", "ease-in-out", "cubic-bezier(0.4, 0, 0.2, 1)"],
  transitionDelay: ["0s", "1s", "0.3s"],
  transitionDuration: ["0s", "0.5s", "1s"],
  
  // Animation properties
  animation: ["none", "fadeIn 2s ease-in-out", "slideUp 1s ease-in", "bounce 1.5s infinite"],
  animationName: ["none", "fadeIn", "slideUp", "bounce"],
  animationDuration: ["1s", "2s", "3s", "4s"],
  animationTimingFunction: ["ease", "linear", "ease-in", "ease-out", "ease-in-out"],
  animationIterationCount: ["1", "infinite", "2", "3"],
  animationDelay: ["0s", "0.5s", "1s"],
  animationDirection: ["normal", "reverse", "alternate", "alternate-reverse"],
  
  // Visibility and Overflow properties
  visibility: ["visible", "hidden", "collapse"],
  overflow: ["visible", "hidden", "scroll", "auto"],
  overflowX: ["visible", "hidden", "scroll", "auto"],
  overflowY: ["visible", "hidden", "scroll", "auto"],
  
  // Misc properties
  zIndex: ["auto", "1", "10", "100", "1000"],
  cursor: ["auto", "pointer", "default", "move", "text", "wait", "crosshair", "help", "not-allowed", "zoom-in"],
  opacity: ["0", "0.5", "1"],
  objectFit: ["contain", "cover", "fill", "none", "scale-down"],
  objectPosition: ["center", "top", "bottom", "left", "right", "50% 50%"],
  transform: ["none", "rotate(45deg)", "scale(1.5)", "translateX(50px)", "translateY(50px)", "skewX(30deg)", "skewY(30deg)"],
  transformOrigin: ["center", "top left", "bottom right", "50% 50%"],
};
