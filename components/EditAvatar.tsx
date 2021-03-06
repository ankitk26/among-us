import { default_avatar } from "@/constants/constants";
import { useAuth } from "@/context/AuthContext";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { XIcon } from "@heroicons/react/solid";
import { ChangeEvent, useEffect, useState } from "react";
import { Avatar } from "@chakra-ui/avatar";

interface IProps {
  avatarPreview: string;
  setAvatarPreview: React.Dispatch<React.SetStateAction<string>>;
  setImageFile: React.Dispatch<any>;
}

export default function EditAvatar({
  avatarPreview,
  setAvatarPreview,
  setImageFile,
}: IProps) {
  const { user } = useAuth();

  // is true when user chooses to enter URL for avatar
  const [enterURL, setEnterURL] = useState(false);

  // The URL wanted for avatar
  const [imageURL, setImageURL] = useState("");

  // Handles image upload from desktop
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    // console.log("chosen");
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  // If URL is entered, then return the URL itself without uploading to cloudinary
  useEffect(() => {
    if (enterURL && imageURL) {
      setAvatarPreview(imageURL);
    }
  }, [enterURL, imageURL]);

  // Clears all the input image and resets to the previous avatar
  const resetAvatar = () => {
    setAvatarPreview(user?.avatar);
    setEnterURL(false);
    setImageURL("");
    setImageFile(null);
  };

  // Sets avatar to default avatar provided
  const setDefaultAvatar = () => {
    setAvatarPreview(default_avatar);
    setImageFile(null);
  };

  return (
    <div className="flex items-center gap-8">
      <Avatar src={avatarPreview || default_avatar} size="2xl" />
      <div className="w-full">
        <h2 className="text-xl leading-8">{user.username}</h2>

        {/* Menu to choose from different options to set avatar */}
        <div className="flex items-center gap-8">
          <Menu>
            <MenuButton type="button" className="text-primary">
              Change profile photo
            </MenuButton>
            <MenuList>
              <MenuItem>
                <label htmlFor="file" className="cursor-pointer">
                  Upload image
                </label>
              </MenuItem>
              <MenuItem onClick={() => setEnterURL(true)}>Add URL</MenuItem>
              <MenuItem onClick={setDefaultAvatar}>Reset to default</MenuItem>
            </MenuList>
          </Menu>

          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleFile}
          />

          {/* Button to reset the avatar */}
          {avatarPreview !== user.avatar && (
            <button className="flex items-center gap-1" onClick={resetAvatar}>
              <span className="text-xs">Cancel</span>
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Show URL text input only if URL option is chosen from the menu */}
        {enterURL && (
          <input
            type="text"
            value={imageURL}
            className="mt-4 form-control"
            onChange={(e) => setImageURL(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
