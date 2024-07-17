import { Button as MUI} from "@mui/material";
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
      <MUI>MUI Button</MUI>
      <User user={userData}></User>
    </div>
  );
}
