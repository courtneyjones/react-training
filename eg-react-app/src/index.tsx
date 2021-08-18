import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { About } from "./About";
import { App } from "./App";
import { Nav } from "./Nav";

// A react component -> Components by function!

// HTML					vs JSX
// class				className
// for 					htmlFor
// inline styles are strings		objects, numbers == px
// <!-- comments -->				{/* comments */}
render(
  <BrowserRouter>
    <Nav />
    <Route path="/about">
      <About />
    </Route>
    <Route path="/" exact>
      <App />
    </Route>
  </BrowserRouter>,
  document.getElementById("root")
);
