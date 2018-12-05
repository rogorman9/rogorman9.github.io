import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button, List, ListItem } from '@material-ui/core'
import FileReaderInput from 'react-file-reader-input'
import fileDownload from 'js-file-download'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  center: {
    width: '60%',
    margin: '0 auto',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
})

class UploadForm extends React.Component {
  handleChange = (e, results) => {
    results.forEach(result => {
      const [e, file] = result
      const reader = new FileReader()
      reader.onload = async e => {
        const res = await axios({
          url: 'https://zjwizf5n37.execute-api.us-east-1.amazonaws.com/default/parseResults',
          method: 'post',
          data: JSON.parse(e.target.result),
        })
        fileDownload(res.data.body, 'results.csv')
      }
      reader.readAsText(file)
    })
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.center}>
        <h1>Results Parser Thingy</h1>
        <List>
          <ListItem>
            Go to&nbsp;
            <a href="http://findadoctor.virginiapremier.com">findadoctor.virginiapremier.com</a>
          </ListItem>
          <ListItem>Open Chrome Developer Tools (press F12)</ListItem>
          <ListItem>Open the "Network" tab</ListItem>
          <ListItem>Back on the page, fill out the form as normal and click "Search" </ListItem>
          <ListItem>
            Once the results appear, find "lookphpJson.php" in the Network tab and click it
          </ListItem>
          <ListItem>Click on "Response"</ListItem>
          <ListItem>
            Select everything that's there and copy it into a blank Notepad docuent and save it as a
            .txt file
          </ListItem>
          <ListItem>
            <form>
              <label htmlFor="my-file-input">Upload that file here:</label>
              <FileReaderInput
                as="binary"
                id="my-file-input"
                onChange={this.handleChange}
                style={{ display: 'inline' }}
              >
                <Button variant="contained" className={classes.button}>
                  Upload
                </Button>
              </FileReaderInput>
            </form>
          </ListItem>
        </List>
      </div>
    )
  }
}

UploadForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UploadForm)
