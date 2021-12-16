import { getTime } from "@/utils/getTime";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

interface IProps {
  timestamp: string;
}

export default function EditedPostPopover({ timestamp }: IProps) {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <button>• Edited</button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>Edited on {getTime(timestamp)}</PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
