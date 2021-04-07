import dyanic from 'next/dynamic';
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
import { FormEvent, useState } from 'react';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import axios from 'axios';
import { Alert } from '@material-ui/lab';

const Editor = dyanic(() => import('../../components/Editor'), {
  ssr: false,
});

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    marginBottom: theme.spacing(2),
  },
  card: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '40%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '30%',
    },
  },
  alert: {
    marginBottom: theme.spacing(1),
  },
  progress: {
    marginBottom: theme.spacing(2),
  },
}));

const CreatePost = () => {
  const classes = useStyles();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
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
      await axios.post('http://localhost:4000/api/post', formData, {
        withCredentials: true,
      });
      setLoading(false);
      setError({});
      router.push('/admin/posts');
    } catch (error) {
      console.error(error.response);

      setLoading(false);
      if (error.response)
        setError({
          ...error.response.data.body,
        });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            align="center"
            color="textSecondary"
          >
            Create New Post
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
                  postDescription={postDescription}
                  setPostDescription={setPostDescription}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Post Video URL"
                  type="text"
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{ marginTop: 10 }}
                >
                  {thumbnail && (
                    <Typography
                      noWrap
                      component="span"
                      style={{ marginRight: 20 }}
                    >
                      {thumbnail.name}
                    </Typography>
                  )}

                  <input
                    accept="image/*"
                    id="contained-button-thumbnail-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => setThumbnail(e.target.files[0])}
                  />
                  <label htmlFor="contained-button-thumbnail-file">
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      startIcon={<AddAPhotoOutlinedIcon />}
                    >
                      Thumbnail
                    </Button>
                  </label>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{ marginTop: 10 }}
                >
                  {image1 && (
                    <Typography
                      noWrap
                      component="span"
                      style={{ marginRight: 20 }}
                    >
                      {image1.name}
                    </Typography>
                  )}
                  <input
                    accept="image/*"
                    id="contained-button-image1-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => setImage1(e.target.files[0])}
                  />
                  <label htmlFor="contained-button-image1-file">
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      startIcon={<AddAPhotoOutlinedIcon />}
                    >
                      Image
                    </Button>
                  </label>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{ marginTop: 10 }}
                >
                  {image2 && (
                    <Typography
                      noWrap
                      component="span"
                      style={{ marginRight: 20 }}
                    >
                      {image2.name}
                    </Typography>
                  )}
                  <input
                    accept="image/*"
                    id="contained-button-image2-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => setImage2(e.target.files[0])}
                  />
                  <label htmlFor="contained-button-image2-file">
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      startIcon={<AddAPhotoOutlinedIcon />}
                    >
                      Image
                    </Button>
                  </label>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{ marginTop: 10 }}
                >
                  {image3 && (
                    <Typography
                      noWrap
                      component="span"
                      style={{ marginRight: 20 }}
                    >
                      {image3.name}
                    </Typography>
                  )}
                  <input
                    accept="image/*"
                    id="contained-button-image3-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => setImage3(e.target.files[0])}
                  />
                  <label htmlFor="contained-button-image3-file">
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      startIcon={<AddAPhotoOutlinedIcon />}
                    >
                      Image
                    </Button>
                  </label>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{ marginTop: 10 }}
                >
                  {image4 && (
                    <Typography
                      noWrap
                      component="span"
                      style={{ marginRight: 20 }}
                    >
                      {image4.name}
                    </Typography>
                  )}
                  <input
                    accept="image/*"
                    id="contained-button-image4-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => setImage4(e.target.files[0])}
                  />
                  <label htmlFor="contained-button-image4-file">
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      startIcon={<AddAPhotoOutlinedIcon />}
                    >
                      Image
                    </Button>
                  </label>
                </Box>
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
                  Create New Post
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreatePost;
