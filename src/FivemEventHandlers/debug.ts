import { debugData } from "../FivemHooks/debugData";

export const debug = () => {
  // First set the main visibility to true
  debugData(
    [
      {
        action: "",
        data: true,
      },
    ],
    100,
    true
  );
};
