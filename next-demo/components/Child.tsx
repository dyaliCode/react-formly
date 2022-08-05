import React, { FunctionComponent } from "react";

type IProps = {
  title: string;
};

const Child: FunctionComponent<IProps> = ({ title }: IProps) => {
  return <div>{title}</div>;
};

export default Child;
