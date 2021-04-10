import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
  Theme,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  FormLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from '@material-ui/lab';

import FileUploadButton from '../../../components/FileUploadButton';
import { useSelector } from 'react-redux';
import Redirect from '../../../components/Redirect';

const Editor = dynamic(() => import('../../../components/Editor'), {
  ssr: false,
});

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    marginBottom: theme.spacing(2),
  },
  card: {
    // [theme.breakpoints.up('xs')]: {
    //   width: '100%',
    // },
    // [theme.breakpoints.up('sm')]: {
    //   width: '100%',
    // },
    // [theme.breakpoints.up('md')]: {
    //   width: '60%',
    // },
    // [theme.breakpoints.up('lg')]: {
    //   width: '40%',
    // },
    // [theme.breakpoints.up('xl')]: {
    //   width: '30%',
    // },
  },
  alert: {
    marginBottom: theme.spacing(1),
  },
  progress: {
    marginBottom: theme.spacing(2),
  },
}));

const EditPost = () => {
  const classes = useStyles();
  const router = useRouter();

  const authData = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(true);
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postVideoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('');
  const [availableForPublic, setAvailableForPublic] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [error, setError] = useState<any>({});

  const categoryList = [
    { name: 'সরকারি চাকরি', value: 'সরকারি চাকরি' },
    { name: 'বেসরকারি চাকরি', value: 'বেসরকারি চাকরি' },
    { name: 'পরীক্ষার সিলেবাস', value: 'পরীক্ষার সিলেবাস' },
    { name: 'রেজাল্ট', value: 'রেজাল্ট' },
    { name: 'নোটিশ', value: 'নোটিশ' },
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:4000/api/post/${router.query.id}`
        );
        setPostTitle(result.data.title);
        setVideoUrl(result.data.videoUrl);
        setPostDescription(result.data.description);
        setAvailableForPublic(!result.data.private);
        setCategory(result.data.category);
        setLoading(false);
        setThumbnail({ name: result.data.thumbnailImage });
        setImage1({ name: result.data.image1 });
        setImage2({ name: result.data.image2 });
        setImage3({ name: result.data.image3 });
        setImage4({ name: result.data.image4 });
      } catch (error) {
        router.push('/admin/posts');
        setLoading(false);
      }
    })();
  }, []);

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', postTitle);
      formData.append('description', postDescription);
      formData.append('videoUrl', postVideoUrl);
      formData.append('thumbnailImage', thumbnail);
      formData.append('category', category);
      formData.append('private', (!availableForPublic).toString());
      formData.append('image1', image1);
      formData.append('image2', image2);
      formData.append('image3', image3);
      formData.append('image4', image4);
      await axios.put(
        `http://localhost:4000/api/post/${router.query.id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setError({});
      router.push('/admin/posts');
    } catch (error) {
      if (error.response)
        setError({
          ...error.response.data.body,
        });
      setLoading(false);
    }
  };

  return authData.user
    ? authData.user && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Card variant="outlined" className={classes.card}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                align="center"
                color="textSecondary"
              >
                Update Post
              </Typography>
              <Divider className={classes.divider} />

              {loading && (
                <Box
                  display="flex"
                  justifyContent="center"
                  className={classes.progress}
                >
                  <CircularProgress />
                </Box>
              )}

              {Object.keys(error).map((err) => (
                <Alert severity="error" key={err} className={classes.alert}>
                  {error[err]}
                </Alert>
              ))}

              <form noValidate autoComplete="off" onSubmit={onSubmitHandler}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      value={postTitle}
                      fullWidth
                      label="Post Title"
                      type="text"
                      required
                      onChange={(e) => setPostTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <br />
                    <FormLabel component="legend">Post Description</FormLabel>
                    <Editor
                      setPostDescription={setPostDescription}
                      postDescription={postDescription}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={postVideoUrl}
                      fullWidth
                      label="Post Video URL"
                      type="text"
                      onChange={(e) => setVideoUrl(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FileUploadButton
                      fileId="thumbnail-image-upload"
                      image={thumbnail}
                      setImage={setThumbnail}
                      actionName="Thumbnail"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FileUploadButton
                      fileId="image1-upload"
                      image={image1}
                      setImage={setImage1}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FileUploadButton
                      fileId="image2-upload"
                      image={image2}
                      setImage={setImage2}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FileUploadButton
                      fileId="image3-upload"
                      image={image3}
                      setImage={setImage3}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FileUploadButton
                      fileId="image4-upload"
                      image={image4}
                      setImage={setImage4}
                    />
                  </Grid>
                  <Grid item xs={12} />
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" justifyContent="center">
                      <FormControl
                        variant="filled"
                        style={{ minWidth: 120 }}
                        required
                      >
                        <InputLabel>Category</InputLabel>
                        <Select
                          value={category}
                          onChange={(e: any) => setCategory(e.target.value)}
                        >
                          {categoryList.map((cat) => (
                            <MenuItem key={cat.name} value={cat.value}>
                              {cat.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" justifyContent="center">
                      <FormControlLabel
                        disabled={
                          authData.user && authData.user.role !== 'admin'
                        }
                        control={
                          <Checkbox
                            checked={availableForPublic}
                            onChange={(e) =>
                              setAvailableForPublic(e.target.checked)
                            }
                          />
                        }
                        label="Available for Public"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      type="submit"
                    >
                      Update Post
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      )
    : !loading && <Redirect to="/" />;
};

export default EditPost;
