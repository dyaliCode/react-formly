import React, {
  FunctionComponent,
  useEffect,
  useState,
  memo,
  useRef,
  FormHTMLAttributes,
} from "react";
import {
  // isFieldDuplicated,
  type IField,
  type IForm,
  preprocess_and_validate_field,
  saveForm,
  // type IBtnSubmit,
  // type IBtnReset
} from "../utils";
import Field from "./Field";

type Props = {
  form_name: string;
  fields: IField[];
  get_values?: Function;
  onSubmit: Function;
  onReset?: Function;
};

const Formly: FunctionComponent<Props> = ({
  form_name,
  fields,
  get_values,
  onSubmit,
}) => {
  const elForm: any = useRef();
  const [forms, setForms] = useState<IForm[]>([]);
  const [currentForm, setCurrentForm] = useState<IForm>({
    form_name,
    fields: fields,
    values: {},
    valid: true,
  });
  const [_fields, _setFields] = useState<IField[]>(fields);
  const [_values, _setValues] = useState<any>({});

  useEffect(() => {
    async function init() {
      let values: any = currentForm.values ?? {};

      const fields_updated = await Promise.all(
        _fields.map(async (field: IField) => {
          values[`${field.name}`] = field.value ?? null;
          // Preprocess and validate field.
          field = await preprocess_and_validate_field(
            currentForm,
            field,
            values
          );
          return field;
        })
      );

      _setFields(fields_updated);

      // Find dirty in the current form.
      const dirty = fields_updated.find((field: IField) => {
        if (field.validation) {
          return field.validation.dirty === true;
        }
      });

      // Values.
      _setValues(values);

      // Form.
      const newForm = {
        ...currentForm,
        fields: fields_updated,
        values,
        valid: dirty ? false : true,
      };
      setCurrentForm(newForm);

      // Save forms.
      setForms(await saveForm(forms, newForm));

      // Dispatch values.
      get_values && get_values(_values);
    }

    init();
  }, [fields, form_name]);

  const onChange = async (data: any): Promise<void> => {
    let values = currentForm.values;

    const _fields = await Promise.all(
      currentForm.fields.map(async (field: IField) => {
        if (field.name === data.field_name) {
          values["touched"] = field.name;
          field.value = data.value;
          values[`${field.name}`] = data.value;
        }

        // Preprocess and validate field.
        field = await preprocess_and_validate_field(currentForm, field, values);

        return field;
      })
    );

    // Find dirty in the current form.
    const dirty = _fields.find((field: IField) => {
      if (field.validation) {
        return field.validation.dirty === true;
      }
    });

    // Values.
    _setValues(values);

    // Form.
    const newForm = {
      ...currentForm,
      fields: _fields,
      values: values,
      valid: dirty ? false : true,
    };
    setCurrentForm(newForm);

    // Save forms.
    setForms(await saveForm(forms, newForm));

    // Dispatch values.
    get_values && get_values(_values);
  };

  // Submit form.
  const onSubmitHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    onSubmit({ values: currentForm.values, valid: currentForm.valid });
  };

  // Reset form.
  const onReset = async (e: React.FormEvent): Promise<void> => {
    // e.preventDefault();
    elForm.current.reset();
    let values: any = {};
    let __fields: any = await Promise.all(
      currentForm.fields.map(async (field: IField) => {
        field.value = null;
        values[field.name] = null;
        field = await preprocess_and_validate_field(currentForm, field, values);
        return field;
      })
    );

    const _currentForm = { ...currentForm, fields: __fields, values };

    _setFields(__fields);

    setCurrentForm(_currentForm);

    // Save forms.
    setForms(await saveForm(forms, _currentForm));

    // Dispatch values.
    get_values && get_values(_values);
  };

  return (
    <>
      <form
        ref={elForm}
        className="max-w-screen-xl m-full p-4 flex flex-col space-y-2"
        onSubmit={onSubmitHandler}
        onReset={onReset}
      >
        {currentForm.fields.map((field) => {
          return (
            <Field
              key={field.name}
              form_name={form_name}
              field={field}
              changeValue={onChange}
            />
          );
        })}

        <button className="" type="submit">
          submit
        </button>
        <button className="" type="reset">
          reset
        </button>
      </form>
    </>
  );
};

export default memo(Formly);
