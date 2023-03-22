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
}: HeaderButtonProps) =>
  isAdmin ? (
    <LogOutButton onClickLogOut={onClickLogOut} />
  ) : (
    <LogInButton onClickLogIn={onClickLogIn} />
  );

export default HeaderButton;
