import type { NextPage } from "next";
import Formly from "@/lib/components/Formly";
import { IField } from "@/lib/utils/types";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const form_name = "starting";
  const _fields: IField[] = [
    {
      type: "file", // required
      name: "name_file", // require
      attributes: {
        id: "id-field", // optional
        classes: ["form-control"], // optional
        label: "Image", // optional
      },
      extra: {
        multiple: true, // optional
        showPreview: true, // optional
      },
      rules: ["file"],
      file: {
        extensions: ["jpg", "gif", "png"],
        maxSize: 5,
      },
    },
  ];

  const [fields, setFields] = useState<IField[]>(_fields);
  const [values, setValues] = useState<any>(null);

  const onGetValues = async (data: any) => {
    setValues(data);
  };

  const onSubmit = async (data: any) => {
    console.log("onSubmit", data.values);
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
      <pre>
        <code>{JSON.stringify(fields, null, 2)}</code>
      </pre>
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
