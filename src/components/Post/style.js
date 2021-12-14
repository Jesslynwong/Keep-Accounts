import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    paper: {
      padding: theme.spacing(2),
      height:80,
      color: theme.palette.text.secondary,
    },
    
    subContain:{
      display:'flex',
      justifyContent:'space-between'
    },
  
  }
  ));

  export default useStyles