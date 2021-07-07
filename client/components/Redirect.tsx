import { useEffect } from 'react';

const Redirect = ({ to }) => {
  useEffect(() => {
    (() => {
      if (process.browser) {
        window.location.href = to;
      }
    })();
  }, [to]);

  return null;
};

export default Redirect;
