import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

const style = theme => ({
  nested: {
    // paddingLeft: theme.spacing.unit * 2,
    color: 'white'
  },
  listItem: {
    display: 'block'
  }
})

const CompareToolToggle = ({
  classes,
  t,
  toggleCompareTool,
  selectedCount,
  compareTool
}) => (
  <List className={classes.nested}>
    <ListItem
      className={classes.listItem}
      button
      onClick={() => toggleCompareTool()}
    >
      <ListItemText primary={`${t('compareToolToggle')}(${selectedCount})`} />
      <ListItemSecondaryAction>
        {compareTool ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </ListItemSecondaryAction>
    </ListItem>
  </List>
)

CompareToolToggle.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  compareTool: PropTypes.bool.isRequired,
  selectedCount: PropTypes.number.isRequired,
  toggleCompareTool: PropTypes.func.isRequired
}

const mapStatetoProps = ({ blockProducers: { compareTool, selected } }) => ({
  compareTool,
  selectedCount: selected.length
})

const mapDispatchToProps = ({ blockProducers: { toggleCompareTool } }) => ({
  toggleCompareTool
})

export default withStyles(style)(
  withNamespaces('translations')(
    connect(
      mapStatetoProps,
      mapDispatchToProps
    )(CompareToolToggle)
  )
)
