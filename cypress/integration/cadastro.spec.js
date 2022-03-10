/// <reference types="cypress" />
var Chance = require('chance')
var chance = new Chance()

describe('Cadastro', () => {

    beforeEach(() => {
        cy.visit('http://automationpractice.com/index.php')
    })

    it('Deve realizar um cadastro', () =>{
        //clicar no botão sign in
        cy.intercept('POST', 'http://automationpractice.com/index.php').as('TestCreateAnAccountRequest')
        cy.get('.header_user_info > .login').click();
        cy.url().should('include', '/index.php?controller=authentication&back=my-account')
        //digitar endereço de email no campo: email address
        cy.get('.form-group > #email_create').should('be.visible').type(chance.email())
        //clicar no botão Create an account
        cy.get('.submit > #SubmitCreate').click()

        cy.wait('@TestCreateAnAccountRequest').then((res) => {
            expect(res.response.statusCode).to.equal(200)
        })

        //como selecionar outros buttons radios
        cy.get('[type="radio"]').first().check()

        cy.get('.required.form-group > #customer_firstname').should('be.visible').type(chance.first())
        cy.get('.required.form-group > #customer_lastname').should('be.visible').type(chance.last())
        //cy.get('.required.form-group > #email').should('be.visible').type('anna@exxxample.com')
        cy.get('.required.password.form-group > #passwd').should('be.visible').type('aaaaa12389')

        //Inputs combobox
        cy.get('select#days').select('8', { force: true })
        cy.get('select#months').select('January', { force: true })
        cy.get('select#years').select('2006', { force: true })

        //Inputs checkbox
        cy.get('#optin').check()

        cy.get('#company.form-control').should('be.visible').type(chance.company())
        cy.get('#address1.form-control').should('be.visible').type('rua filie santiago, 222, centro')
        cy.get('#address2.form-control').should('be.visible').type(chance.address())
        cy.get('#city.form-control').should('be.visible').type(chance.city())
        
        cy.get('select#id_state').select('Virginia', { force: true })
        
        cy.get('#postcode.form-control.uniform-input.text').should('be.visible').type('00000')
        cy.get('#other.form-control').should('be.visible').type('aaa, 4903928482')
        cy.get('#phone.form-control').should('be.visible').type(chance.phone())
        cy.get('#phone_mobile.form-control').should('be.visible').type(chance.phone())
        cy.get('#alias.form-control').should('be.visible').type(chance.address())

        cy.get('.submit.clearfix > #submitAccount').click()
    })
})