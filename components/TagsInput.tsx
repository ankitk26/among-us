import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag";
import { FormikErrors, FormikTouched } from "formik";
import { useEffect, useState } from "react";

interface IProps {
  value: string[] | any[];
  setValue: (field: string, value: any, shouldValidate?: boolean) => void;
  touched?: boolean | FormikTouched<any>[];
  error: string | string[] | FormikErrors<any>[];
}

export default function TagsInput({ value, setValue, error, touched }: IProps) {
  const [tags, setTags] = useState<string[]>(value);
  const [currentTag, setCurrentTag] = useState("");

  useEffect(() => {
    setTags(value);
  }, [value]);

  const handleTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (
      e.key === "Enter" &&
      currentTag !== "" &&
      !tags.find((tag) => tag === currentTag)
    ) {
      setTags((prev) => [...prev, currentTag]);
      setCurrentTag("");
    }
  };

  const checkDeleteTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && currentTag === "") {
      setCurrentTag(tags[tags.length - 1]);
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const deleteTag = (key: string) => {
    setTags((prev) => [...prev.filter((tag) => tag !== key)]);
  };

  useEffect(() => {
    setValue("tags", tags);
  }, [tags]);

  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor="tags">Tags</label>
      <div
        className={`p-2 flex items-center gap-3 text-sm border rounded focus:outline-none focus:border-primary ${
          touched && error ? "border-red-600" : ""
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          {tags.map((tag) => (
            <Tag size="sm" key={tag}>
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => deleteTag(tag)} />
            </Tag>
          ))}
        </div>
        <input
          type="text"
          id="tags"
          value={currentTag}
          className="flex-grow focus:outline-none"
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyUp={handleTag}
          onKeyDown={checkDeleteTag}
          placeholder="Add tag (only 8 allowed)"
        />
      </div>
      {touched && error && (
        <span className="text-xs text-red-600">{error}</span>
      )}
    </div>
  );
}
