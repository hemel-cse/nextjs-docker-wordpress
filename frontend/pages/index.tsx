import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import Layout from '../src/components/Layout';
import { UPDATE_USER_INFO } from '../src/redux/actions/types';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundImage: `url(https://source.unsplash.com/collection/4773283)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '100%',
      height: '100vh',
      backgroundPosition: 'center',
      backgroundColor: theme.palette.common.black
    },
  },
  root: {
    width: '100%',
    height: '100vh'
  },
}));


export const Index = () => {
  const classes = useStyles({});
  return (
    <Layout>
      <Grid container className={classes.root}>
      </Grid>
    </Layout>
  );
}
Index.getInitialProps = ({ req, store }) => {
  if (req.user) {
    store.dispatch({
      type: UPDATE_USER_INFO,
      payload: req.user,
    });
    console.log('Saving user: ', req.user);
  }
  return {};
}
export default Index;
