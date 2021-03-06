import Navbar from './Navbar.js';
import Sidebar from './Sidebar.js';
import Plot from './Plot.js';

import CoinDetails from './CoinDetails.js';
import './Dashboard.css';
import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Dashboard = () => {

    const [tableData, setTableData] = useState([])

    const [ohlcData, setOhlcData] = useState([])

    const [uid, setUid] = useState([])

    const [coin, setCoin] = useState([])

    const columns = [
        {
            name: "Coin",
            label: "Coin",
            options: {
            filter: true,
            sort: true,
            }
        },
        {
            name: "Pings",
            label: "Pings",
            options: {
            filter: true,
            sort: false,
            }
        },
        {
            name: "Net Vol %",
            label: "Net Vol %",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Recent Net Vol",
            label: "Recent Vol",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Recent Total Vol BTC",
            label: "Recent BTC",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Recent Vol %",
            label: "Recent Vol %",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Datetime",
            label: "Date",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "_id",
            label: "Retrive OHLC",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <button onClick={ () => fetchPingInfo(value, tableMeta, updateValue) }>
                            Get
                        </button>
                    )
                }
            }
        }
    ];
    

    const options = {
        filterType: 'checkbox',
    };


    
    useEffect(() =>{
        fetch('/volume/pings', {mode: 'cors'})
            .then(response => response.json())
            .then(data => {
                setTableData(data)
        });
    }, [])


    let fetchPingInfo = (uid, tableMeta, updateValue) =>{
        let coin = tableMeta['rowData'][0]
        setCoin(coin+"BTC")
        setUid(uid)
        // fetch('/volume/stats/'+uid, {mode: 'cors'})
        // .then(response => response.json())
        // .then(data => {
        //     setOhlcData(data)
        //     setUid(uid)
        // });
    }

    const classes = useStyles();
    
    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <div className="ping-table">
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                        <MUIDataTable 
                            title={"Binance Volume Pings"} 
                            data={tableData} 
                            columns={columns} 
                            options={options} 
                        />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}><Plot uid={uid} coin={coin}/></Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}><CoinDetails uid={uid} coin={coin}/></Paper>
                    </Grid>
                </Grid>
            </div>
            
        </div>
    );
}
    
export default Dashboard;
  
