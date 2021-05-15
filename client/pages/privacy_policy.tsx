import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const PrivacyPolicy = () => {
  const title =
    'Privacy Policy | কর্মের খোঁজ | আমাদের সতর্কতা আর আপনাদের চেষ্টা, সঙ্গে থাকুন';
  const description =
    'At kormer khoj, accessible from www.kormerkhoj.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by kormer khoj and how we use it.';

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description.substring(0, 159).concat('...')}
        />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={description.substring(0, 159).concat('...')}
        />
        <meta property="twitter:title" content={title} />
        <meta
          property="twitter:description"
          content={description.substring(0, 159).concat('...')}
        />
        <meta
          name="keywords"
          content="সরকারি চাকরি, বেসরকারি চাকরি, পার্ট টাইম জব, পরীক্ষার প্রস্তুতি, নোটিশ"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <Typography variant="h5" gutterBottom>
        Privacy Policy for kormer khoj
      </Typography>
      <Typography variant="body1" gutterBottom>
        At kormer khoj, accessible from www.kormerkhoj.com, one of our main
        priorities is the privacy of our visitors. This Privacy Policy document
        contains types of information that is collected and recorded by kormer
        khoj and how we use it.
      </Typography>
      <Typography variant="body1" gutterBottom>
        If you have additional questions or require more information about our
        Privacy Policy, do not hesitate to Contact through email at{' '}
        <Link href="mailto:kormerkhoj@gmail.com">
          <strong>kormerkhoj@gmail.com</strong>
        </Link>
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        Log Files
      </Typography>
      <Typography variant="body1" gutterBottom>
        kormer khoj follows a standard procedure of using log files. These files
        log visitors when they visit websites. All hosting companies do this and
        a part of hosting services' analytics. The information collected by log
        files include internet protocol (IP) addresses, browser type, Internet
        Service Provider (ISP), date and time stamp, referring/exit pages, and
        possibly the number of clicks. These are not linked to any information
        that is personally identifiable. The purpose of the information is for
        analyzing trends, administering the site, tracking users' movement on
        the website, and gathering demographic information.
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        Cookies and Web Beacons
      </Typography>
      <Typography variant="body1" gutterBottom>
        Like any other website, kormer khoj uses 'cookies'. These cookies are
        used to store information including visitors' preferences, and the pages
        on the website that the visitor accessed or visited. The information is
        used to optimize the users' experience by customizing our web page
        content based on visitors' browser type and/or other information.
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        Google DoubleClick DART Cookie
      </Typography>
      <Typography variant="body1" gutterBottom>
        Google is one of a third-party vendor on our site. It also uses cookies,
        known as DART cookies, to serve ads to our site visitors based upon
        their visit to www.website.com and other sites on the internet. However,
        visitors may choose to decline the use of DART cookies by visiting the
        Google ad and content network Privacy Policy at the following URL –{' '}
        <Link href="https://policies.google.com/technologies/ads">
          <strong> https://policies.google.com/technologies/ads</strong>
        </Link>
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        Privacy Policies
      </Typography>
      <Typography variant="body1" gutterBottom>
        You may consult this list to find the Privacy Policy for each of the
        advertising partners of kormer khoj. Our Privacy Policy was created with
        the help of the{' '}
        <Link href="https://webbeast.in">
          <strong>GDPR Privacy Policy Generator</strong>
        </Link>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Third-party ad servers or ad networks uses technologies like cookies,
        JavaScript, or Web Beacons that are used in their respective
        advertisements and links that appear on kormer khoj, which are sent
        directly to users' browser. They automatically receive your IP address
        when this occurs. These technologies are used to measure the
        effectiveness of their advertising campaigns and/or to personalize the
        advertising content that you see on websites that you visit.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Note that kormer khoj has no access to or control over these cookies
        that are used by third-party advertisers.
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        Third Pary Privacy Policies
      </Typography>
      <Typography variant="body1" gutterBottom>
        kormer khoj's Privacy Policy does not apply to other advertisers or
        websites. Thus, we are advising you to consult the respective Privacy
        Policies of these third-party ad servers for more detailed information.
        It may include their practices and instructions about how to opt-out of
        certain options. You may find a complete list of these Privacy Policies
        and their links here: Privacy Policy Links.
      </Typography>
      <Typography variant="body1" gutterBottom>
        You can choose to disable cookies through your individual browser
        options. To know more detailed information about cookie management with
        specific web browsers, it can be found at the browsers' respective
        websites. What Are Cookies?
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        Children's Information
      </Typography>
      <Typography variant="body1" gutterBottom>
        Another part of our priority is adding protection for children while
        using the internet. We encourage parents and guardians to observe,
        participate in, and/or monitor and guide their online activity.
      </Typography>
      <Typography variant="body1" gutterBottom>
        kormer khoj does not knowingly collect any Personal Identifiable
        Information from children under the age of 13. If you think that your
        child provided this kind of information on our website, we strongly
        encourage you to Contact immediately and we will do our best efforts to
        promptly remove such information from our records.
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        Online Privacy Policy Only
      </Typography>
      <Typography variant="body1" gutterBottom>
        This Privacy Policy applies only to our online activities and is valid
        for visitors to our website with regards to the information that they
        shared and/or collect in kormer khoj. This policy is not applicable to
        any information collected offline or via channels other than this
        website.
      </Typography>
      <br />
      <Typography variant="h5" gutterBottom>
        Consent
      </Typography>
      <Typography variant="body1" gutterBottom>
        By using our website, you hereby consent to our Privacy Policy and agree
        to its Terms and Conditions.
      </Typography>
    </div>
  );
};

export default PrivacyPolicy;
