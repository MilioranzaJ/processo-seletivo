import React, { useState } from 'react';

const Contrato = ({ contratos, loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1); //define em qual página está
  const contractsPerPage = 5; // Número de contratos por página

  // Lógica para pegar os contratos da página atual
  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirstContract = indexOfLastContract - contractsPerPage;// Calcula o índice do último e do primeiro contrato da página atual
  const currentContracts = contratos.slice(indexOfFirstContract, indexOfLastContract);// Seleciona os contratos que serão exibidos na página atual

  const totalPages = Math.ceil(contratos.length / contractsPerPage); // Calcula o número total de páginas

  const handleNextPage = () => { // Função para ir para a próxima página
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);//adicionado +1 na declaração de página atual para ocorrer essa mudança
    }
  };

  const handlePreviousPage = () => { // Função para ir para a página anterior
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); //diminuindo 1 na declaração de página atual
    }
  };


  if (error) {
    return <p className='estilop'>Ocorreu um erro: {error.message}</p>; // Exibe uma mensagem de erro se houver um erro
  }

  return (
    <div className='contrato'>
      <h2>Contratos</h2>
      <table>
        <thead>
          <tr> 
            <th>Fornecedor</th>
            <th>Objeto</th>
            <th>Data de Vigência Inicial</th>
            <th>Data de Vigência Final</th>
            <th>Valor Inicial</th>
          </tr>
        </thead>
        <tbody>
          {currentContracts.map((contrato, index) => (
            <tr key={index}>
              <td>{contrato.orgaoEntidade.razaoSocial}</td>
              <td>{contrato.objetoContrato}</td>
              <td>{new Date(contrato.dataVigenciaInicio).toLocaleDateString()}</td>
              <td>{new Date(contrato.dataVigenciaFim).toLocaleDateString()}</td>
              <td>{Number(contrato.valorInicial).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Contrato;
