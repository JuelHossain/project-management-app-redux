import React from "react";

const CardBody = ({
  text = "This is the title of the card for the thing that needs to be done.",
}) => {
  return <h4 className="mt-3 text-sm font-medium">{text}</h4>;
};

export default CardBody;
