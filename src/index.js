import React from 'react';
import ReactDOM from 'react-dom';
import {
  Container,
  Button,
  CircularProgress,
  Backdrop,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Link,
  Avatar,
  Chip,
  Divider,
  Paper,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCodeBranch, faCalendar, faPencilAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './index.css';
import { useStyles } from './style.js';
import { createStore } from 'redux';
import reducer from './reducer.js';

const store = createStore(reducer);

const App = () => {
  const classes = useStyles();

  const states = store.getState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let gotData = false;

    if (states.username == null || states.username.length == 0 || states.username == "") {
      store.dispatch({ type: 'SET_ERROR', payload: { msg: "Please enter a valid GitHub username.", status: true } });
      store.dispatch({ type: 'SET_STATUS', payload: { loading: false, isFetched: false } });
      return;
    } else {
      store.dispatch({ type: 'SET_STATUS', payload: { loading: true } });
    }

    try {
      await axios.get(`https://api.github.com/users/${states.username}`)
        .then(response => {
          console.log(response);

          store.dispatch({
            type: 'SET_USERDATA',
            payload: {
              name: response.data.name ? response.data.name : states.username,
              avatarurl: response.data.avatar_url,
              following: response.data.following,
              followers: response.data.followers,
              location: response.data.location,
              public_repos: response.data.public_repos,
              bio: response.data.bio,
              created_at: response.data.created_at,
              company: response.data.company,
              email: response.data.email,
              login: response.data.login,
            }
          });

          gotData = true;
        })
        .catch(err => {
          if (err.response.status === 404) {
            throw new Error('user-not-found');
          } else if (err.response.status === 403) {
            throw new Error('rate-limit');
          }
          throw err;
        });
    } catch (err) {
      let error = err;
      if (error.message == 'user-not-found') {
        store.dispatch({ type: 'SET_STATUS', payload: { loading: false, isFetched: false } });
        store.dispatch({ type: 'SET_ERROR', payload: { msg: "Cannot found a user with name " + states.username, status: true } });
      } else if (error.message == 'rate-limit') {
        store.dispatch({ type: 'SET_STATUS', payload: { loading: false, isFetched: false } });
        store.dispatch({ type: 'SET_ERROR', payload: { msg: "You exceeded GitHub API's rate limit!", status: true } });
      }
    }

    if (gotData) {
      try {
        await axios.get(`https://api.github.com/users/${states.username}/repos`)
          .then(response => {
            store.dispatch({ type: 'SET_REPOS', payload: response.data });
            store.dispatch({ type: 'SET_STATUS', payload: { loading: false, isFetched: true } });
          })
          .catch(err => {
            if (err.response.status === 404) {
              throw new Error('404');
            }
            throw err;
          })
      } catch (err) {
        console.log(err);
        store.dispatch({ type: 'SET_ERROR', payload: { msg: "Cannot fetch repo data!", status: true } });
        store.dispatch({ type: 'SET_STATUS', payload: { loading: false, isFetched: false } });
      }
    }
  }

  const convertToDate = (date) => {
    let returnDate = new Date(date);
    returnDate = ("00" + (returnDate.getMonth() + 1)).slice(-2) + "/" +
      ("00" + returnDate.getDate()).slice(-2) + "/" +
      returnDate.getFullYear() + " " +
      ("00" + returnDate.getHours()).slice(-2) + ":" +
      ("00" + returnDate.getMinutes()).slice(-2) + ":" +
      ("00" + returnDate.getSeconds()).slice(-2);
    return returnDate;
  }

  return (
    <div className={classes.wholeContainer}>
      <Container className={classes.container} fixed>
        <Backdrop className={classes.backdrop} open={states.status.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Dialog
          open={states.errors.status}
          onClose={() => { store.dispatch({ type: 'SET_ERROR', payload: { status: false } }) }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {states.errors.msg}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { store.dispatch({ type: 'SET_ERROR', payload: { status: false } }) }} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>

        <div className={classes.containerTitle}>
          Search for GitHub users
        </div>
        <div className={classes.containerDesc}>
          Enter a GitHub user's username and reach his data with this API!
        </div>
        <Divider />
        <div className={classes.containerInput}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Enter a username..."
              className={classes.containerInput__field}
              variant="outlined"
              size="small"
              fullWidth
              onChange={e => { store.dispatch({ type: 'SET_USERNAME', payload: e.target.value }); }}
              error={states.errors.status}
              placeholder="erenkulaksiz"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.containerInput__button}
              endIcon={<FontAwesomeIcon icon={faSearch} />}>
              Search
            </Button>
          </form>
        </div>
        {states.status.isFetched ? <>
          <div className={classes.userDataContainer}>
            <div className={classes.userDataHeader}>
              <div className={classes.userDataHeaderAvatar}>
                <Avatar alt={states.userData.name} src={states.userData.avatarurl ? states.userData.avatarurl : ""} className={classes.userDataAvatar} />
              </div>
              <div className={classes.userDataHeaderTitle}>
                <Link href={states.userData.html_url} target="_blank" color="inherit" style={{ textDecoration: 'none' }}>
                  {states.userData.login == "erenkulaksiz" ? <div className={classes.golden}>{states.userData.name}</div> : states.userData.name}
                </Link>
              </div>
              <div className={classes.userDataFollowers}>
                <Chip className={classes.userDataChip}
                  label={"Followers: " + states.userData.followers}
                  color="primary"
                />
                <Chip className={classes.userDataChip}
                  label={"Following: " + states.userData.following}
                  color="primary"
                />
                <Chip className={classes.userDataChip}
                  label={"Repos: " + states.userData.public_repos}
                  color="primary"
                />
              </div>
            </div>
          </div>
          <Divider />
          <div className={classes.userDataDetails}>

            {
              states.userData.bio ? <>
                <div className={classes.userDataDetailsBioTitle}>
                  Bio
              </div>

                <div className={classes.userDataBio}>
                  {states.userData.bio}
                </div></> : ""
            }

            {states.userData.location || states.userData.email || states.userData.company ?
              <>
                <div className={classes.userChips}>
                  {states.userData.location ? <Chip className={classes.userDetailsChip} label={"Location: " + states.userData.location} /> : ""}

                  {states.userData.email ? <Chip className={classes.userDetailsChip} label={"Email: " + states.userData.email} /> : ""}

                  {states.userData.company ? <Chip className={classes.userDetailsChip} label={"Company: " + states.userData.company} /> : ""}
                </div>
              </> : ""}


            <div className={classes.userDataRepos}>
              {states.userData.location || states.userData.email || states.userData.company || states.userData.bio ? <>
                <Divider className={classes.divider} />
              </> : ""}

              <div className={classes.repoTitle}>
                Repos
                </div>

              <div className={classes.userRepos}>
                {states.allRepos.length != 0 ? states.allRepos.map(function (repo, index) {
                  return <>
                    <Paper key={index} elevation={0} variant="outlined" className={classes.repoPaper}>
                      <div className={classes.repoPaperHeader}>
                        <div className={classes.repoPaperHeaderTitle}>
                          <div className={classes.repoPaperLeft}>
                            <Link href={repo.html_url} target="_blank">
                              {repo.name}
                            </Link>
                          </div>
                          <div className={classes.repoPaperRight}>

                            {repo.stargazers_count != 0 ? <Chip 
                                  label={repo.stargazers_count}
                                  icon=<FontAwesomeIcon icon={faStar} />
                                  className={classes.repoChip}
                                  size="small"
                                /> : ""}

                                {repo.forks_count != 0 ? <Chip 
                                  label={repo.forks_count}
                                  icon=<FontAwesomeIcon icon={faCodeBranch} />
                                  className={classes.repoChip}
                                  size="small"
                                /> : ""}

                                {<Chip 
                                  label={repo.default_branch}
                                  icon=<FontAwesomeIcon icon={faCodeBranch} />
                                  className={classes.repoChipBranch}
                                  size="small"
                                />}

                              </div>

                        </div>
                        <div className={classes.repoPaperDate}>
                          <FontAwesomeIcon icon={faCalendar} /><div className={classes.repoPaperDateItself}>{convertToDate(repo.created_at)}</div>

                          <FontAwesomeIcon icon={faPencilAlt} className={classes.repoPaperDateItself} /><div className={classes.repoPaperDateItself}>{convertToDate(repo.updated_at)}</div>
                        </div>

                      </div>

                      {repo.description ? <div className={classes.repoPaperDesc}>
                        {repo.description}
                      </div> : ""}

                    </Paper>
                  </>;
                }) : "No repos found."}
              </div>

            </div>

          </div>
        </> : ""}
      </Container>
    </div>
  );
}

const render = () => ReactDOM.render(
  <App />,
  document.querySelector('root')
)

render()
store.subscribe(render)

if (module.hot) {
  module.hot.accept();
}