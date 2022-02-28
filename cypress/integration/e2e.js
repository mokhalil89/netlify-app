/// <reference types="cypress" />
import data from '../fixtures/testData'
import {
    enterFilterText,
    testValidFilterText,
    testInvalidFilterText,
    testSortByComplexity,
    testSortByName,
    validateUI,
    validateAppString,
    selectSortOption,
    clearFilterText
} from '../actions/e2e-actions'
import element from '../fixtures/elements'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Test Suite', () => {

    beforeEach(() => {

        cy.visit('/')
        cy.url().should('include', '')
    })
    describe('positive test case', () => {

        it('should check the sorting functionality by complexity', () => {
            selectSortOption(data.sortByComplexity)
            testSortByComplexity()
        })
        
        it('should check the UI and String in the Application', () => {
          validateAppString(data.Name,data.NumberOfCases,data.AvgImpactScore,data.complexity,data.expectedHeader)
          validateUI('abc123')
        })
        it('should check the sorting functionality by name', () => {
            selectSortOption(data.sortByName)
            testSortByName()
        })

        it('should check the filtering functionality with Valid input ' + data.validFilterInput, () => {
            enterFilterText(data.validFilterInput)
            testValidFilterText()
        })

        it('should check compination of filtering and sorting functionality ::: filter value :'+data.validFilterInput +', sorting by :'+data.sortByComplexity, () => {
            selectSortOption(data.sortByComplexity)
            enterFilterText(data.validFilterInput)
            testSortByComplexity()
            testValidFilterText()
        
        })
    })

    describe('Negative test case', () => {
        it('should check sending invalid value in filter Textfield ' + data.invalidFilterInput, () => {
            enterFilterText(data.invalidFilterInput)
            testInvalidFilterText()
        })
    })

})