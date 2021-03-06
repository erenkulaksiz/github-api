import React from 'react';
import ReactDOM from 'react-dom';
import { Container, 
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
  colors,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCodeBranch, faCalendar, faPencilAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './index.css';

//
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0486FF"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: colors.red.A400
    },
    background: {
      default: "#000"
    }
  },
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
   }
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    fontFamily: "Roboto",
    //border: "solid 1px #C4C4C4", OPTIONAL
    borderRadius: "6px",
    marginTop: "24px",
    marginBottom: "24px",
    paddingBottom: "12px",
  },
  wholeContainer: { // Quick fix, but works
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  containerTitle: {
    display: "flex",
    fontWeight: "600",
    fontSize: "30px",
    marginTop: "18px",
  },
  containerDesc: {
    display: "flex",
    fontSize: "18px",
    marginTop: "12px",
    marginBottom: "12px",
  },
  containerInput: {
    display: "flex",
    marginTop: "12px",
  },
  containerInput__field: {
    marginRight: "8px",
  },
  containerInput__button: {
    width: "148px",
    height: "40px",
  },
  form: {
    display: "flex",
    width: "100%",
    marginBottom: "12px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  userDataContainer: {
    display: "flex",
    marginBottom: "12px",
    marginTop: "12px",
  },
  userDataHeader: {
    display: "flex",
    width: "100%",
  },
  userDataHeaderTitle: {
    display: "flex",
    alignItems: "center",
    marginLeft: "18px",
    fontWeight: "450",
    fontSize: "20px",
  },
  userDataAvatar: {
    width: "80px",
    height: "80px",
  },
  userDataFollowers: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: "50%",
  },
  userDataChip: {
    marginLeft: "8px",
  },
  userDataDetails: {
    marginTop: "12px",
  },
  userDataDetailsBioTitle: {
    color: "gray",
    fontWeight: "400",
    fontSize: "20px",
  },
  userDataBio: {
    marginTop: "6px",
    marginBottom: "12px",
  },
  userChips: {
    display: "flex",
    //marginTop: "12px",
    marginBottom: "12px",
  },
  userDetailsChip: {
    marginRight: "8px",
  },
  userDataRepos: {
    //marginTop: "12px",
  },
  repoTitle: {
    color: "gray",
    fontWeight: "400",
    fontSize: "20px",
    //marginTop: "12px",
    marginBottom: "12px",
  },
  divider: {
    marginBottom: "12px",
  },
  repoPaper: {
    padding: "12px",
    marginBottom: "8px",
  },
  repoPaperHeader: {
    display: "flex",
    flexDirection: "column",
  },
  repoPaperHeaderTitle: {
    display: "flex",
    fontSize: "22px",
  },
  repoPaperDate: {
    display: "flex",
    flexDirection: "row",
    fontSize: "14px",
    color: "gray",
    marginTop: "6px",
  },
  repoPaperDateItself: {
    marginLeft: "4px",
  },
  repoPaperDetails: {
    display: "flex",
  },
  repoPaperDesc: {
    fontSize: "16px",
    marginTop: "6px",
  },
  repoPaperLeft: {
    display: "flex",
    flex: "50%",
  },
  repoPaperRight: {
    display: "flex",
    flex: "70%",
    justifyContent: "flex-end",
  },
  repoChip: {
    marginLeft: "6px",
    width: "52px", 
  },
  repoChipBranch: {
    marginLeft: "6px",
    width: "78px", 
  },
  golden: {
    color: "#CEA200",
    textDecoration: "none!important",
  }
}));

