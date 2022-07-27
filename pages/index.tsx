import type { NextPage } from "next";
import Formly from "@/lib/components/Formly";
import { IField } from "@/lib/utils/types";
import { useState } from "react";

const Home: NextPage = () => {
  const [values, setValues] = useState<any>(null);

  const onGetValues = async (data: any) => {
    setValues(data);
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

  const fields: IField[] = [
    {
      type: "input",
      name: "username",
      value: "kamalkech",
      attributes: {
        id: "username",
        label: "Username",
        classes: ["py-3", "px-4", "rounded-lg", "border-gray-300", "border-2"],
      },
      rules: ["required"],
    },
    {
      type: "input",
      name: "password",
      value: "password",
      attributes: {
        type: "password",
        id: "password",
        label: "Password",
        classes: ["py-3", "px-4", "rounded-lg", "border-gray-300", "border-2"],
      },
      rules: ["required", { name: "confirmed", fnc: confirmed }],
    },
  ];

  return (
    <div className="max-w-screen-xl m-auto p-4 flex flex-col space-y-2 ">
      <Formly fields={fields} form_name={form_name} get_values={onGetValues} />
    </div>
  );
};

export default Home;
