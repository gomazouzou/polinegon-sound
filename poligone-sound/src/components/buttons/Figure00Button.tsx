import { styled } from '@mui/material/styles';
import { Button} from "@mui/material";
import Figure00 from '../../images/figure_templete_00.png'


export const Figure00Button = styled(Button)({
  backgroundImage: `url(${Figure00})`,
  backgroundSize: 'cover',
  width: '80px', 
  height: '80px', 
  color: 'transparent', 
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
  },
});
