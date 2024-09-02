import React, { useState } from 'react';
import './App.css';
import Contrato from './components/Contratos';
import axios from 'axios';

function App() {
  const [cnpj, setCnpj] = useState(''); //Armazena o valor do CNPJ digitado pelo usuário.
  const [dataInicial, setDataInicial] = useState('');//Armazena a data inicial digitada pelo usuário.
  const [dataFinal, setDataFinal] = useState('');//Armazena a data final digitada pelo usuário.
  const [contratos, setContratos] = useState([]);//Armazena a lista de contratos retornados pela API.
  const [loading, setLoading] = useState(false);//Indica se a requisição está em andamento
  const [error, setError] = useState(null);//Armazena uma mensagem de erro se a requisição falhar.
  const [validationError, setValidationError] = useState('');//Armazena uma mensagem de erro de validação se os campos forem preenchidos incorretamente.

  const validateInputs = () => { //Aqui é uma função que irá verificar os inputs para que o usúario forneça os dados corretamente
    //Ela irá mandar uma mensagem de erro caso informe os dados incorretos, ou a falta deles
    if (!cnpj || !dataInicial || !dataFinal) {
      return "Todos os campos devem ser preenchidos"
    }
    if (cnpj.length !== 14) {
      return "O CNPJ deve ter exatamente 14 dígitos";
    }
    if (dataInicial.length !== 8) {
      return "A data Inicial deve ser no formato yyyymmdd";
    }
    if (dataFinal.length !== 8) {
      return "A data Final deve ser no formato yyyymmdd";
    }
    
    return null; //retorna nulo se tudo for preenchido corretamente e o código continuará normalmente
  };

  const handleConsulta = () => { //esta função é chamada quando o usuário clica no botão consultar
    const errorMessage = validateInputs(); //valida as entradas usando a função validateInputs
    if (errorMessage) {//se houver erro de validação, interrompe a execução
      setValidationError(errorMessage);
      return;
    }

    setLoading(true); //define loading como true para indicar que a requisição está em andamento
    setError(null);//limpa qualquer erro anterior e mensagem de validação.
    setValidationError('');

   const url = `https://pncp.gov.br/api/consulta/v1/contratos?cnpjOrgao=${cnpj}&dataInicial=${dataInicial}&dataFinal=${dataFinal}&pagina=1`; //Define a URL da API com os parâmetros fornecidos (cnpj, dataInicial, dataFinal e página (que é um valor fixo)). Aqui serão passados os parâmetros que o usuário colocou.


axios.get(url)//Requisição GET
  .then(response => {
    // Lida com a resposta da API
    if (response.data && Array.isArray(response.data.data)) {//Se a resposta da API for bem-sucedida e o dado recebido for um array 
      setContratos(response.data.data);                     //de contratos, armazena-os no estado contratos.
    } else {
      setError(new Error("A resposta da API não é um array")); //Caso contrário, define um erro indicando que a resposta não é válida.
    }
    setLoading(false); //manda o false para indicar que não está mais carregando pois já foi executado
  })
  .catch(error => {//Em caso de falha na requisição, armazena o erro no estado error
    console.log('Erro na requisição:', error.response ? error.response.data : error.message);
    setError(error.response ? error.response.data : new Error('Erro desconhecido'));
    setLoading(false);//manda o false para indicar que não está mais carregando pois já foi executado
  });

  };

  return (
    <div>
      <div className="container">
        <div className="form-container">
          <h1>Consulta de Contratos por CNPJ</h1>
          <p>Aqui você terá acesso à informações contratuais do CNPJ</p>
          <div className="form-group">
            <label htmlFor="cnpj">CNPJ do Órgão:</label>
            <input
              type="text"
              id="cnpj"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="Digite o CNPJ"
            />
          </div>
          <div className="form-group">
            <label htmlFor="data-inicial">Data Inicial:</label>
            <input
              type="text"
              id="data-inicial"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
              placeholder="yyyymmdd"
            />
          </div>
          <div className="form-group">
            <label htmlFor="data-final">Data Final:</label>
            <input
              type="text"
              id="data-final"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
              placeholder="yyyymmdd"
            />
          </div>
          {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
          <button className="btn" onClick={handleConsulta} disabled={loading}>
            {loading ? 'Consultando...' : 'Consultar'}
          </button>
        </div>

        <div className="image-container">
          <img src="Company-bro(2).png" alt="Imagem de uma empresa" />
        </div>
      </div>

      { (contratos.length > 0 || error) && (
        <Contrato 
          contratos={contratos} 
          loading={loading} 
          error={error}
        />
      )}
    </div>
  );
}

export default App;
