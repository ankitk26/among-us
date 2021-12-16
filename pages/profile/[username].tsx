import ErrorAlert from "@/components/ErrorAlert";
import Layout from "@/components/Layout";
import UserStats from "@/components/UserStats";
import UserTabs from "@/components/UserTabs";
import { default_avatar } from "@/constants/constants";
import { useAuth } from "@/context/AuthContext";
import { useProfileQuery } from "@/src/generated/graphql";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import Link from "next/link";
import { useRouter } from "next/router";

export default function UserProfile() {
  const router = useRouter();
  const username = router.query?.username as string;
  const { user } = useAuth();

  const [{ data, fetching, error }] = useProfileQuery({
    variables: { username },
  });

  const profile = data?.profile;

  return (
    <Layout title={fetching ? "Loading..." : `${profile?.username}'s profile`}>
      <h1 className="text-2xl font-semibold text-gray-700">User Profile</h1>

      {error && <ErrorAlert />}

      {fetching ? (
        <Skeleton />
      ) : (
        profile && (
          <section className="mt-12">
            <div className="flex items-start gap-14">
              {/* Avatar of user */}
              <Avatar src={profile.avatar || default_avatar} size="2xl" />
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-6">
                  {/* User's username */}
                  <h2 className="text-lg leading-8">{profile.username}</h2>

                  {/* Check if current profile is the logged-in user to be able to edit profile */}
                  {user?.id === profile.id && (
                    <Link href="/account/edit">
                      <a>
                        <Button colorScheme="brand" size="sm" variant="outline">
                          Edit profile
                        </Button>
                      </a>
                    </Link>
                  )}
                </div>

                {/* User's bio */}
                <p className="text-sm leading-6 text-gray-700">{profile.bio}</p>
              </div>
            </div>

            {/* User's stats */}
            <UserStats profile={profile} />

            {/* Displays all questions and answers posted by the user */}
            <UserTabs profile={profile} />
          </section>
        )
      )}
    </Layout>
  );
}

const Skeleton = () => {
  return (
    <div className="mt-12 skeleton-wrapper">
      <div className="grid grid-cols-7">
        <div className="w-40 h-40 col-span-1 bg-gray-200 rounded-full" />
        <div className="w-full col-span-5 ml-20">
          <div className="skeleton skeleton-subtitle" />
          <div className="mt-6">
            <div className="skeleton skeleton-body" />
            <div className="skeleton skeleton-body" />
            <div className="skeleton skeleton-body" />
          </div>
        </div>
      </div>
    </div>
  );
};
