import { ListResult } from "pocketbase";
import { Product } from "../../../src/model/product";

describe('shop tests', () => { 
    beforeEach(() => {
        cy.viewport('iphone-7', 'landscape')
        cy.visit('http://localhost:5173/shop')
    })

    it('should contains SHOP title', () => {
        cy.get('.page').contains('SHOP')
        cy.get('.page').contains('shop', { matchCase:false })
        cy.screenshot('myShop', { overwrite: true })
    });

    it('should display the first element name', () => {
        cy
        .get('[data-testid="productList"]')
        .children()
        .first()
        .should('contain', 'nutella')
    });

    it.skip('should add product to cart', () => {

        const mock: Partial<ListResult<Partial<Product>>> = {
            items: [
                { id:'1', name:'Pippo', cost:10 },
                { id:'2', name:'Pluto', cost:100 },
            ]
        }

        cy.intercept(
            'http://127.0.0.1:8090/api/collections/products/records?page=1&perPage=30',
            { method: 'GET' },
            {
                statusCode: 200,
                body: mock
            }
        )

        cy.get('[data-testid="productList"]')
          .children()
          .first()
          .contains('add')
          .as('btn')

        cy.get('@btn').click()
        cy.get('@btn').click()
        cy.get('@btn').click()

        cy.contains('Total')
          .siblings()
          .should('have.text', mock.items[0].cost * 3)
    });

    it('should redirect to go to cart when button is clicked', () => {

        const mock: Partial<ListResult<Partial<Product>>> = {
            items: [
                { id:'1', name:'Pippo', cost:10 },
                { id:'2', name:'Pluto', cost:100 },
            ]
        }

        cy.intercept(
            'http://127.0.0.1:8090/api/collections/products/records?page=1&perPage=30',
            { method: 'GET' },
            {
                statusCode: 200,
                body: mock
            }
        )

        cy.get('[data-testid="productList"]')
          .children()
          .first()
          .contains('add')
          .as('btn')

        cy.get('@btn').click()

        cy.contains('Total')
          .siblings()
          .should('have.text', mock.items[0].cost)

        cy.contains('Go to cart').click()

        cy.url().should('include', '/cart')
    });

 });
