import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { Formly, IField } from "my-lib";

function App() {
  // Fetch Users
  const fetchUsers = async () => {
    const res = await fetch(
      "https://jsonplaceholder.cypress.io/users?_limit=10"
    );
    const data = await res.json();
    return data.map((item: any) => ({ value: item.id, title: item.name }));
  };

  // Fetch posts
  const fetchPosts = async () => {
    const res = await fetch(
      "https://jsonplaceholder.cypress.io/posts?_limit=10"
    );
    const data = await res.json();
    return data.map((item: any) => ({ value: item.id, title: item.title }));
  };

  const [loading, setLaoding] = useState<boolean>(false);

  const form_name = "formly_fetch_data";
  const _fields: IField[] = [
    {
      type: "input", // required
      name: "firstname", // required
      attributes: {
        type: "text",
        id: "firstname", // required
        classes: ["form-control"],
        placeholder: "Tap your first name",
      },
      rules: ["required", "min:3", "max:10"],
      messages: {
        required: "The firstname is required",
        min: "Your firstname is too short min=3",
        max: "Your firstname is too long max=10",
      },
      prefix: {
        tag: "div",
      },
    },
    {
      type: "input", // required
      name: "password", // required
      attributes: {
        type: "password",
        id: "password", // required
        classes: ["form-control"],
        placeholder: "Tap your password",
        autocomplete: "off",
      },
      rules: ["required", "min:6", "max:10"],
      messages: {
        required: "The password is required",
        min: "Your password is too short min=6",
        max: "Your password is too long max=10",
      },
      prefix: {
        tag: "div",
      },
    },
  ];

  const [fields, setFields] = useState(_fields);
  const [count, setCount] = useState(0);

  let data = {};
  const onSubmit = (data: any) => {
    console.log("data", data);
  };
  const onChange = (data: any) => {
    console.log("onChange", data);
  };

  const onUpdateFields = () => {
    const __fields = fields.map((field: IField) => {
      field.value = field.value ?? " updated";
      return field;
    });
    setFields(__fields);
  };

  return (
    <>
      {loading ? "Loading..." : "Done"}
      <Formly
        fields={fields}
        form_name={form_name}
        onSubmit={onSubmit}
        onChange={onChange}
        classes={
          "p-10 bg-blue-300 max-w-screen-xl m-full p-4 flex flex-col space-y-2"
        }
        btnSubmit={{
          text: "Send",
        }}
        btnReset={{
          text: "Cancel",
        }}
      />
    </>
  );
}

export default App;
