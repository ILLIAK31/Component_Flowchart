import './App.css'
import EmpFlowchart from './EmpFlowchart'

// Images 
import topLeft from './assets/Img1.png';
import topRight from './assets/Img_B2B.png';
import bottomLeft from './assets/Img2.png';
import bottomRight from './assets/Img3.png';
import bottomCenter from './assets/Img_ERP2.png';
import center from './assets/Img_Emp.png';

export default function App() {
  return (
    <EmpFlowchart
      images={{
        topLeft: topLeft,
        topRight: topRight,
        bottomLeft: bottomLeft,
        bottomRight: bottomRight,
        bottomCenter: bottomCenter,
        center: center,
        number1 : 6,
        number2 : 3,
        number3 : 30,
        number4 : 2
      }}
    />
  )
}