import { Button } from "@mui/material";
import { Button } from "../components/ui/Button";
import { User } from "../components/user/User";

const userData = {
  id: 1,
  name: "Steve Waugh",
  role: "Software Engineer",
  age: 21,
};

export function HomePage() {
  return (
    <div>
      <Button />
      <Button>MUI Button</Button>
      <User />
    </div>
  );
}
