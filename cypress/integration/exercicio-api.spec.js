/// <reference types="cypress" />

import usuarios from '../contratos/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

  let token
  before(() => {
    cy.token('EronCRsales@ebac.com', 'teste').then(tkn => { token = tkn})
  });


     describe('Contratos de usuários', () => {
     
     
       it('Deve validar contrato de usuários', () => {
               cy.request('usuarios').then(response => {
                 return usuarios.validateAsync(response.body)
               })
       });
     })



     it('Cadastrar usuario com sucesso', () => {
    
          cy.request({
            method: 'POST',
            url: 'usuarios',
            body: {
              "nome": "Eron Sales",
              "email": "EronCRsales@ebac.com",
              "password": "teste",
              "administrador": "true"
            },
      
          }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
      
          })
      
        });
      
        it('Deve alterar um usuário já cadastrado', () => {
          cy.request('usuarios/IBps4Mlai9CGzwzH').then(response => {
            let id = response.body._id
            cy.request({
              method: 'PUT',
              url: `usuarios/${id}`,
              headers: {authorization: token},
              body: {
                "nome": "Eron CRSales",
                "email": "Eronsales@ebac.com",
                "password": "teste",
                "administrador": "true"
              }
      
            }).then(response => {
              expect(response.status).to.equal(200)
              expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
          })
      
        })
      
      })
      
      it('Excluir usuario já cadastrado', () => {
        cy.cadastro("Michael Martin", "MichaelR8@ebac.com", "teste", "true")
        .then(response => {
          let id = response.body._id
          cy.request({
            method: 'DELETE',
            url: `usuarios/${id}`
            
      
          }).then(response =>{
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Registro excluído com sucesso')
          })
        })
      
      });

      




      it('Deve listar usuarios cadastrados', () => {
          cy.request({
            method: 'GET',
            url: 'usuarios'
          }).then((response) => {
            expect(response.body.usuarios[0])
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(500)
      
          })
        });
      
        it('Deve validar um usuário com email inválido', () => {
          cy.request({
            method: 'POST',
            url: 'login',
            body: {
              "email": "Erolsal@ebac.com",
              "password": "teste"
            },
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Email e/ou senha inválidos')
      
          })
        });
      
     
    
     