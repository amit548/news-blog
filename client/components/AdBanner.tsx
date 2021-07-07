import { useEffect } from 'react';

const AdBanner = ({ adSlot }: { adSlot: string }) => {
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
    display: 'block',
  };

  return (
    <ins
      className="adsbygoogle"
      style={styles}
      data-ad-client="ca-pub-3501803361714853"
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdBanner;
