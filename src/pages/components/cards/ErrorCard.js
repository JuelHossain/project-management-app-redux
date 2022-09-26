import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import CardHeader from "../Card/CardHeader";

export default function ErrorCard({ name }) {
  return (
    <div className="relative flex flex-col items-start p-4 mt-3  rounded-lg bg-white">
      <CardHeader name="error" />
      <CardBody text={`There was some error Loading this ${name}`} />
      <CardFooter date="not found" />
    </div>
  );
}
