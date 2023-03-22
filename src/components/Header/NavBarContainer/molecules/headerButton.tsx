import LogInButton, {
  LoginButtonProps,
} from "@/components/Header/NavBarContainer/atoms/logInButton";
import LogOutButton, {
  LogoutButtonProps,
} from "@/components/Header/NavBarContainer/atoms/logOutButton";

export interface HeaderButtonProps extends LoginButtonProps, LogoutButtonProps {
  isAdmin: boolean;
}

const HeaderButton = ({ isAdmin, logOut, logIn }: HeaderButtonProps) =>
  isAdmin ? <LogOutButton logOut={logOut} /> : <LogInButton logIn={logIn} />;

export default HeaderButton;
