import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FileReaderInput from 'react-file-reader-input'
import fileDownload from 'js-file-download'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class UploadForm extends React.Component {
  handleChange = (e, results) => {
    results.forEach(result => {
      const [e, file] = result
      const reader = new FileReader()
      reader.onload = async (e) => {
        const res = await axios({
          url: 'https://zjwizf5n37.execute-api.us-east-1.amazonaws.com/default/parseResults',
          method: 'post',
          data: JSON.parse(e.target.result),
        })
        fileDownload(res.data.body, 'results.csv')
      }
      reader.readAsText(file)
    });
  }
  render() { 
    const { classes } = this.props
    return (
      <form>
        <label htmlFor="my-file-input">Upload Search Results here:</label>
        <FileReaderInput as="binary" id="my-file-input"
                         onChange={this.handleChange}>
          <Button variant="contained" className={classes.button}>
            Upload
          </Button>
        </FileReaderInput>
      </form>
    );
  }
}

UploadForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadForm);
