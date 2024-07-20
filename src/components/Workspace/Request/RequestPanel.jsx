
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { convertKeyValueToObject } from '../../../utils/helpers';
import UrlEditor from '../../Panes/RequestUrl/UrlEditor';
import RequestTabGroup from '../../Tab-Groups/RequestTabGroup';

const keyPairInitState = [
  {
    id: uuidv4(),
    keyItem: '',
    valueItem: '',
  },
];

export default function Request({ setResponse, setLoading, addToHistory }) {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [reqMethod, setReqMethod] = useState('GET');
  const [queryParams, setQueryParams] = useState(keyPairInitState);
  const [headers, setHeaders] = useState(keyPairInitState);
  const [body, setBody] = useState('{\n\t\n\n}');
  const [token, setToken] = useState('');
  

  const handleOnInputSend = async (e) => {
    setLoading(true);

    let data;
    try {
      data = JSON.parse(body.toString());
    } catch (e) {
      alert('Something is wrong with the JSON data.');
      setLoading(false);
      return;
    }

    const parsedHeaders = convertKeyValueToObject(headers);
    if (token) {
      parsedHeaders['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await axios({
        url: url,
        method: reqMethod,
        params: convertKeyValueToObject(queryParams),
        headers: parsedHeaders,
        data,
      });

      const newHistoryItem = {
        method: reqMethod,
        url,
        timestamp: new Date(),
      };

      addToHistory(newHistoryItem);
      setResponse(response);
    } catch (err) {
      console.error('Request failed:', err.message);
      setResponse(err);
    }

    setLoading(false);
  };

  return (
    <>
      <UrlEditor
        url={url}
        setUrl={setUrl}
        reqMethod={reqMethod}
        setReqMethod={setReqMethod}
        onInputSend={handleOnInputSend}
      />
      <RequestTabGroup
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        headers={headers}
        setHeaders={setHeaders}
        body={body}
        setBody={setBody}
        token={token}
        setToken={setToken}
      />
    </>
  );
}
