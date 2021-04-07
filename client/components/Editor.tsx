import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Editor = ({ setPostDescription, postDescription }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={postDescription}
      config={{
        toolbar: [
          'heading',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          'outdent',
          'indent',
          'blockQuote',
          'insertTable',
          'undo',
          'redo',
        ],
      }}
      onChange={(_: any, editor: any) => {
        const data = editor.getData();
        setPostDescription(data);
      }}
    />
  );
};

export default Editor;
