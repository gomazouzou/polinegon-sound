import { styled } from '@mui/material/styles';
import { Button} from "@mui/material";
import Figure03 from '../../images/figure_templete_03.png'


export const Figure03Button = styled(Button)({
  backgroundImage: `url(${Figure03})`,
  backgroundSize: 'cover',
  width: '80px', 
  height: '80px', 
  color: 'transparent', 
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
  },
});
