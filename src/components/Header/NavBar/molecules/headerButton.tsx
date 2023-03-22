import LogInButton, {
  LoginButtonProps,
} from "@/components/Header/NavBar/atoms/logInButton";
import LogOutButton, {
  LogoutButtonProps,
} from "@/components/Header/NavBar/atoms/logOutButton";

export interface HeaderButtonProps extends LoginButtonProps, LogoutButtonProps {
  isAdmin: boolean;
}

const HeaderButton = ({
  isAdmin,
  onClickLogOut,
  onClickLogIn,
  isDesktop,
}: HeaderButtonProps) =>
  isAdmin ? (
    <LogOutButton isDesktop={isDesktop} onClickLogOut={onClickLogOut} />
  ) : (
    <LogInButton isDesktop={isDesktop} onClickLogIn={onClickLogIn} />
  );

export default HeaderButton;
