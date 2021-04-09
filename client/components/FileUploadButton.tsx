import { Box, Typography, Button } from '@material-ui/core';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';

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
        >
          {actionName}
        </Button>
      </label>
    </Box>
  );
};

export default FileUploadButton;
