interface Props {
  buttonText: string;
  onClick: () => void;
}

export const Button = ({ buttonText, onClick }: Props) => {
  return <button onClick={onClick}>{buttonText}</button>;
};
