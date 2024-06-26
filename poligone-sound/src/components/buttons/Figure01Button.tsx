import { styled } from '@mui/material/styles';
import { Button} from "@mui/material";
import Figure01 from '../../images/figure_templete_01.png'


export const Figure01Button = styled(Button)({
  backgroundImage: `url(${Figure01})`,
  backgroundSize: 'cover',
  width: '80px', 
  height: '80px', 
  color: 'transparent', 
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
  },
});
