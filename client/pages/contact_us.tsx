import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const ContactUs = () => {
  return (
    <div>
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
