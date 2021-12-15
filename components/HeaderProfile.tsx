import { default_avatar } from "@/constants/constants";
import { useAuth } from "@/context/AuthContext";
import { useLogoutMutation } from "@/src/generated/graphql";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function HeaderProfile() {
  const router = useRouter();
  const { setUser, user } = useAuth();

  const [, logout] = useLogoutMutation();

  const handleLogout = async () => {
    const res = await logout();
    if (res.error) {
      return console.log(res.error.graphQLErrors[0].message);
    }
    setUser(null);
  };

  return (
    <div className="flex items-center gap-4">
      <h3 className="text-gray-800">{user.username}</h3>
      <Menu>
        <MenuButton>
          <Avatar src={user.avatar || default_avatar} size="sm" />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link href={`/profile/${user.username}`}>
              <a className="w-full">Profile</a>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout} className="w-full text-left`">
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
