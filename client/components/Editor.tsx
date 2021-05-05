import { makeStyles, Theme } from '@material-ui/core';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  editor: {
    marginTop: theme.spacing(1),
  },
}));

const RichTextEditor = ({
  setPostDescription,
  postId,
}: {
  setPostDescription: any;
  postId?: any;
}) => {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState('');
  const classes = useStyles();

  useEffect(() => {
    if (postId && postId.trim() !== '') {
      (async () => {
        setLoading(true);
        try {
          const result = await axios.get(`/api/post/${postId}`);
          setPostData(result.data.description);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [postId]);

  const onChange = (e: any) => {
    setPostDescription(e.target.getContent());
  };

  return (
    !loading && (
      <div className={classes.editor}>
        <Editor
          apiKey="1dnh24ildzal9f0jbzadjx4ly1ow3bbxwhtmwy444iwm68th"
          initialValue={postData}
          init={{
            branding: false,
            plugins: ['link', 'image'],
          }}
          onChange={onChange}
        />
      </div>
    )
  );
};

export default RichTextEditor;
