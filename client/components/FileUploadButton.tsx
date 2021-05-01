import axios from 'axios';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import DeleteForeverOutlined from '@material-ui/icons/DeleteForeverOutlined';

const FileUploadButton = ({
  image,
  setImage,
  actionName = 'Image',
  fileId,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: 10 }}
    >
      {image && (
        <Typography noWrap component="span" style={{ marginRight: 20 }}>
          {image.name}
        </Typography>
      )}
      <input
        accept="image/*"
        id={fileId}
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => setImage(e.target.files[0])}
      />
      <label htmlFor={fileId}>
        <Button
          variant="outlined"
          color="primary"
          component="span"
          startIcon={<AddAPhotoOutlinedIcon />}
          style={{ marginRight: 16 }}
        >
          {actionName}
        </Button>
        {fileId !== 'thumbnail-image-upload' && (
          <IconButton
            onClick={async () => {
              setImage(null);
              try {
                await axios.delete(
                  `/api/post/del/${image.name}`,
                  { withCredentials: true }
                );
              } catch (_) {}
            }}
          >
            <DeleteForeverOutlined color="error" />
          </IconButton>
        )}
      </label>
    </Box>
  );
};

export default FileUploadButton;
