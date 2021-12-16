import { Alert, AlertIcon } from "@chakra-ui/react";

export default function ErrorAlert() {
  return (
    <Alert status="error">
      <AlertIcon />
      Some error occured... Please try again
    </Alert>
  );
}
