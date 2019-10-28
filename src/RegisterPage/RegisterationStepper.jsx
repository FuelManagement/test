import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {onboardActions} from '../_actions';
import { connect } from 'react-redux';
// import the form components 
import { OrganizationDetailForm } from './OrganizationDetailForm';
import { ContactDetailForm } from './ContactDetailForm';
import { AccountDetailForm } from './AccountDetailForm';
import { TaxDetailForm } from './TaxDetailForm'; 
import {Upload} from './Upload';

//import the Stepper icons 
// import Org from '../../assets/img/org.png';
// import Contact from '../../assets/img/contact.png';
// import Account from '../../assets/img/account.png';
// import Tax from '../../assets/img/tax.png';
// import Upload from '../../assets/img/upload.png';

// import the icon from material ui
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AccountBalanceSharpIcon from '@material-ui/icons/AccountBalanceSharp';
import AccountTreeSharpIcon from '@material-ui/icons/AccountTreeSharp';
import ContactPhoneSharpIcon from '@material-ui/icons/ContactPhoneSharp';
import BallotSharpIcon from '@material-ui/icons/BallotSharp';



// const QontoConnector = withStyles({
//   alternativeLabel: {
//     top: 10,
//     left: "calc(-50% + 16px)",
//     right: "calc(50% + 16px)"
//   },
//   active: {
//     "& $line": {
//       borderColor: "#784af4"
//     }
//   },
//   completed: {
//     "& $line": {
//       borderColor: "#784af4"
//     }
//   },
//   line: {
//     borderColor: "#eaeaf0",
//     borderTopWidth: 3,
//     borderRadius: 1
//   }
// })(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },
  active: {
    color: "#784af4"
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": { 
      background:'#00ce1b '
    }
  },
  completed: {
    "& $line": { 
      background:'#00ce1b '
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: { 
    background:'#00ce1b ',
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: { 
    background:'#00ce1b '
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <AccountTreeSharpIcon />,
    2: <ContactPhoneSharpIcon />,
    3: <AccountBalanceSharpIcon />,
    4: <BallotSharpIcon />,
    5: <BallotSharpIcon />,
    6: <CloudUploadIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
  },
  button: {
    marginRight: theme.spacing(1),
    color: "#00ce1b",
    backgroundColor:"#fff",
    border: "1px solid #00ce1b",
    boxShadow: 'none',
    outline:"none"
  },
  nextbutton:{
    float:"right"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() { 
  return ['Organizational Detail', 'Address Detail', 'Bank Detail', 'Tax Detail',"Documents And Submit"];

} 
// var values =true;
function getStepContent(step) { 
  const [activeStep, setActiveStep] = React.useState({
    nextForm:true
  });   
  const extendTaxForm=()=>{ 
    setActiveStep({
      nextForm:false
    });
    // values=true; 
  }
  const hideTaxForm=()=>{ 
    // values=false;
    setActiveStep({
      nextForm:true
    }) 
  }
  switch (step) {
    case 0:
      return <OrganizationDetailForm/>;
    case 1:
      return <ContactDetailForm />;
    case 2:
      return <AccountDetailForm />;
      case 3:
        return <TaxDetailForm nextForm={activeStep.nextForm} 
        extendTaxForm={extendTaxForm} hideTaxForm={hideTaxForm} 
          />; 
      case 4:
        return <Upload />;
       default:
         return "Thank you";
  }
}

function CustomizedSteppers(props) {
  
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const handleNext = (event) => {
    
    if(activeStep===steps.length-1 )
    {
      if (props.documentslist===undefined && props.documentslist.length<1 && props.mode==='create') {
        alert("File not selected");
        return false;
    }
    if(props.mode==='create'){
      props.dispatch(onboardActions.createParticipant(props.participant,props.documentslist));
    }
    else{
      props.dispatch(onboardActions.updateParticipant(props.participant,props.documentslist,props.downloadDocumentslist));
    }
    }
    else
    {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  
  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
            { (activeStep != 0 )?(
              <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={[classes.button,"next-button"].join(" ")}
            >
              Back
            </Button>):null
            }    
              <Button 
                variant="contained" 
                onClick={(e)=>handleNext(e)}
                className={[classes.button,classes.nextbutton,"next-button"].join(" ")}
                disabled={!props.isFormValid}
              >
                {activeStep === steps.length - 1  ? "Submit" : "Next"}
              </Button>  
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps=function(state) {
  const { onboard } = state;
   
    return {
      documentslist: onboard.documentslist,
       participant: onboard.participant,
       isFormValid: onboard.isFormValid,
       mode:onboard.mode,
       downloadDocumentslist:onboard.downloadDocumentslist
    };
}

// const connectedCustomizedSteppers = connect(mapStateToProps)(CustomizedSteppers);
export default connect(mapStateToProps)(CustomizedSteppers) ;