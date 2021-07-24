import React, { useEffect, useState } from "react";
import './Samples.css'
import WithListLoading from './WhileSampleListLoading'
import SampleList from './SampleList'
import axios from 'axios'

function Samples() {

    const ListLoading = WithListLoading(SampleList);
    const [appState, setAppState] = useState({
      loading: false,
      samples: null,
    });

    useEffect(() => {
      setAppState({ loading: true });
      const apiUrl = `http://localhost:4000/project/607eb708-61a6-4cae-aca2-3f789a53dbdf/samples/`;
      const getSamples = async () => {
        let { data } = await axios.get(apiUrl);
        setAppState({ loading: false, samples: data });
        console.log(data);  
      }
      getSamples();

    }, [setAppState]);

    return(
      <div>
        <h1 id="samples-title">Samples</h1>
        <ListLoading isLoading={appState.loading} samples={appState.samples} />
      </div>
    );
}

export default Samples;
