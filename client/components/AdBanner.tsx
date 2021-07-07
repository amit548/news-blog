import { useEffect } from 'react';

const AdBanner = ({
  adClient,
  adSlot,
}: {
  adClient: string;
  adSlot: string;
}) => {
  useEffect(() => {
    if (process.browser) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const styles = {
    display: 'inline-block',
    overflow: 'hidden',
  };

  return (
    <ins
      className="adsbygoogle"
      style={styles}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
    />
  );
};

export default AdBanner;
