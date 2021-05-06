import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const ContactUs = () => {
  return (
    <div>
      <Head>
        <title>
          Contact Us | কর্মের খোঁজ | আমাদের সতর্কতা আর আপনাদের চেষ্টা, সঙ্গে
          থাকুন
        </title>
        <meta
          name="description"
          content="If you have any query regrading Site, Advertisement and any other issue, please feel free to contact at kormerkhoj@gmail.com"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1">
        If you have any query regrading Site, Advertisement and any other issue,
        please feel free to contact at{' '}
        <Link href="mailto:kormerkhoj@gmail.com">
          <strong>kormerkhoj@gmail.com</strong>
        </Link>
      </Typography>
    </div>
  );
};

export default ContactUs;
