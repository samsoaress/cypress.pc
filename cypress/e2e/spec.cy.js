 import { paginaPrincipal, paginaYahoo, paginaSegurancaPrivacidade} from '../support/elements';

describe('Busca por "Pacto Soluções" no Yahoo', () => {
  it('Deve exibir resultados relevantes ao buscar por Pacto Soluções', () => {
    cy.visit('https://br.search.yahoo.com/?fr2=p:fprd,mkt:br');

    cy.get(paginaYahoo.campoBusca).type('Pacto Soluções{enter}');
    
    cy.get(paginaYahoo.resultados).then(($results) => {
      const totalResultados = $results.length;

      if (totalResultados > 0) {
        cy.log(` Existem ${totalResultados} informações sobre "Pacto Soluções" na pesquisa.`);
      } else {
        cy.log(' Nenhuma informação encontrada sobre "Pacto Soluções".');
      }

      cy.wrap($results).first().invoke('text').then((text) => {
        expect(text).to.include('Pacto');
        expect(text.toLowerCase()).to.include('soluções');
      });
    });
  });
});

describe('Validação da data de atualização em Segurança e Privacidade do UOL', () => {
  it('Deve exibir a data da última atualização na página de Segurança e Privacidade', () => {

    Cypress.on('uncaught:exception', () => false); 

    cy.visit('https://www.uol.com.br/', { timeout: 120000 });

    cy.scrollTo('bottom');
    
    cy.get(paginaPrincipal.segurancaPrivacidade).click();

    cy.url().should('include', 'seguranca-e-privacidade');


    const regexData = /Atualização:\s*(\d{1,2} de [a-zç]+ de \d{4})/i;

    cy.get(paginaSegurancaPrivacidade.textoAtualizacao)
      .invoke('text')
      .then((text) => {
        const match = text.match(regexData);
        if (match) {
          cy.log(` A data de atualização é ${match[1]}`);
        } else {
          cy.log(' Não foi possível encontrar a data de atualização.');
        }
      });
  });
});
