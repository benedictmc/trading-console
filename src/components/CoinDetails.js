import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './CoinDetails.css';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CoinDetails = (coin) =>{
  console.log("Starting coinDetails....")
  console.log("coin", coin)

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [coinDetails, setCoinDetails] = useState({})
  const [coinName, setCoinName] = useState('')
  let hasUid = coin['uid'].length
  // if(hasUid){
  //   const [uid, setUid] = useState(coin['uid'])
  // }

  const [props, setProps] = useState(coin)
  
  useEffect(() => {
    // changePanel(data);
    console.log("Props have chnaged", coin['coin'])
    let uid = coin['uid']
    setCoinName(coin['coin'])
    fetch("/volume/stats/"+uid, {mode: 'cors'})
    .then(response => response.json())
    .then(res => {
      console.log("Setting coin ", coin['coin'])
      setCoinDetails(res)
    })
    setProps(coin)
  }, [coin]);

  // useEffect(() =>{
  //   setUid(coin['uid'])
  //   console.log("In use effect")
  //   let hasUid = coin['uid'].length
  //   if(hasUid){
  //     let uid = coin['uid']
  //     coinName = coin['coin']
  //     fetch("/volume/stats/"+uid, {mode: 'cors'})
  //     .then(response => response.json())
  //     .then(res => {
  //       setCoinDetails(res)
  //     })
  //   }
  // }, [])
  return ( <div>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {coinName} Details
              </Typography>
              <Typography variant="h5" component="h2">
                Time Period: {coinDetails['time_period']} minutes
              </Typography>
              <Typography variant="h5" component="h2">
              {coinDetails['diff_max'] > 0 ?
                    (<div>Max Price Difference with in time period: <i className="positive">{coinDetails['diff_max']} %</i></div>):
                    (<div>Max Price Difference with in time period: <i className="negative">{coinDetails['diff_max']} %</i></div>)
                
              }
              </Typography>
              <Typography variant="h5" component="h2">
              {coinDetails['diff_end'] > 0 ?
                    (<div>Price Difference between start and end: <i className="positive">{coinDetails['diff_end']} %</i></div>):
                    (<div>Price Difference between start and end: <i className="negative">{coinDetails['diff_end']} %</i></div>)
                
              }
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                adjective
              </Typography>
            </CardContent>
        </Card>
    </div>
);
// );
//   return ( <div>
//           {coinDetails ? (
//             <Card className={classes.root}>
//               <CardContent>
//                 <Typography className={classes.title} color="textSecondary" gutterBottom>
//                   {coinName} Details
//                 </Typography>
//                 <Typography variant="h5" component="h2">
//                   Time Period: {coinDetails['time_period']}
//                 </Typography>
//                 <Typography variant="h5" component="h2">
//                   Max Price Difference with in time period: {coinDetails['diff_max']}
//                 </Typography>
//                 <Typography variant="h5" component="h2">
//                   Price Difference between start and end: {coinDetails['diff_end']}

//                 </Typography>
//                 <Typography variant="h5" component="h2">
//                   be{bull}nev{bull}o{bull}lent
//                 </Typography>
//                 <Typography className={classes.pos} color="textSecondary">
//                   adjective
//                 </Typography>
//                 <Typography variant="body2" component="p">
//                   well meaning and kindly.
//                   <br />
//                   {'"a benevolent smile"'}
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small">Learn More</Button>
//               </CardActions>
//           </Card>
//           ): (<h1>Not loaded</h1>)}
//     </div>
//   );
}

export default CoinDetails;