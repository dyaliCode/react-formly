import type { NextPage } from "next";
import { Formly, type IField } from "react-formly-light";

const Home: NextPage = () => {
  const form_name = "formly_fetch_data";
  const _fields: IField[] = [
    {
      type: "input",
      name: "firstname",
      attributes: {
        id: "firstname",
        placeholder: "Firstname",
        autocomplete: "off",
        autocorrect: "off",
      },
      prefix: {
        tag: "div",
        classes: ["form-group"],
      },
      rules: ["required", "min:3", "max:10"],
      messages: {
        required: "Firstname is required",
        min: "Firstname must be at least 3 characters",
        max: "Firstname must be less than 10 characters",
      },
    },
    {
      type: "input",
      name: "lastname",
      attributes: {
        id: "lastname",
        placeholder: "Lastname",
        autocomplete: "off",
        autocorrect: "off",
      },
      prefix: {
        tag: "div",
        classes: ["form-group"],
      },
      rules: [
        "required",
        "min:3",
        "max:10",
        { name: "notEqual", fnc: notEqual },
      ],
      messages: {
        required: "lastname is required",
        min: "lastname must be at least 3 characters",
        max: "lastname must be less than 10 characters",
        notEqual: "lastname must not be equal firstname",
      },
    },
    {
      type: "input",
      name: "message",
      attributes: {
        id: "message",
        placeholder: "message",
        autocomplete: "off",
        autocorrect: "off",
      },
      prefix: {
        tag: "div",
        classes: ["form-group"],
      },
      rules: [{ name: "onTapMessage", fnc: onTapMessage }],
      messages: {
        onTapMessage: "Should tap 'hey i am reactjs'",
      },
    },
  ];

  // * custom rules
  async function notEqual(values: any): Promise<boolean> {
    if (values) {
      if (values.firstname === values.lastname) {
        return false;
      }
    }
    return true;
  }

  // *
  async function onTapMessage(values: any): Promise<boolean> {
    if (values) {
      if (values.message === "hey i am reactjs") {
        return true;
      }
    }
    return false;
  }

  const onSubmit = (data: any) => {
    console.log("onSubmit", data);
  };

  const onChange = (data: any) => {
    console.log("onChange", data);
  };

  return (
    <>
      <Formly
        fields={_fields}
        form_name={form_name}
        onSubmit={onSubmit}
        onChange={onChange}
        btnSubmit={{
          text: "Send",
          // classes: "btn btn-primary",
          prefix: {
            tag: "div",
            classes: ["button-submit"],
          },
        }}
        btnReset={{
          text: "Cancel",
          // classes: "btn-danger",
          prefix: {
            tag: "div",
            classes: ["button-cancel"],
          },
        }}
        buttonsAction={{
          tag: "div",
          classes: ["button-action"],
        }}
      />
    </>
  );
};

export default Home;
