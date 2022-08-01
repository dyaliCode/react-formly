import type { NextPage } from "next";
import Formly from "@/lib/components/Formly";
import { IField } from "@/lib/utils/types";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const form_name = "starting";
  const _fields: IField[] = [
    {
      type: "autocomplete", // required
      name: "name-field-autocomplete", // required
      attributes: {
        id: "id-field-autocomplete", // required
        placeholder: "Tap item to select", // optional
        autocomplete: "off", // optional
      },
      extra: {
        filter_lenght: 3, // optional and by default = 0
        loadItemes: [
          // required
          // list items with id and title attributes.
          {
            value: 1,
            title: "item 1",
          },
          {
            value: 2,
            title: "item 2",
          },
          {
            value: 3,
            title: "item 3",
          },
          {
            value: 4,
            title: "item 4",
          },
        ],
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

  const onSwitch = async () => {
    const __fields: IField[] = fields;
    __fields[0].value = __fields[0].value === 1 ? 2 : 1;
    setFields([...__fields]);
  };

  useEffect(() => {
    setFields(_fields);
  }, []);

  return (
    <div className="container max-w-screen-xl m-auto p-4 flex flex-col space-y-2 ">
      <button onClick={onSwitch}>switch</button>
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
