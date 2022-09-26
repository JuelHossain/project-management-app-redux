import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import CardHeader from "../Card/CardHeader";
import Loading from "../Loading";

export default function LoadingCard({ color }) {
  return (
    <div className="relative flex flex-col items-start p-4 mt-3  rounded-lg bg-white">
      <Loading visible={true} />
      <CardHeader name="loading" color={color} />
      <CardBody text="getting title" />
      <CardFooter date="getting date" />
    </div>
  );
}
