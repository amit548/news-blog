import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const DMCA = () => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        DMCA
      </Typography>
      <Typography variant="body1" gutterBottom>
        If we Have added some content that belong to you or your organization by
        mistake, We are sorry for that. We apologize for that and assure you
        that this wont be repeated in future. If you are rightful owner of the
        content used in our Website, Please mail us with your Name, Organization
        Name, Contact Details, Copyright infringing URL and Copyright Proof (URL
        or Legal Document) at{' '}
        <Link href="mailto:kormerkhoj@gmail.com">
          <strong>kormerkhoj@gmail.com</strong>
        </Link>
      </Typography>
      <Typography variant="body1" gutterBottom>
        I assure you that, I will remove the infringing content Within 48 Hours.
      </Typography>
    </div>
  );
};

export default DMCA;
