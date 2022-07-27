import React, {
  FormEventHandler,
  Fragment,
  FunctionComponent,
  memo,
  useEffect,
  useState,
} from "react";
import { isRequired, IPropsField } from "../../utils";

const Checkbox: FunctionComponent<IPropsField> = ({
  form_name,
  field,
  changeValue,
}: IPropsField) => {
  // const { setValues } = valueStore;

  useEffect(() => {
    // if (field.extra.items.length > 0) {
    //   let _values: any = [];
    //   field.extra.items.map((item: any) => {
    //     if (item.checked) {
    //       _values = [..._values, item.value];
    //     }
    //     return item;
    //   });
    //   dispatchValues(form_name, field.name, _values, changeValue);
    // }
  }, [field.extra.items]);

  const onInput: FormEventHandler<HTMLInputElement> = async (
    event: React.FormEvent<HTMLInputElement>
  ): Promise<void> => {
    let _values: any[] = [];
    const item_val = event.currentTarget.value;
    console.log("item_val", item_val);

    // setValues(
    //   (value: any) => value.form_name === form_name,
    //   produce((value: any) => {
    //     let val_field = value.values[field.name] ?? [];
    //     if (event.target.checked) {
    //       val_field = [...val_field, item_val];
    //     } else {
    //       val_field = val_field.filter((val: any) => {
    //         if (val !== item_val) {
    //           return val;
    //         }
    //       });
    //     }

    //     _values = val_field;
    //     return value;
    //   })
    // );

    // setValue(_value);

    // const data = {
    //   form_name,
    //   field_name: field.name,
    //   value: _value,
    // };

    // changeValue(data);
  };

  return (
    <div
      className={
        field.extra.aligne === "inline" ? "form-check-inline" : "form-check"
      }
    >
      {field.extra.items &&
        field.extra.items.map((item: any) => (
          <Fragment key={item.title}>
            <input
              type={field.type}
              id={field.attributes.id ? field.attributes.id : field.name}
              className={
                field.attributes.classes
                  ? field.attributes.classes.join(" ")
                  : ""
              }
              value={item.value}
              name={item.name}
              checked={item.value ? item.checked : false}
              onInput={onInput}
            />
            <span>{item.title}</span>
          </Fragment>
        ))}
    </div>
  );
};

export default Checkbox;
