import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const AboutUs = () => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" gutterBottom>
        যদি আপনি একজন চাকরি ও কাজের সমন্ধী হয়ে থাকেন তাহলে একদম সঠিক Website-এ
        এসেছেন,{' '}
        <Link href="www.kormerkhoj.com">
          <strong>www.kormerkhoj.com</strong>
        </Link>{' '}
        আমাদের লক্ষ্য আপনাকে সঠিক তথ্য দেওয়া, প্রতারণার হাত থেকে সাবধান করা আর
        আপনাদের লক্ষ্য পূরণ করা | আমাদের সতর্কতা আর আপনাদের চেষ্টা, সঙ্গে থাকুন{' '}
      </Typography>
      <Typography variant="body1" gutterBottom>
        If you have any query regrading Site, Advertisement and any other issue,
        please feel free to contact at{' '}
        <Link href="mailto:kormerkhoj@gmail.com">
          <strong>kormerkhoj@gmail.com</strong>
        </Link>
      </Typography>
    </div>
  );
};

export default AboutUs;
