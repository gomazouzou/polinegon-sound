import { styled } from '@mui/material/styles';
import { Button} from "@mui/material";
import Figure02 from '../../images/figure_templete_02.png'


export const Figure02Button = styled(Button)({
  backgroundImage: `url(${Figure02})`,
  backgroundSize: 'cover',
  width: '80px', 
  height: '80px', 
  color: 'transparent', 
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
  },
});