const App = () => {
  const classes = useStyles();
  
  const [username, setUsername] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [isFetched, setFetched] = React.useState(false);
  const [userData, setUserData] = React.useState({
    name: null,
    avatarurl: null,
    following: null,
    followers: null,
    location: null,
    public_repos: null,
    bio: null,
    created_at: null,
    company: null,
    email: null,
  });
  const [errors, setError] = React.useState({
    msg: '',
    status: false,
  });
  const [allRepos, setAllRepos] = React.useState([]);
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value); 
  }
  
  const handleDialogClose = () => {
    setError({...errors, status: false});
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let gotData = false;
    
    // Input null diye mi kontrol et
    
    if(username == null || username.length == 0 || username == ""){
      setError({...errors, msg: "Please enter a valid GitHub username.", status: true}); 
      setLoading(false);
      setFetched(false);
      return;
    }else{
      setLoading(true);
    }
    
    try {
      await axios.get(`https://api.github.com/users/${username}`)
        .then(response => {
          console.log(response);
          setUserData({ ...userData,
            name: response.data.name ? response.data.name : username,
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
          });
          gotData = true;
        })
        .catch(err => {
          if (err.response.status === 404) {
            throw new Error('user-not-found');
          }else if (err.response.status === 403) {
            throw new Error('rate-limit');
          }
          throw err;
        });
    } catch (err) {
      let error = err;
      if(error.message == 'user-not-found'){
        setLoading(false);
        setFetched(false);
        setError({...errors, msg: "Cannot found a user with name "+username, status: true});
      }else if(error.message == 'rate-limit'){
        setLoading(false);
        setFetched(false);
        setError({...errors, msg: "You exceeded GitHub API's rate limit!", status: true});
      }
    }
    
    if(gotData){
      try { 
        await axios.get(`https://api.github.com/users/${username}/repos`)
          .then(response => { 
            setAllRepos(response.data);
            setLoading(false);
            setFetched(true);
            //console.log(allRepos);
          })
          .catch(err => {
          if (err.response.status === 404) {
            throw new Error('404');
          }
          throw err;
        })
      } catch (err) {
        console.log(err);
        setError({...errors, msg: "Cannot fetch repo data!", status: true});
        setLoading(false);
        setFetched(false);
      }
    }
  }
  
  let convertToDate = (date) => {
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
          {loading ? <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop> : ""}

          <Dialog
            open={errors.status}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {errors.msg}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary" autoFocus>
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
              onChange={e => handleUsernameChange(e)}
              error={errors.status}
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
        {isFetched ? <> 
          <div className={classes.userDataContainer}>
            <div className={classes.userDataHeader}>
              <div className={classes.userDataHeaderAvatar}>
                <Avatar alt={userData.name} src={userData.avatarurl ? userData.avatarurl : ""} className={classes.userDataAvatar} />
              </div>
              <div className={classes.userDataHeaderTitle}>
                <Link href={userData.html_url} target="_blank" color="inherit" style={{ textDecoration: 'none' }}>
                  {userData.login == "erenkulaksiz" ?  <div className={classes.golden}>{userData.name}</div> : userData.name}
                </Link>
              </div>
              <div className={classes.userDataFollowers}>
                <Chip className={classes.userDataChip}
                  label={"Followers: "+userData.followers}
                  color="primary"
                />
                <Chip className={classes.userDataChip}
                  label={"Following: "+userData.following}
                  color="primary"
                />
                <Chip className={classes.userDataChip}
                  label={"Repos: "+userData.public_repos}
                  color="primary"
                />
              </div>
            </div>
          </div>
          <Divider />
          <div className={classes.userDataDetails}>

            { 
              userData.bio ? <>
              <div className={classes.userDataDetailsBioTitle}>
                Bio
              </div>

              <div className={classes.userDataBio}>
                {userData.bio}
              </div></> : ""
            }

            {userData.location || userData.email || userData.company ? 
              <>
                <div className={classes.userChips}>
                  {userData.location ? <Chip className={classes.userDetailsChip} label={"Location: "+userData.location}/> : ""}

                  {userData.email ? <Chip className={classes.userDetailsChip} label={"Email: "+userData.email}/> : ""}

                  {userData.company ? <Chip className={classes.userDetailsChip} label={"Company: "+userData.company}/> : ""}
                </div>
              </> : ""}


              <div className={classes.userDataRepos}>
                {userData.location || userData.email || userData.company || userData.bio ? <>
                <Divider className={classes.divider}/>
                </> : ""}

                <div className={classes.repoTitle}>
                  Repos
                </div>

                <div className={classes.userRepos}>

                  {console.log(allRepos)}

                  { allRepos.length != 0 ? allRepos.map(function(repo, index){
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

ReactDOM.render(
    <App />,
    document.querySelector('root')
);

