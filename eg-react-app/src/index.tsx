import { render } from "react-dom";
import { App } from "./App";

// A react component -> Components by function!

// HTML					vs JSX
// class				className
// for 					htmlFor
// inline styles are strings		objects, numbers == px
// <!-- comments -->				{/* comments */}
render(<App />, document.getElementById("root"));
