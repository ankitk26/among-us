import useOnlyTitle from "@/hooks/useOnlyTitle";
import { Button } from "@chakra-ui/button";
import { HomeIcon, LightBulbIcon, PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";
import SideBarItem from "./SideBarItem";

export default function LeftSideBar() {
  const onlyTitle = useOnlyTitle();

  return (
    <aside className={`col-span-3 ${onlyTitle ? "invisible" : "block"}`}>
      <h4 className="pl-6 font-medium text-gray-600">MENU</h4>

      <div className="flex flex-col gap-1 mt-5">
        <SideBarItem path="/" text="Home">
          <HomeIcon className="w-4 h-4" />
        </SideBarItem>

        <SideBarItem path="/topics" text="Explore Topics">
          <LightBulbIcon className="w-4 h-4" />
        </SideBarItem>
      </div>

      <Link href="/post-question">
        <a>
          <Button
            mt={12}
            w="full"
            colorScheme="brand"
            type="button"
            leftIcon={<PlusIcon className="w-4 h-4" />}
          >
            Post a question
          </Button>
        </a>
      </Link>
    </aside>
  );
}
