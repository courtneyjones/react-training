import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Route } from "react-router-dom";
import { About } from "./About";
import { FoodForm } from "./FoodForm";
import { Nav } from "./Nav";
import { Pantry } from "./Pantry";
import { UserContextProvider, UserContextType } from "./UserContext";

const user: UserContextType = {
  email: "test@t.com",
  name: "John",
  role: "admin",
  token: "1234",
};
export function App() {
  const queryClient = new QueryClient();

  return (
    <UserContextProvider value={user}>
      <BrowserRouter>
        <Nav />
        <Route path="/about">
          <About />
        </Route>
        <Route path="/food" exact>
          <FoodForm />
        </Route>
        <Route path="/food/:foodId">
          <FoodForm />
        </Route>
        <Route path="/" exact>
          <Pantry />
        </Route>
      </BrowserRouter>
    </UserContextProvider>
  );
}
