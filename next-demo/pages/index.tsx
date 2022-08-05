import type { NextPage } from "next";
import { useState } from "react";
import { Formly, type IField } from "react-formly-light";

const classField =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const classButton =
  "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto md:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

const Home: NextPage = () => {
  // * Declare form.
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
        classes: [classField],
      },
      prefix: {
        tag: "div",
        classes: ["mb-6"],
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
        classes: [classField],
      },
      prefix: {
        tag: "div",
        classes: ["mb-6"],
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
        classes: [classField],
      },
      prefix: {
        tag: "div",
        classes: ["mb-6"],
      },
      rules: [{ name: "onTapMessage", fnc: onTapMessage }],
      messages: {
        onTapMessage: "Should tap 'hey i am reactjs'",
      },
    },
  ];

  // * Hooks.
  const [fields] = useState<IField[]>(_fields);
  const [data, setData] = useState<any>({});

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

  // *
  const onSubmit = (data: any) => {
    console.log("onSubmit", data);
  };

  // *
  const onChange = (data_form: any) => {
    setData(data_form);
  };

  return (
    <div className="w-1/2 mx-auto mt-10">
      <Formly
        fields={fields}
        form_name={form_name}
        onSubmit={onSubmit}
        onChange={onChange}
        btnSubmit={{
          // text: "Send",
          classes: classButton,
          prefix: {
            tag: "div",
            // classes: ["mt-6"],
          },
        }}
        btnReset={{
          // text: "Cancel",
          classes: classButton,
          prefix: {
            tag: "div",
            // classes: ["mt-6"],
          },
        }}
        buttonsAction={{
          tag: "div",
          classes: ["flex flex-row gap-2"],
        }}
      />
      <hr className="my-10" />
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Home;
