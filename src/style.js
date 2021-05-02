import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { colors } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0486FF",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: "#000",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export const useStyles = makeStyles((theme) => ({
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
  wholeContainer: {
    // Quick fix, but works
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
    color: "#fff",
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
  },
}));
