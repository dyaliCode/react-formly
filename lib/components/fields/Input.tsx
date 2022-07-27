import React, {
  FormEventHandler,
  FunctionComponent,
  memo,
  useEffect,
  useState,
} from "react";

import { isRequired, IPropsField } from "../../utils";

const Input: FunctionComponent<IPropsField> = ({
  form_name,
  field,
  changeValue,
}: IPropsField) => {
  const [value, setValue] = useState(field.value ?? "");

  const onInput: FormEventHandler<HTMLInputElement> = async (
    event: any
  ): Promise<void> => {
    const value: any =
      field.attributes.type === "number"
        ? parseInt(event.currentTarget.value)
        : event.currentTarget.value;

    console.log("value", value);

    const data = {
      form_name,
      field_name: field.name,
      value,
    };

    setValue(value);

    changeValue(data);
  };

  useEffect(() => {
    console.log("5555", field);
    setValue(field.value ?? "");
  }, [field.value]);

  return (
    <>
      <pre>
        <code>{JSON.stringify(value, null, 2)}</code>
      </pre>
      <input
        type={field.attributes.type ? field.attributes.type : "text"}
        name={field.name}
        value={value}
        id={field.attributes.id ? field.attributes.id : field.name}
        className={
          field.attributes.classes ? field.attributes.classes.join(" ") : ""
        }
        placeholder={field.attributes.placeholder}
        required={isRequired(field)}
        disabled={field.attributes.disabled}
        readOnly={field.attributes.readonly}
        min={field.attributes.min}
        max={field.attributes.max}
        step={field.attributes.step}
        autoComplete={field.attributes.autocomplete}
        onChange={onInput}
      />
    </>
  );
};

export default Input;
