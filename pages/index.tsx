import type { NextPage } from "next";
import Formly from "@/lib/components/Formly";
import { IField } from "@/lib/utils/types";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const form_name = "starting";
  const _fields: IField[] = [
    {
      type: "checkbox",
      name: "check1",
      attributes: {
        id: "check1",
        label: "Checkbox Default:",
        classes: ["checker"],
      },
      extra: {
        items: [
          {
            name: "item1",
            value: "value1",
            title: "Value 1",
          },
          {
            name: "item2",
            value: "value2",
            title: "Value 2",
          },
        ],
      },
      prefix: {
        tag: "tag",
        classes: ["form-group"],
      },
    },
    {
      type: "checkbox",
      name: "check2",
      attributes: {
        id: "check2",
        label: "Checkbox Inline:",
        classes: ["checker"],
      },
      extra: {
        aligne: "inline",
        items: [
          {
            name: "item1",
            value: "value1",
            title: "Value 1",
          },
          {
            name: "item2",
            value: "value2",
            title: "Value 2",
          },
        ],
      },
      prefix: {
        tag: "div",
        classes: ["form-group"],
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

  useEffect(() => {
    setFields(_fields);
  }, []);

  return (
    <div className="max-w-screen-xl m-auto p-4 flex flex-col space-y-2 ">
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
