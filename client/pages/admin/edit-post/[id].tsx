import { useRouter } from 'next/router';
import { FormEvent, useState, useEffect, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import Alert from '@material-ui/lab/Alert';

import FileUploadButton from '../../../components/FileUploadButton';
import Redirect from '../../../components/Redirect';
import { AuthContext } from '../../../context/AuthContext';
import Editor from '../../../components/Editor';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    marginBottom: theme.spacing(2),
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

  const { user } = useContext(AuthContext);

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
    { name: 'পরীক্ষার প্রস্তুতি', value: 'পরীক্ষার প্রস্তুতি' },
    { name: 'নোটিশ', value: 'নোটিশ' },
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await axios.get(`/api/post/${router.query.id}`);
        setPostTitle(result.data.title);
        setVideoUrl(result.data.videoUrl);
        setPostDescription(result.data.description);
        setAvailableForPublic(!result.data.private);
        setCategory(result.data.category);
        setThumbnail({ name: result.data.thumbnailImage });
        setImage1({ name: result.data.image1 });
        setImage2({ name: result.data.image2 });
        setImage3({ name: result.data.image3 });
        setImage4({ name: result.data.image4 });
        setLoading(false);
      } catch (error) {
        router.push('/admin/posts');
        setLoading(false);
      }
    })();
  }, [router.query.id]);

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
      await axios.put(`/api/post/${router.query.id}`, formData, {
        withCredentials: true,
      });
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

  return user
    ? user && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Card variant="outlined">
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
                      postId={router.query.id}
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
                        disabled={user && user.role !== 'admin'}
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
