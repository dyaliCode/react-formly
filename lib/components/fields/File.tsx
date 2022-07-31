import React, {
  FormEventHandler,
  FunctionComponent,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";

import { isRequired, IPropsField } from "../../utils";

const FieldFile: FunctionComponent<IPropsField> = ({
  form_name,
  field,
  changeValue,
}: IPropsField) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [isMultiple] = useState<boolean>(field.extra.multiple ?? false);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {}, [field.value]);

  const onInput: FormEventHandler<HTMLInputElement> = async (
    event: React.FormEvent<HTMLInputElement>
  ): Promise<void> => {
    const _files = (event.target as HTMLInputElement).files || [];
    setFiles([...files, ...Array.from(_files)]);
    console.log("files", files);
    if (files.length > 0) {
      const data = {
        form_name,
        field_name: field.name,
        value: files,
      };

      changeValue(data);
    }
  };

  const deleteFile = (e: any, file: File) => {
    e.preventDefault();
    let newValue: any;
    const _files: File[] = files.filter((i) => i.name != file.name);
    if (files.length === 0) {
      if (inputFile && inputFile.current) {
        inputFile.current.value = "";
      }
      newValue = null;
    } else {
      newValue = _files;
    }

    setFiles(newValue);

    const data = {
      form_name,
      field_name: field.name,
      value: newValue,
    };

    changeValue(data);
  };

  return (
    <>
      <pre>
        <code>{JSON.stringify(files, null, 2)}</code>
      </pre>
      <input
        type="file"
        name={field.name}
        id={field.attributes.id}
        className={
          field.attributes.classes ? field.attributes.classes.join(" ") : ""
        }
        multiple={isMultiple}
        onChange={onInput}
        ref={inputFile}
      />
      {files.length > 0 && field.extra.showPreview
        ? files.map((file: File, indx: number) => (
            <div key={indx} className="file">
              <div className="img">
                <img src={window.URL.createObjectURL(file)} alt={file.name} />
              </div>
              <div className="infos">
                <ul>
                  <li>Name: {file.name}</li>
                  <li>Size: {file.size}</li>
                  <li>Type: {file.type}</li>
                  <li>
                    <button
                      type="button"
                      onClick={(e) => deleteFile(e, file)}
                      className="btn"
                    >
                      Remove
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ))
        : ""}
    </>
  );
};

export default memo(FieldFile);
