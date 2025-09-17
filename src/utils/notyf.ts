import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default new Notyf({
  duration: 3000,
  position: {
    x: 'left',
    y: 'bottom',
  },
  types: [
    {
      type: 'success',
      background: '#4CAF50',
      icon: false
    },
    {
      type: 'error',
      background: '#F44336',
      icon: false
    }
  ]
})