import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
    formControl: {
      
        height:'10%', 
        justifyContent:'space-between',
        flexDirection: 'column',
        
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width:'80%',
        alignSelf:'center'
    },
}));

export default useStyles