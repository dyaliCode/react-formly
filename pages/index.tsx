import type { NextPage } from "next";
import Formly from "@/lib/components/Formly";
import { IField } from "@/lib/utils/types";
import { useEffect, useState } from "react";

// Fetch items
const fetchItems = async (category_id: any) => {
  console.log("typeof category_id", typeof category_id);
  const url = `https://jsonplaceholder.cypress.io/${
    category_id === "1" ? "users" : "posts"
  }?_limit=10`;

  const res = await fetch(url);
  const data = await res.json();

  if (category_id === "1") {
    return data.map((item: any) => ({ value: item.id, title: item.name }));
  } else {
    return data.map((item: any) => ({ value: item.id, title: item.title }));
  }
};

const Home: NextPage = () => {
  const _fields: IField[] = [
    {
      type: "select",
      name: "category",
      attributes: {
        id: "category",
        label: "Category",
      },
      rules: ["required"],
      extra: {
        options: [
          {
            value: null,
            title: "None",
          },
          {
            value: 1,
            title: "Users",
          },
          {
            value: 2,
            title: "Posts",
          },
        ],
      },
    },
    {
      type: "select",
      name: "items",
      attributes: {
        id: "items",
        label: "Items",
      },
      extra: {},
      preprocess: async (field: IField, fields: IField[], values: any) => {
        console.log("values", values);
        if (values.touched === "category") {
          setLoading(true);
          field.extra.options = await fetchItems(values.category);
          setLoading(false);
        }
        return field;
      },
    },
  ];

  const [fields, setFields] = useState<IField[]>(_fields);
  const [values, setValues] = useState<any>(null);

  const onGetValues = async (data: any) => {
    setValues(data);
  };

  const onSubmit = async (data: any) => {
    console.log("onSubmit", data);
  };

  const form_name = "starting";

  async function confirmed(): Promise<boolean> {
    if (values) {
      if (values.username != values.password) {
        return false;
      }
      return true;
    }
    return false;
  }

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setFields(_fields);
  }, []);

  return (
    <div className="max-w-screen-xl m-auto p-4 flex flex-col space-y-2 ">
      <p>fetch: {loading ? "loading" : "done!"}</p>
      {fields && (
        <Formly
          fields={fields}
          form_name={form_name}
          onSubmit={onSubmit}
          get_values={onGetValues}
        />
      )}
    </div>
  );
};

export default Home;
