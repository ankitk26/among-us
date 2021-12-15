import EditAvatar from "@/components/EditAvatar";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { getAvatar } from "@/lib/uploadImage";
import { useUpdateProfileMutation } from "@/src/generated/graphql";
import { Button } from "@chakra-ui/button";
import router from "next/router";
import { useEffect, useState } from "react";

export default function EditProfile() {
  const { user, setUser, authLoading } = useAuth();

  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [, updateProfile] = useUpdateProfileMutation();

  // If user is stored in context, populate the state
  useEffect(() => {
    if (user) {
      setBio(user.bio || "");
      setAvatarPreview(user.avatar);
    }
  }, [user]);

  // Redirect to login page if user is unauthenticated
  useEffect(() => {
    if (!user && !authLoading) {
      router.push("/login");
    }
  }, [user, authLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Final avatar is either user.avatar if no file is uploaded
      const finalAvatar = await getAvatar(
        avatarPreview,
        user.avatar,
        imageFile
      );
      const res = await updateProfile({ avatar: finalAvatar, bio });
      if (res.data.updateProfile) {
        setUser({
          ...res.data.updateProfile,
          avatar: res.data.updateProfile.avatar,
        });
      }
      setIsSubmitting(false);
      await router.push(`/profile/${user.username}`);
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Edit profile">
      <h1 className="text-3xl font-semibold text-gray-800">Edit profile</h1>
      {user && (
        <form className="mt-10" onSubmit={handleSubmit}>
          <EditAvatar
            avatarPreview={avatarPreview}
            setAvatarPreview={setAvatarPreview}
            setImageFile={setImageFile}
          />

          <div className="flex flex-col w-full gap-1 mt-12">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              className="form-control"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 mt-8">
            <Button type="submit" colorScheme="brand" isLoading={isSubmitting}>
              Update
            </Button>

            <Button onClick={() => router.push(`/profile/${user.username}`)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </Layout>
  );
}
