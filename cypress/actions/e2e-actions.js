/// <reference types="cypress"/>
import element from "../fixtures/elements";
import data from "../fixtures/testData"
import 'cypress-wait-until';

export function selectSortOption(optionValue) {
    cy.get('#sort-select').select(optionValue)
    cy.get('#app > div.table').should('be.visible')
    cy.get('#app > div.table').click()
}

export function enterFilterText(text) {
    var filterInputElement = cy.get('#filter-input');
    filterInputElement.type(text)
}

export function clearFilterText() {
    var filterInputElement = cy.get('#filter-input');
    filterInputElement.clear({ force: true })
}

const getTableDataRows = function (e) {
    var rows = e.getElementsByClassName('table-row');
    return rows;
}

export function testValidFilterText() {

    cy.get('.table-content').then(e => {
        var expectedTableDataRows = getTableDataRows(e[0]);

        for (var i = 0; i < expectedTableDataRows.length; i++) {
            var expectedNameTxtContent = expectedTableDataRows[i].getElementsByClassName('table-data')[0].textContent
            var expectedComplexityTxtContent = expectedTableDataRows[i].getElementsByClassName('table-data')[3].textContent

            cy.get('#filter-input').should(($input) => {
                const filterTxtValue = $input.val().toLowerCase();
                var result = expectedNameTxtContent.toLowerCase().includes(filterTxtValue) || expectedComplexityTxtContent.toLowerCase().includes(filterTxtValue)
                expect(result).to.be.true;
            })
        }
    });

}

export function testInvalidFilterText() {

    cy.get('.table-content').then(e => {
        var expectedTableDataRows = getTableDataRows(e[0])
        expect(expectedTableDataRows.length).equal(0);
    });
}

const mapComplexityValue = function (complexityValue) {
    var num;

    if (complexityValue == 'low')
        num = 0
    else if (complexityValue == 'medium')
        num = 1
    else if (complexityValue == 'high')
        num = 2

    return num;
}


export function testSortByComplexity() {

    cy.get('.table-content').then(e => {
        console.log('Table Content Check')


        var expectedTableDataRows = getTableDataRows(e[0])

        for (var i = 0; i < expectedTableDataRows.length; i++) {
            if (i !== expectedTableDataRows.length - 1) {
                var complexityValue = mapComplexityValue(expectedTableDataRows[i].getElementsByClassName('table-data')[3].textContent)
                var nextComplexityValue = mapComplexityValue(expectedTableDataRows[i + 1].getElementsByClassName('table-data')[3].textContent)
                expect(complexityValue).lte(nextComplexityValue)
            }
        }
    });
}


export function testSortByName() {
    cy.get('.table-content').then(e => {
        var expectedTableDataRows = getTableDataRows(e[0])

        for (var i = 0; i < expectedTableDataRows.length; i++) {
            if (i !== expectedTableDataRows.length - 1) {
                var nameValue = expectedTableDataRows[i].getElementsByClassName('table-data')[0].textContent
                var nextNameValue = expectedTableDataRows[i + 1].getElementsByClassName('table-data')[0].textContent
                var result = nameValue.toLowerCase() <= nextNameValue.toLowerCase()
                expect(result).to.be.true;
            }
        }
    });
}

export function validateUI(Text) {
    cy.get(element.filter).should('exist').type(Text + '{enter}')
    cy.get(element.filter).should('have.value', Text)
    cy.get(element.filter).clear()
    const call = ['Name', 'Number of cases', 'Impact score', 'complexity']
    call.forEach(options => {
        cy.get(element.sortDropDown).select(options)
    });
}

export function validateAppString(name, cases, impact, complex, header) {
    cy.get(element.nameHeader).should('have.text', name)
    cy.get(element.casesHeader).should('have.text', cases)
    cy.get(element.avgImpactHeader).should('have.text', impact)
    cy.get(element.complexityHeader).should('have.text', complex)
    cy.get('h1').should('have.text', header)
}