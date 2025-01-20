import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

export function Alert({ children }: { children: ReactNode }) {
  return (
    <p className="alert">
      <FontAwesomeIcon icon={faCircleCheck} style={{ paddingRight: ".5rem" }} />
      {children}
    </p>
  );
}
