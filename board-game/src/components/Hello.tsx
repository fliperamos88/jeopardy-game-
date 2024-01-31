type HelloProps = {
  name: string;
};

export const Hello = ({ name }: HelloProps) => {
  return <div>Hello {name}</div>;
};
