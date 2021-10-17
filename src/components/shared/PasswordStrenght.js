import React from 'react';


const PasswordStrength = ({ password }) => {
  
const testResult = ()=>{
    let complexity=0;
    const regex1=/\d/;
    var pattern = new RegExp(
        "^(?=.*[-+_!@#$%^&*.,?]).+$"
      );
    if(password.toLowerCase()!==password && 
    password.toUpperCase()!==password){
        complexity+=1;
    }
    if(regex1.test(password)){
        complexity+=1;
    }
    
    if(pattern.test(password)){
        complexity+=1;
    }
    if(password.length > 7){
        complexity+=1;
    }

        return complexity;
   
    
  }

  const createPassLabel = () => {
    switch(testResult()) {
      case 0:
        return 'Very weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fear';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'as';
    }
  }

  const funcProgressColor = () => {
    switch(testResult()) {
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#9bc158';
      case 4:
        return '#00b500';
      default:
        return 'none';
    }
  }

  const changePasswordColor = () => ({
    width: `${testResult()*25}%`,
    background: funcProgressColor(),
    height: '7px'
  })

  return (
    <>
      <div className="progress" style={{ width:'50%', height: '7px' }}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
      <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p>
    </>
  )
}

export default PasswordStrength
