import { Field } from "formik";

interface IProps {
  id: string;
  name: string;
  type?: string;
  touched?: boolean;
  error?: string;
  placeholder?: string;
}

export default function FormFontrol({
  id,
  name,
  type = "text",
  touched,
  error,
  placeholder,
}: IProps) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor={id} className="capitalize">
        {name}
      </label>

      <Field
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`form-control ${
          touched && error ? "border-red-600 text-red-600" : ""
        }`}
      />

      {/* Show any error related to the particular field */}
      {touched && error && (
        <span className="text-xs text-red-600">{error}</span>
      )}
    </div>
  );
}
