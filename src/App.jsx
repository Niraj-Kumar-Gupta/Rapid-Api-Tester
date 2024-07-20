import React, { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Request from './components/Workspace/Request/RequestPanel';
import Response from './components/Workspace/Response/ResponsePanel';
import History from './components/Workspace/History/History';

const App = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const existingHistory = JSON.parse(localStorage.getItem('requestHistory')) || [];
    setHistory(existingHistory);
  }, []);

  const addToHistory = (newHistoryItem) => {
    const updatedHistory = [...history, newHistoryItem];
    setHistory(updatedHistory);
    localStorage.setItem('requestHistory', JSON.stringify(updatedHistory));
  };

  const deleteFromHistory = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem('requestHistory', JSON.stringify(updatedHistory));
  };

  const copyToClipboard = async (url) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
      } catch (err) {
        console.error('Failed to copy URL using Clipboard API: ', err);
        alert('Failed to copy URL. Please try again.');
      }
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Layout onOpenModal={openModal}>
        <Request setResponse={setResponse} setLoading={setLoading} addToHistory={addToHistory} />
        <Response response={response} loading={loading} />
        {isModalOpen && (
          <History
            history={history}
            onDelete={deleteFromHistory}
            onCopy={copyToClipboard}
            onClose={closeModal}
          />
        )}
      </Layout>
    </>
  );
};

export default App;
