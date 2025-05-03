import React, { useEffect, useState }  from 'react';
import "../assets/css/widgetselection.css";
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { sageList } from '../config/SageConfig';
import WidgetInfo from '../components/WidgetInfo';


function WdigetSelectionPage(props) {
    const [sageLists, setSageLists] = useState([[]]);
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };    

    const [currentSage, setCurrentSage] = useState();
    useEffect(() => {
        setCurrentSage(JSON.parse(localStorage.getItem("sage-info")));

        const result = [];
        const chunkSize = 3;
        for (let i = 0; i < sageList.length; i += chunkSize) {
          const chunk = sageList.slice(i, i + chunkSize);
          result.push(chunk);
        }
      
        setSageLists(result);
    }, [])

    

    const lightTheme = createTheme({
        palette: {
          primary: {
            main: '#c8edfd',
            light: '#2f2f2f',
            dark: '#282828',
            contrastText: '#000 !important',
          },
        }
      });

    return (
        <div className='main'>
            <div className='widget-selection'>
                    <div className='widget-selection-top'>
                        <div className='widget-selection-heading'>
                            Select Your Sage Agent!
                        </div>
                        <div className='widget-selection-currentsage'>
                            {`Current Sage: ${currentSage && currentSage.sageFullName}`}
                        </div>
                    </div>

                    <div className='widget-selection-sages'>
                        {sageLists[page-1].map((item, i) => {
                            return (
                                <WidgetInfo
                                    key={i}
                                    sageInfo={item}
                                    isCurrent={currentSage && currentSage.sageFullName === item.sageFullName}
                                    setCurrentSage={setCurrentSage}
                                ></WidgetInfo>
                            );
                        })}
                    </div>

                    <div className='widget-selection-pages'>
                        <ThemeProvider theme={lightTheme}>
                            <Pagination count={sageLists.length} page={page} onChange={handleChange} color="primary" />
                        </ThemeProvider>
                    </div>
                </div>

                {/* <div className='widget-selection-right'>
                    <HelperConversation></HelperConversation>

                    <button className='widget-selection-right-btn'>Customize your sage agent</button>
                </div> */}
            
        </div>
    );
}

export default WdigetSelectionPage;