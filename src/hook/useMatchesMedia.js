import { useCallback, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

const useMatchesMedia = (mediaQuery) => {
  const [breakpointsMatches, setBreakpointsMatches] = useState('');
  // useMediaQuery
  const theme = useTheme();
  const guardandoLaMediaQuery = useMediaQuery(theme.breakpoints.down(mediaQuery));
  // setBreakpointsMatches(guardandoLaMediaQuery);

  useCallback(
    () => {
      setBreakpointsMatches(guardandoLaMediaQuery);
    },
    [guardandoLaMediaQuery],
  );
  return { breakpointsMatches };
};

export default useMatchesMedia;