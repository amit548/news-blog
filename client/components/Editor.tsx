import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

const RichTextEditor = ({ setPostDescription, postDescription }) => {
  const onChange = (e: any) => {
    setPostDescription(e.target.getContent());
  };

  const [initialValue] = useState(postDescription);

  return (
    <>
      <Editor
        apiKey="1dnh24ildzal9f0jbzadjx4ly1ow3bbxwhtmwy444iwm68th"
        initialValue={initialValue}
        init={{
          branding: false,
          plugins: ['link', 'image'],
        }}
        onChange={onChange}
      />
    </>
  );
};

export default RichTextEditor;
