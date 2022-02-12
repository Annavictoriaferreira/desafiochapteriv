/// <reference types="cypress" />


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
        cy.get('.form-group > #email_create').should('be.visible').type('anna@exxamplie.com')
        //clicar no botão Create an account
        cy.get('.submit > #SubmitCreate').click()

        cy.wait('@TestCreateAnAccountRequest').then((res) => {
            expect(res.response.statusCode).to.equal(200)
        })

        //como selecionar outros buttons radios
        cy.get('[type="radio"]').first().check()

        cy.get('.required.form-group > #customer_firstname').should('be.visible').type('Anna')
        cy.get('.required.form-group > #customer_lastname').should('be.visible').type('Victória Ferreira')
        //cy.get('.required.form-group > #email').should('be.visible').type('anna@exxxample.com')
        cy.get('.required.password.form-group > #passwd').should('be.visible').type('aaaaa12389')

        //Inputs combobox
        cy.get('select#days').select('8', { force: true })
        cy.get('select#months').select('January', { force: true })
        cy.get('select#years').select('2006', { force: true })

        //Inputs checkbox
        cy.get('#optin').check()

        cy.get('#company.form-control').should('be.visible').type('Greenmile Descartes')
        cy.get('#address1.form-control').should('be.visible').type('rua filipe santiago n 222')
        cy.get('#address2.form-control').should('be.visible').type('rua filipe santiago n 222')
        cy.get('#city.form-control').should('be.visible').type('Russas')
        
        cy.get('select#id_state').select('Virginia', { force: true })
        
        cy.get('#postcode.form-control.uniform-input.text').should('be.visible').type('12332')
        cy.get('#other.form-control').should('be.visible').type('lorem ipsum, !...')
        cy.get('#phone.form-control').should('be.visible').type('40028922')
        cy.get('#phone_mobile.form-control').should('be.visible').type('999930357')
        cy.get('#alias.form-control').should('be.visible').type('adress, example, 154')

        cy.get('.submit.clearfix > #submitAccount').click()
    })
})