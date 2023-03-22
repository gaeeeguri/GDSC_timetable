import LoginButton, {
  LoginButtonProps,
} from "@/components/Header/atoms/loginButton";
import LogoutButton, {
  LogoutButtonProps,
} from "@/components/Header/atoms/logoutButton";

export interface HeaderButtonProps extends LoginButtonProps, LogoutButtonProps {
  isAdmin: boolean;
}

const HeaderButton = ({ isAdmin, logOut, logIn }: HeaderButtonProps) =>
  isAdmin ? <LogoutButton logOut={logOut} /> : <LoginButton logIn={logIn} />;

export default HeaderButton;
