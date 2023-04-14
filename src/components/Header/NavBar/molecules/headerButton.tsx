import LogInButton, {
  LoginButtonProps,
} from "@/components/Header/NavBar/atoms/logInButton";
import LogOutButton, {
  LogoutButtonProps,
} from "@/components/Header/NavBar/atoms/logOutButton";
import { IsDeskTop } from "@/components/Types/type";

export interface HeaderButtonProps
  extends LoginButtonProps,
    LogoutButtonProps,
    IsDeskTop {
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
