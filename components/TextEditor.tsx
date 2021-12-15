import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <p className="mt-2 text-gray-500">Loading...</p>,
});

interface IProps {
  fieldValue?: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  fieldName: string;
}

export default function TextEditor({
  fieldValue = "",
  setFieldValue,
  fieldName,
}: IProps) {
  const [value, setValue] = useState(fieldValue);

  useEffect(() => {
    if (value) {
      setFieldValue(fieldName, value);
    }
  }, [value]);

  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  return (
    <div className="mt-1">
      <MDEditor value={value} preview="edit" onChange={setValue} />
    </div>
  );
}
